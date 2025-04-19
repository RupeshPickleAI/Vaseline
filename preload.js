    //  preload.js - Updated for WebSocket (no main process changes needed)
    const { contextBridge, ipcRenderer, ipcMain } = require('electron');

    contextBridge.exposeInMainWorld('electron', {
        runPythonScript: (pythonPath, scriptPath) => ipcRenderer.invoke('run-python-script', pythonPath, scriptPath),
        getRandomImages: (folderPath) => ipcRenderer.invoke('get-random-images', folderPath),
        loginSuccess: () => ipcRenderer.send('login-success'),
        authenticateUser: (username, password) => ipcRenderer.invoke('authenticate-user', username, password),
        logoutUser: () => ipcRenderer.send('logout-user'),
        runConfigFile: (configPath) => ipcRenderer.invoke('run-config-file', configPath),
        runSkuPythonConfig: (skuNumber) => ipcRenderer.invoke('run-sku-python-config', skuNumber),
        writeConfigFile: (filePath, content) => ipcRenderer.invoke('write-config-file', filePath, content),
        updateToggleJson: (data) => ipcRenderer.send('update-toggle-json', data),
        onToggleJsonUpdated: (callback) => ipcRenderer.on('toggle-json-updated', (event, result) => callback(result)),
       
        getSkuButtons: () => ipcRenderer.invoke('get-sku-buttons'),
        runOcrConfig: (sku) => ipcRenderer.invoke('run-ocr-config', sku),
        runBackCamConfig: (sku) => ipcRenderer.invoke('run-back-cam-config', sku),
    runFrontCamConfig: (sku) => ipcRenderer.invoke('run-front-cam-config', sku),
    runCldCamConfig: (sku) => ipcRenderer.invoke('run-cld-cam-config', sku),
    updateDataCollectionToggleJson: (data) => ipcRenderer.send('update-data-collection-toggle-json', data),
    onDataCollectionToggleJsonUpdated: (callback) => ipcRenderer.on('data-collection-toggle-json-updated', (event, result) => callback(result)),
        
    

        // ⚠️ REMOVED: sendSocketMessage
        // WebSocket will now be handled entirely in the frontend (script.js) using WebSocket API
    });
