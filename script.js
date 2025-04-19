let cameraInterval = null;
let statusInterval = null;
let currentPage = 1;
let imagesPerPage = 10;
let allImages = [];

let line1Scripts = null;
let line2Scripts = null;

// Function to load script configurations
async function loadScriptConfigs() {
    try {
        const line1Response = await fetch('C:/Users/Rupesh/demoprojects/GUI/line1_config.json');
        const line2Response = await fetch('C:/Users/Rupesh/demoprojects/GUI/line2_config.json');
        
        line1Scripts = await line1Response.json();
        line2Scripts = await line2Response.json();
        
        console.log('Script configurations loaded successfully');
    } catch (error) {
        console.error('Error loading script configurations:', error);
    }
}


const machineStatusPath = "C:/Users/Rupesh/demoprojects/GUI/machine_status.json";


function loadContent(section, event) {
    const mainContent = document.getElementById('mainContent');
    document.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

      // Check if section requires authentication
      if ((section === 'images' || section === 'data_collection') && !authenticatedSections[section]) {
        showAuthenticationDialog(section, event);
        return;
    }

    if (section === 'images') {
        mainContent.innerHTML = `
            <div id="images-section" class="content-section active">
                <div class="section-header">
                    <h1 class="section-title">Defect Turn ON or OFF</h1>
                </div>
                
                <div class="toggle-container" id="toggleContainer">
                    <!-- Toggles will be dynamically loaded here -->
                </div>
    
                <div class="image-grid-container" id="imageGridContainer">
                    <div class="image-grid" id="imageGrid"></div>
                </div>
            </div>`;
        
        loadDefectToggles();
    }
    else if (section === 'code') {
        mainContent.innerHTML = `
            <div id="code-section" class="content-section active">
                <div class="section-header">
                    <h1 class="section-title">Machine Control Panel</h1>
                </div>
                <div class="buttons-grid">
                   <button class="run-button" onclick="loadSkuButtons('Line 1')">
                        <div class="button-logo">
                            <img src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/unileverremovebgpreview.png">
                        </div>
                        LINE 1
                    </button>
                    <button class="run-button" onclick="loadSkuButtons('Line 2')">
                        <div class="button-logo">
                            <img src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/unileverremovebgpreview.png">
                        </div>
                        LINE 2
                    </button>
                    
                </div>
            </div>`;
    }
    
    
    else if (section === 'camera') {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div id="camera-section" class="content-section active">
                <div class="camera-header">
                    <h1><i class="fas fa-video"></i> Live Camera Feed</h1>
                    <p>Real-time surveillance monitoring system for all production units.</p>
                </div>
                <div class="camera-grid">
                    <div class="camera-container">
                        <div class="camera-title"><i class="fas fa-video"></i> Line1 Before Filling</div>
                        <div class="camera-feed">
                            <img src="" alt="Camera 1" id="camera1">
                        </div>
                    </div>
                    <div class="camera-container">
                        <div class="camera-title"><i class="fas fa-video"></i> Line1 OCR</div>
                        <div class="camera-feed">
                            <img src="" alt="Camera 2" id="camera2">
                        </div>
                    </div>
                    <div class="camera-container">
                        <div class="camera-title"><i class="fas fa-video"></i> Line1 After Filling</div>
                        <div class="camera-feed">
                            <img src="" alt="Camera 3" id="camera3">
                        </div>
                    </div>
                    <div class="camera-container">
                        <div class="camera-title"><i class="fas fa-video"></i> cam4</div>
                        <div class="camera-feed">
                            <img src="" alt="Camera 4" id="camera4">
                        </div>
                    </div>
                    <div class="camera-container">
                        <div class="camera-title"><i class="fas fa-video"></i> Camera 5</div>
                        <div class="camera-feed">
                            <img src="" alt="Camera 5" id="camera5">
                        </div>
                    </div>
                </div>
            </div>`;
        startCameraUpdates();
    }
    
    else if (section === "machine_status") {
        initializeMachineStatus();
        startStatusUpdates();
    }
    else if (section === 'data_collection') {
        mainContent.innerHTML = `
        <div id="data-collection-section" class="content-section active">
            <div class="section-header">
                <h1 class="section-title">Data Collection Settings</h1>
            </div>11
            
            <div class="toggle-container" id="dataCollectionToggleContainer">
                <!-- Data collection toggles will be dynamically loaded here -->
            </div>
        </div>`;
    
    loadDataCollectionToggles(); // Load data collection toggles
}
}

//user authentication for the defect toggles and the data collection 

const userConfigPath = "C:/Users/Rupesh/demoprojects/GUI/user_config.json";
let authenticatedSections = {
    'images': false,
    'data_collection': false
};

// Modified showAuthenticationDialog function to create a better popup
function showAuthenticationDialog(section, event) {
    // Create overlay element for dimming the background
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    document.body.appendChild(overlay);
    
    // Create the authentication popup container
    const authContainer = document.createElement('div');
    authContainer.className = 'auth-container';
    authContainer.innerHTML = `
        <button class="close-button" onclick="closeAuthPopup()">
            <i class="fas fa-times"></i>
        </button>
        <div class="auth-header">
            <h2><i class="fas fa-lock"></i> Authentication</h2>
            <p>Please enter your credentials to access ${section === 'images' ? 'Defect Toggles' : 'Data Collection '}</p>
        </div>
        <div class="auth-form">
            <div class="form-group">
                <label for="username">Username</label>
                <i class="fas fa-user input-icon"></i>
                <input type="text" id="username" placeholder="Enter your username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <i class="fas fa-key input-icon"></i>
                <input type="password" id="password" placeholder="Enter your password">
            </div>
            <div class="auth-buttons">
                <button class="auth-button cancel-button" onclick="closeAuthPopup()">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="auth-button login-button" onclick="authenticateUser('${section}')">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            </div>
            <div id="auth-error" class="auth-error"></div>
        </div>
    `;
    
    overlay.appendChild(authContainer);
    
    // Focus on username input
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 100);
    
    // Add escape key listener to close popup
    document.addEventListener('keydown', handleEscapeKey);
}

// Function to close the authentication popup
function closeAuthPopup() {
    const overlay = document.querySelector('.auth-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
    document.removeEventListener('keydown', handleEscapeKey);
    
    // Reset active button state
    document.querySelectorAll('.nav-button').forEach(button => {
        if (button.getAttribute('data-section') === 'code') {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Load default content
    loadContent('code');
}

// Close popup when pressing Escape key
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeAuthPopup();
    }
}

// Modified authentication function to show error messages properly
async function authenticateUser(section) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('auth-error');
    
    // Clear previous error
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
    
    if (!username || !password) {
        errorElement.textContent = "Username and password are required";
        errorElement.classList.add('visible');
        return;
    }
    
    try {
        // Fetch user configuration
        const response = await fetch("file:///" + userConfigPath);
        const userData = await response.json();
        
        // Check credentials
        const user = userData.users.find(user => 
            user.username === username && user.password === password);
        
        if (user) {
            // Check if user has required permission
            if ((section === 'images' && user.permissions.includes('defect_toggles')) || 
                (section === 'data_collection' && user.permissions.includes('data_collection'))) {
                
                // Mark section as authenticated for this session
                authenticatedSections[section] = true;
                
                // Close popup
                closeAuthPopup();
                
                // Load the requested section
                loadContent(section);
                
            } else {
                errorElement.textContent = "You don't have permission to access this section";
                errorElement.classList.add('visible');
            }
        } else {
            errorElement.textContent = "Invalid username or password";
            errorElement.classList.add('visible');
            
            // Shake animation for visual feedback
            const passwordInput = document.getElementById('password');
            passwordInput.value = '';
            passwordInput.focus();
        }
    } catch (error) {
        console.error("Authentication error:", error);
        errorElement.textContent = "Authentication error. Please try again.";
        errorElement.classList.add('visible');
    }
}

// Replace the existing cancelAuthentication function with this one
function cancelAuthentication() {
    closeAuthPopup();
}


const toggleJsonPath = "C:/Users/Rupesh/Downloads/testing gui/toggle.json"; // Define the correct path
const ToggleJsonPathONE = "C:/Users/Rupesh/demoprojects/GUI/togglesONE.json"; // Add this new path

// Object to store updated toggle states before submitting
let updatedToggles = {};
let updatedTogglesONE ={};



async function loadDefectToggles() {
    try {
        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        const toggleContainer = document.getElementById("toggleContainer");
        if (!toggleContainer) return;

        // Dynamically create toggles using defect names
        let toggleHTML = Object.keys(data.defects)
            .map((key, index) => `
                <div class="toggle-wrapper">
                    <label class="toggle-label">${key}</label>  <!-- Display defect name -->
                    <label class="switch">
                        <input type="checkbox" id="${key}" ${data.defects[key] ? "checked" : ""} onchange="updateToggleState('${key}')">
                        <span class="slider round"></span>
                    </label>
                </div>
            `)
            .join('');

        // Add Submit button
        toggleHTML += `<button class="submit-button" onclick="submitToggles()">Submit</button>`;

        // Insert generated HTML
        toggleContainer.innerHTML = toggleHTML;
    } catch (error) {
        console.error("Error loading defect toggles:", error);
    }
}




// Function to store changes in `updatedToggles` object
function updateToggleState(key) {
    const checkbox = document.getElementById(key);
    updatedToggles[key] = checkbox.checked;
}




// Function to submit and update `toggle.json`
async function submitToggles() {
    try {
        if (Object.keys(updatedToggles).length === 0) {
            alert("No changes made.");
            return;
        }

        // Fetch the existing toggle.json data
        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        // Update defect states
        Object.keys(updatedToggles).forEach(key => {
            data.defects[key] = updatedToggles[key]  ;
        });

        // Send updated data to Electron to write to file
        window.electron.updateToggleJson(data);

        alert("Defect toggles updated successfully!");

        updatedToggles = {}; // Reset after submission
        loadDefectToggles(); // Reload toggles to reflect changes
    } catch (error) {
        console.error("Error updating defect toggle:", error);
    }
}
// for data collection toggles 
// Add this function to load the data collection toggles
async function loadDataCollectionToggles() {
    try {
        const response = await fetch("file:///" + ToggleJsonPathONE);
        const data = await response.json();

        const toggleContainer = document.getElementById("dataCollectionToggleContainer");
        if (!toggleContainer) return;

        // Dynamically create toggles using data collection names
        let toggleHTML = Object.keys(data.defectsONE)
            .map((key, index) => `
                <div class="toggle-wrapper">
                    <label class="toggle-label">${key}</label>
                    <label class="switch">
                        <input type="checkbox" id="${key}_datacollection" ${data.defectsONE[key] ? "checked" : ""} onchange="updateDataCollectionToggleState('${key}')">
                        <span class="slider round"></span>
                    </label>
                </div>
            `)
            .join('');

        // Add Submit button
        toggleHTML += `<button class="submit-button" onclick="submitDataCollectionToggles()">Submit</button>`;

        // Insert generated HTML
        toggleContainer.innerHTML = toggleHTML;
    } catch (error) {
        console.error("Error loading data collection toggles:", error);
    }
}

// Function to store changes in updatedTogglesONE object
function updateDataCollectionToggleState(key) {
    const checkbox = document.getElementById(key + "_datacollection");
    updatedTogglesONE[key] = checkbox.checked;
}

// Function to submit and update togglesONE.json
async function submitDataCollectionToggles() {
    try {
        if (Object.keys(updatedTogglesONE).length === 0) {
            alert("No changes made.");
            return;
        }

        // Fetch the existing togglesONE.json data
        const response = await fetch("file:///" + ToggleJsonPathONE);
        const data = await response.json();

        // Update data collection states
        Object.keys(updatedTogglesONE).forEach(key => {
            data.defectsONE[key] = updatedTogglesONE[key];
        });

        // Send updated data to Electron to write to file
        window.electron.updateDataCollectionToggleJson(data);

        alert("Data collection toggles updated successfully!");

        updatedTogglesONE = {}; // Reset after submission
        loadDataCollectionToggles(); // Reload toggles to reflect changes
    } catch (error) {
        console.error("Error updating data collection toggle:", error);
    }
}




function initializeMachineStatus() {
    const container = document.getElementById('mainContent');
    container.innerHTML = `
        <div id="machine-status-section" class="content-section active">
            <div class="machine-status-header">
                <h1><i class="fas fa-industry"></i> Machine Status Monitor</h1>
                <p>Real-time monitoring dashboard displaying the operational status of all production units.</p>
            </div>
            <div class="status-list" id="statusList"></div>
        </div>
    `;
    updateMachineStatus();
}

function updateMachineStatus() {
    fetch('file:///' + machineStatusPath)
        .then(response => response.json())
        .then(data => {
            const statusList = document.getElementById('statusList');
            if (!statusList) return;

            statusList.innerHTML = data.map(machine => {
                const statusText = machine.status === 0 ? 'Running' : 'Idle';
                const statusClass = machine.status === 0 ? 'status-running' : 'status-idle';
                const statusIcon = machine.status === 0 ? 'fa-spin fa-gear' : 'fa-pause';
                return `
                    <div class="machine-item">
                        <div class="machine-name">
                            <i class="fas fa-robot"></i>
                            ${machine.machine_name}
                        </div>
                        <div class="status-indicator ${statusClass}">
                            <i class="fas ${statusIcon}"></i>
                            ${statusText}
                        </div>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error loading machine status:', error));
}



function startStatusUpdates() {
    updateMachineStatus();
    statusInterval = setInterval(updateMachineStatus, 500);
}



const cameraJsonPath = "C:/Users/Rupesh/demoprojects/GUI/camera.json" //path for the camera 

// Function to update the camera images
function updateCameras() {
    // Fetch camera config (camera.json) to get the base64 image data
    fetch(`file:///${cameraJsonPath}`)
        .then(response => response.json())
        .then(data => {
            const cameras = data.cameraImage; // Assuming cameraImage contains the camera data
            if (!cameras) {
                console.error("Invalid camera image data format.");
                return;
            }

            // Iterate over each camera and update the image
            Object.entries(cameras).forEach(([cameraKey, base64Image]) => {
                const imgElement = document.getElementById(cameraKey); // Get the image element
                if (imgElement) {
                    console.log(`Updating image for ${cameraKey}`);
                    // Directly update image source without any caching mechanism
                    imgElement.src = `data:image/jpeg;base64,${base64Image}`;
                } else {
                    console.error(`Image element for ${cameraKey} not found.`);
                }
            });
        })
        .catch(error => console.error("Error fetching camera.json:", error));
}


// Start updating the cameras every 100ms (10fps)
function startCameraUpdates() {
    updateCameras(); // Initial update
    cameraInterval = setInterval(updateCameras, 100); // Update every 100ms (10fps)
}

// Stop the camera updates if needed (for cleanup)
function stopCameraUpdates() {
    if (cameraInterval) {
        clearInterval(cameraInterval);
        cameraInterval = null;
    }
}





async function openComfortPage() {
    const skuList = await window.electron.getSkuButtons();
    const mainContent = document.getElementById('mainContent');

    mainContent.innerHTML = `
        <div id="comfort-section" class="content-section active">
            <div class="comfort-header">
                <h1>Defect Detection Bleach Bottles</h1>
            </div>
            <div class="sku-buttons-grid">
                ${skuList.map((label, index) => {
                    const isStopCode = label === "STOP CODE";
                    return `
                        <button class="sku-button ${isStopCode ? 'stop-code-button' : ''}" 
                                onclick="handleSkuClick(${index + 1}, '${label}')" 
                                id="sku-button-${index}">
                            ${label}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}


async function loadSkuButtons(lineKey) {
    setCurrentLine(lineKey); // ✅ This is essential to know which line is selected

    const skuData = await window.electron.getSkuButtons(); // should read sku_buttons.json
    const skuList = skuData[lineKey];

    if (!skuList) {
        alert(`No SKUs found for ${lineKey}`);
        return;
    }

    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div id="sku-selection-section" class="content-section active">
            <div class="comfort-header">
                <h1>${lineKey} SKUs</h1>
            </div>
            <div class="sku-buttons-grid">
                ${skuList.map((label, index) => {
                    const isStopCode = label === "STOP CODE";
                    return `
                        <button class="sku-button ${isStopCode ? 'stop-code-button' : ''}" 
                                onclick="handleSkuClick(${index + 1}, '${label}')" 
                                id="sku-button-${index}">
                            ${label}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}



//to stop code and Re enable the buttons  for line1 and line2

async function handleSkuClick(scriptNumber, label) {
    const buttons = document.querySelectorAll('.sku-button');

    if (label === "STOP CODE") {
        // Re-enable all buttons
        buttons.forEach(btn => {
            btn.classList.remove('active');  // Remove active state
            btn.disabled = false;            // Re-enable all
        });
        
        // Run the appropriate STOP script based on the current line
        const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';
        
        // Use different stop script paths based on currentLine
        let stopScriptPath;
        if (currentLine === 'Line 1') {
            stopScriptPath = 'C:/Users/Rupesh/demoprojects/GUI/main.py';
            console.log("Line 1 STOP CODE script executed");
        } else if (currentLine === 'Line 2') {
            stopScriptPath = 'c:/Users/Rupesh/demoprojects/GUI/main1.py';
            console.log("Line 2 STOP CODE script executed");
        }
        
        await window.electron.runPythonScript(pythonPath, stopScriptPath);
        
        // Send a WebSocket message about stopping if connected
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = `STOP: ${currentLine}`;
            ws.send(message);
            console.log("Sent over WebSocket:", message);
        }
        
        return;
    }

    // Disable all except STOP CODE
    buttons.forEach(btn => {
        if (!btn.classList.contains('stop-code-button')) {
            btn.classList.remove('active');      // Remove active from all
            btn.disabled = true;                 // Disable all except STOP
        }
    });
    
    const clickedButton = document.getElementById(`sku-button-${scriptNumber - 1}`);
    if (clickedButton) {
        clickedButton.classList.add('active');   // Mark clicked one as active
    }
    
    // Run the SKU Python script
    runPythonScript(scriptNumber);
}



function openDashboard() {
    window.open("https://hul.indusvision.ai", "_blank"); // Opens in a new tab
}




// async function runStartScript() {
//     const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';
//     const scriptPath = 'd:/Electron_Project zip/Electron_Project/main1.py';
//     const configPath = 'C:/Users/Rupesh/demoprojects/Electron_Project/start_config.json'; // Replace with actual path

//     // Launch script in terminal
//     await window.electron.runPythonScript(pythonPath, scriptPath);

//     // Overwrite config file
//     const newConfig = {
//         mode: "start", // example, use your actual config structure
//         timestamp: new Date().toISOString()
//     };
//     const result = await window.electron.writeConfigFile(configPath, JSON.stringify(newConfig, null, 2));
//     if (result) {
//         alert("Start script launched and config updated.");
//     }
// }

// async function runStopScript() {
//     const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';
//     const scriptPath = 'c:/Users/Rupesh/Projects/serac1/Electron_Project/main.py';
//     const configPath = 'C:/Users/Rupesh/demoprojects/Electron_Project/stop_config.json'; // Replace with actual path

//     await window.electron.runPythonScript(pythonPath, scriptPath);

//     const newConfig = {
//         mode: "stop",
//         timestamp: new Date().toISOString()
//     };
//     const result = await window.electron.writeConfigFile(configPath, JSON.stringify(newConfig, null, 2));
//     if (result) {
//         alert("Stop script launched and config updated.");
//     }
// }




     
let currentRunningScript = null; // Store the currently running script
let currentLine = 'Line 1'; // Default to Line 1

function setCurrentLine(lineName) {
    currentLine = lineName;
}


// Modified runPythonScript function
async function runPythonScript(scriptNumber) {
    try {
        // Wait for configs to load if they haven't yet
        if (!line1Scripts || !line2Scripts) {
            await loadScriptConfigs();
        }

        const scriptMap = currentLine === 'Line 2' ? line2Scripts.scripts : line1Scripts.scripts;
        const script = scriptMap[scriptNumber];
        
        if (!script) {
            console.error("Script not found for this SKU");
            return;
        }

        const skuData = await window.electron.getSkuButtons();
        const label = skuData[currentLine][scriptNumber - 1];
        const message = `START: ${label}`;

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            console.log("Sent over WebSocket:", message);
        } else {
            console.warn("WebSocket not connected.");
        }

        // Run line-specific configs
        if (currentLine === 'Line 1') {
            const ocrUpdated = await window.electron.runOcrConfig(scriptNumber);
            if (!ocrUpdated) {
                console.error("Line 1 config update failed.");
                return;
            }
        } else if (currentLine === 'Line 2') {
            const backCam = await window.electron.runBackCamConfig(scriptNumber);
            const frontCam = await window.electron.runFrontCamConfig(scriptNumber);
            const cldCam = await window.electron.runCldCamConfig(scriptNumber);

            if (!backCam || !frontCam || !cldCam) {
                console.error("Line 2 config update failed.");
                return;
            }
        }

        // Run the main Python script
        console.log("Running with:", script.pythonPath, script.scriptPath);
        await window.electron.runPythonScript(script.pythonPath, script.scriptPath);
        
    } catch (error) {
        console.error("Error running script:", error);
    }
}




let ws = null;

function initWebSocket() {
    ws = new WebSocket("ws://localhost:5005");

    ws.onopen = () => {
        console.log(" WebSocket connected");
    };

    ws.onmessage = (event) => {
        console.log(" Message from WebSocket Server:", event.data);
    };

    ws.onerror = (err) => {
        console.error(" WebSocket error:", err);
    };

    ws.onclose = () => {
        console.warn(" WebSocket disconnected, retrying in 3s...");
        setTimeout(initWebSocket, 3000);
    };
}





// Cleanup intervals when changing sections


function cleanupIntervals() {
    if (cameraInterval) {
        clearInterval(cameraInterval);
        cameraInterval = null;
    }
    if (statusInterval) {
        clearInterval(statusInterval);
        statusInterval = null;
    }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for navigation buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (event) => {
            cleanupIntervals();
            const section = event.currentTarget.getAttribute('data-section');
            loadContent(section, event);
        });
    });
    
    // Load default content
    loadContent('code');
    loadContent('defect_toggle');
    loadScriptConfigs();
    initWebSocket();
   
});


// Add event listeners for buttons to run the correct line script
document.getElementById('line1-button').addEventListener('click', async () => {
    const scriptNumber = 1; // You can change this dynamically
    await window.electron.runSkuPythonScript('Line 1', scriptNumber);
});

document.getElementById('line2-button').addEventListener('click', async () => {
    const scriptNumber = 1; // You can change this dynamically
    await window.electron.runSkuPythonScript('Line 2', scriptNumber);
});

function logout() {
    window.electron.logoutUser(); // Call the function to return to login page
}