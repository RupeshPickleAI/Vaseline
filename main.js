const { app, BrowserWindow, ipcMain ,contextBridge} = require('electron');
const { exec,spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let toggleJsonPath = "C:/Users/Rupesh/Downloads/testing gui/toggle.json";
const ToggleJsonPathONE = "C:/Users/Rupesh/demoprojects/GUI/togglesONE.json"; // Add this new path


let mainWindow;

const usersFilePath = path.join(__dirname, 'users.json');


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'assets', 'indus_logo_dev.png'), // Set application icon
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            webSecurity: false
        },
        
    });

    mainWindow.loadFile('login.html');
    // OPen Developer Tools for debugging
    mainWindow.webContents.openDevTools();

   // Add keyboard shortcut to toggle DevTools
   mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key.toLowerCase() === 'f12') {
        mainWindow.webContents.toggleDevTools();
    }
});
}

ipcMain.handle('authenticate-user', async (event, username, password) => {
    try {
        const rawData = fs.readFileSync(usersFilePath);
        const usersData = JSON.parse(rawData);

        const user = usersData.users.find(u => u.username === username && u.password === password);

        if (user) {
            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    } catch (error) {
        console.error('Error reading user data:', error);
        return { success: false, message: 'Error reading user data' };
    }
});



ipcMain.handle('run-python-script', async (event, pythonPath, scriptPath) => {
    return new Promise((resolve, reject) => {
        const formattedScriptPath = `"${scriptPath}"`;
        const command = `start cmd.exe /k "${pythonPath} ${formattedScriptPath}"`;

        console.log(`Executing command: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`Execution output: ${stdout}`);
            resolve(stdout || 'Script executed successfully');
        });
    });
});




// Handler for the original config file method
ipcMain.handle('run-config-file', async (event, configPath) => {
    try {
        console.log(`Running config file: ${configPath}`);
        
        // You might want to do additional processing here
        // For now, we'll just return success
        return { success: true, message: 'Config file processed' };
    } catch (error) {
        console.error('Error running config file:', error);
        return { success: false, message: `Error: ${error.message}` };
    }
});

// Function to execute Python scripts
function runPython(scriptPath, args = []) {
    return new Promise((resolve, reject) => {
        const pythonPath = '"C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe"';
        const command = `${pythonPath} "${scriptPath}" ${args.map(arg => `"${arg}"`).join(' ')}`;

        console.log(`Executing command: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`Execution output: ${stdout}`);
            resolve(stdout || 'Script executed successfully');
        });
    });
}

// Handler for Line 1 and Line 2
async function runSkuScript(line, scriptNumber) {
    let script;
    if (line === 'Line 1') {
        script = machineScriptLine1[scriptNumber];
    } else if (line === 'Line 2') {
        script = machineScriptLine2[scriptNumber];
    } else {
        console.error('Invalid line:', line);
        return;
    }

    if (!script) {
        console.error('Script not found');
        return;
    }

    const { pythonPath, scriptPath } = script;

    // Now run the Python script based on the selected line
    try {
        const result = await runPython(scriptPath, [scriptNumber]);
        console.log(`Script executed successfully for ${line}`);
    } catch (error) {
        console.error('Error running the script:', error);
    }
}

// Handler to call when a button is clicked for Line 1 or Line 2
ipcMain.handle('run-sku-python-script', async (event, line, scriptNumber) => {
    await runSkuScript(line, scriptNumber);
});

// New handler for SKU Python config
// ipcMain.handle('run-sku-python-config', async (event, skuNumber) => {
//     return new Promise((resolve, reject) => {
//         // Path to Python and the SKU config script
//         const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';

//         const scriptPath = path.join(__dirname, 'sku_config_script.py');

//         const command = `"${pythonPath}" "${scriptPath}" ${skuNumber}`;


//         console.log(`Updating SKU config and executing: ${command}`);

//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`SKU config execution error: ${stderr || error.message}`);
//                 reject(`Error: ${stderr || error.message}`);
//                 return;
//             }
//             console.log(`SKU config execution output: ${stdout}`);
//             resolve(true); // Return success after JSON config is updated
//         });
//     });
// });


// Handle writing to config file
ipcMain.handle('write-config-file', async (event, filePath, content) => {
    try {
        await fs.promises.writeFile(filePath, content);
        return true;
    } catch (error) {
        console.error('Error writing config file:', error);
        return false;
    }
});

// IPC handler to update toggle.json
ipcMain.on('update-toggle-json', (event, updatedData) => {
    try {
        fs.writeFileSync(toggleJsonPath, JSON.stringify(updatedData, null, 4), 'utf-8');
        event.reply('toggle-json-updated', { success: true });
    } catch (error) {
        console.error("Error writing to toggle.json:", error);
        event.reply('toggle-json-updated', { success: false, error: error.message });
    }
});
 
//for data collection
ipcMain.on('update-data-collection-toggle-json', (event, updatedData) => {
    try {
        fs.writeFileSync(ToggleJsonPathONE, JSON.stringify(updatedData, null, 4), 'utf-8');
        event.reply('data-collection-toggle-json-updated', { success: true });
    } catch (error) {
        console.error("Error writing to togglesONE.json:", error);
        event.reply('data-collection-toggle-json-updated', { success: false, error: error.message });
    }
});

//this is the skubuttons config file 
const skuButtonsPath = path.join(__dirname, 'sku_buttons.json');

ipcMain.handle('get-sku-buttons', async () => {
    try {
        const rawData = fs.readFileSync(skuButtonsPath);
        const parsed = JSON.parse(rawData); // Will return full object with Line 1, Line 2, etc.
        return parsed;
    } catch (err) {
        console.error("Error loading sku_buttons.json:", err);
        return {};
    }
});


// Add this in main.js
ipcMain.handle('run-ocr-config', async (event, skuNumber) => {
    return new Promise((resolve, reject) => {
        const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';
        const scriptPath = 'C:/Users/Rupesh/Downloads/testing gui/ocr_configs_line_1.py';
        const command = `"${pythonPath}" "${scriptPath}" ${skuNumber}`;

        console.log(`Running OCR config script: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`OCR config execution error: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`OCR config updated: ${stdout}`);
            resolve(true);
        });
    });
});


// ipcMain.handle('run-back-cam-config', async (event, sku) => {
//     const result = await runPython('C:/Users/Rupesh/demoprojects/GUI/update_back_cam_config.py', [sku]);
//     return result;
// });

// ipcMain.handle('run-front-cam-config', async (event, sku) => {
//     const result = await runPython('C:/Users/Rupesh/demoprojects/GUI/update_front_cam_config.py', [sku]);
//     return result;
// });

// ipcMain.handle('run-cld-cam-config', async (event, sku) => {
//     const result = await runPython('C:/Users/Rupesh/demoprojects/GUI/update_cld_cam_config.py', [sku]);
//     return result;
// });




//communication through port 
const net = require('net');

ipcMain.handle('send-socket-message', async (event, message, host, port) => {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(port, host, () => {
            console.log(`Connected to ${host}:${port}`);
            client.write(message);
        });

        client.on('data', (data) => {
            console.log(`Received: ${data}`);
            client.destroy(); // kill client after server's response
            resolve(data.toString());
        });

        client.on('error', (err) => {
            console.error(`Socket error: ${err.message}`);
            reject(err.message);
        });

        client.on('close', () => {
            console.log('Connection closed');
        });
    });
});



ipcMain.on('login-success', () => {
    mainWindow.loadFile('index.html');
});

ipcMain.on('logout-user', () => {
    mainWindow.loadFile('login.html');
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});