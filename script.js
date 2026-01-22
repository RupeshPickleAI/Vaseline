let cameraInterval = null;
let statusInterval = null;
let currentPage = 1;
let imagesPerPage = 10;
let allImages = [];

// state variable for
let line1Scripts = null;
let line2Scripts = null;
let lastSection = 'code';

// New state variables to track SKU selection
let selectedSkuState = {
    'Line 1': {
        selectedIndex: null,
        selectedLabel: null,
        buttonsDisabled: false
    },
    'Line 2': {
        selectedIndex: null,
        selectedLabel: null,
        buttonsDisabled: false
    }
};

// Function to load script configurations
async function loadScriptConfigs() {
    try {
        const line1Response = await fetch('C:\\Users\\Rupesh\\dummypythonfiles\\Line_1_Script_Path.json');
        const line2Response = await fetch('C:\\Users\\Rupesh\\dummypythonfiles\\Line_2_Script_Path.json');

        line1Scripts = await line1Response.json();
        line2Scripts = await line2Response.json();

        console.log('Script configurations loaded successfully');
    } catch (error) {
        console.error('Error loading script configurations:', error);
    }
}

// const machineStatusPath = "C:/Users/Rupesh/demoprojects/GUI/machine_status.json";

function loadContent(section, event) {
    const mainContent = document.getElementById('mainContent');
    document.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    // If we're navigating to a new section (not just reloading the same one)
    // and the new section is not a protected one, reset authentication
    if (lastSection !== section && section !== 'images' && section !== 'data_collection') {
        authenticatedSections['images'] = false;
        authenticatedSections['data_collection'] = false;
    }

    // Check if section requires authentication
    if ((section === 'images' || section === 'data_collection') && !authenticatedSections[section]) {
        showAuthenticationDialog(section, event);
        return;
    }

    // Update the last section after authentication check but before loading content
    lastSection = section;

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
    else if (section === 'code') { // if you want to add more lines you can do it here
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
        // ✅ Camera section with attractive Refresh button (only affects camera page)
        mainContent.innerHTML = `
            <div id="camera-section" class="content-section active">
                <div class="camera-header">
                    <div class="camera-header-row">
                        <div class="camera-title-block">
                            <h1><i class="fas fa-video"></i> Live Camera Feed</h1>
                            <p>Real-time surveillance monitoring system for all production units.</p>
                        </div>

                        <div class="camera-actions">
                            <button class="camera-refresh-btn" id="cameraRefreshBtn"
                                onclick="refreshCameraSection()" title="Refresh camera feed">
                                <i class="fas fa-sync-alt"></i>
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="camera-grid" id="dynamicCameraGrid">
                    <div class="loading-message">Loading cameras...</div>
                </div>
            </div>`;

        // Load cameras dynamically from the config file
        loadCamerasFromConfig();
    }

    else if (section === 'data_collection') {
        mainContent.innerHTML = `
        <div id="data-collection-section" class="content-section active">
            <div class="section-header">
                <h1 class="section-title">Data Collection Toggles</h1>
            </div>

            <div class="toggle-container" id="dataCollectionToggleContainer">
                <!-- Data collection toggles will be dynamically loaded here -->
            </div>
        </div>`;

        loadDataCollectionToggles(); // Load data collection toggles
    }
}

// user authentication for the defect toggles and the data collection
const userConfigPath = "C:/Users/Rupesh/demoprojects/Desktop/Vaseline/user_config.json";
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
            <h2> Authentication</h2>
            <p>Please enter your credentials to access ${section === 'images' ? 'Defect Toggles' : 'Data Collection '}</p>
        </div>
        <div class="auth-form">
            <div class="form-group">
                <label for="username">
                    <span class="label-text">Username</span> <span class="required">*</span>
                </label>
                <i class="fas fa-user input-icon"></i>
                <input type="text" id="username" placeholder="Enter your username">
            </div>
            <div class="form-group">
                <label for="password">
                    <span class="label-text">Password</span> <span class="required">*</span>
                </label>
                <i class="fas fa-lock input-icon"></i>
                <div class="password-container">
                    <input type="password" id="password" placeholder="Enter your password">
                    <i class="fas fa-eye-slash password-toggle" id="togglePassword"></i>
                </div>
            </div>
            <div class="auth-buttons">
                <button class="auth-button login-button" id="login-button" onclick="authenticateUser('${section}')">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            </div>
            <div id="auth-error" class="auth-error"></div>
        </div>
    `;

    overlay.appendChild(authContainer);

    // Focus on username input
    setTimeout(() => {
        document.getElementById('username')?.focus();
    }, 200);

    // Add escape key listener to close popup
    document.addEventListener('keydown', handleEscapeKey);

    // Add event listener for toggling password visibility
    setTimeout(() => {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        const usernameInput = document.getElementById('username');
        if (usernameInput && passwordInput) {
            usernameInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    passwordInput.focus();
                }
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    authenticateUser(section);
                }
            });
        }
    }, 300);
}

// Function to close authentication popup
function closeAuthPopup() {
    const overlay = document.querySelector('.auth-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
    document.removeEventListener('keydown', handleEscapeKey);

    document.querySelectorAll('.nav-button').forEach(button => {
        if (button.getAttribute('data-section') === lastSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Close popup when pressing Escape key
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeAuthPopup();
    }
}

// Updated authentication function
async function authenticateUser(section) {
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const errorElement = document.getElementById('auth-error');

    if (!errorElement) return;

    errorElement.textContent = '';
    errorElement.classList.remove('visible');

    if (!username || !password) {
        errorElement.textContent = "Username and password are required";
        errorElement.classList.add('visible');
        return;
    }

    try {
        const response = await fetch("file:///" + userConfigPath);
        const userData = await response.json();

        const user = userData.users.find(user =>
            user.username === username && user.password === password);

        if (user) {
            if ((section === 'images' && user.permissions.includes('defect_toggles')) ||
                (section === 'data_collection' && user.permissions.includes('data_collection'))) {

                authenticatedSections[section] = true;

                closeAuthPopup();
                loadContent(section);

            } else {
                errorElement.textContent = "You don't have permission to access this section";
                errorElement.classList.add('visible');
            }
        } else {
            errorElement.textContent = "Invalid username or password";
            errorElement.classList.add('visible');

            const passwordInput = document.getElementById('password');
            if (passwordInput) {
                passwordInput.value = '';
                passwordInput.focus();
            }
        }
    } catch (error) {
        console.error("Authentication error:", error);
        errorElement.textContent = "Authentication error. Please try again.";
        errorElement.classList.add('visible');
    }
}

function cancelAuthentication() {
    closeAuthPopup();
}

const toggleJsonPath = "C:/Users/Rupesh/dummypythonfiles/Defect_Toggle.json";
const ToggleJsonPathONE = "C:/Users/Rupesh/dummypythonfiles/Data_Collection.json";

let updatedToggles = {};
let updatedTogglesONE = {};

async function loadDefectToggles() {
    try {
        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        const toggleContainer = document.getElementById("toggleContainer");
        if (!toggleContainer) return;

        let toggleHTML = Object.keys(data.defects)
            .map((key) => `
                <div class="toggle-wrapper">
                    <label class="toggle-label">${key}</label>
                    <label class="switch">
                        <input type="checkbox" id="${key}" ${data.defects[key] ? "checked" : ""} onchange="updateToggleState('${key}')">
                        <span class="slider round"></span>
                    </label>
                </div>
            `)
            .join('');

        toggleHTML += `<button class="submit-button" onclick="submitToggles()">Submit</button>`;
        toggleContainer.innerHTML = toggleHTML;
    } catch (error) {
        console.error("Error loading defect toggles:", error);
    }
}

function updateToggleState(key) {
    const checkbox = document.getElementById(key);
    if (!checkbox) return;
    updatedToggles[key] = checkbox.checked;
}

async function submitToggles() {
    try {
        if (Object.keys(updatedToggles).length === 0) {
            alert("No changes made.");
            return;
        }

        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        Object.keys(updatedToggles).forEach(key => {
            data.defects[key] = updatedToggles[key];
        });

        window.electron.updateToggleJson(data);

        alert("Defect toggles updated successfully!");

        updatedToggles = {};
        loadDefectToggles();
    } catch (error) {
        console.error("Error updating defect toggle:", error);
    }
}

// for data collection toggles
async function loadDataCollectionToggles() {
    try {
        const response = await fetch("file:///" + ToggleJsonPathONE);
        const data = await response.json();

        const toggleContainer = document.getElementById("dataCollectionToggleContainer");
        if (!toggleContainer) return;

        let toggleHTML = Object.keys(data.defectsONE)
            .map((key) => `
                <div class="toggle-wrapper">
                    <label class="toggle-label">${key}</label>
                    <label class="switch">
                        <input type="checkbox" id="${key}_datacollection" ${data.defectsONE[key] ? "checked" : ""} onchange="updateDataCollectionToggleState('${key}')">
                        <span class="slider round"></span>
                    </label>
                </div>
            `)
            .join('');

        toggleHTML += `<button class="submit-button" onclick="submitDataCollectionToggles()">Submit</button>`;
        toggleContainer.innerHTML = toggleHTML;
    } catch (error) {
        console.error("Error loading data collection toggles:", error);
    }
}

function updateDataCollectionToggleState(key) {
    const checkbox = document.getElementById(key + "_datacollection");
    if (!checkbox) return;
    updatedTogglesONE[key] = checkbox.checked;
}

async function submitDataCollectionToggles() {
    try {
        if (Object.keys(updatedTogglesONE).length === 0) {
            alert("No changes made.");
            return;
        }

        const response = await fetch("file:///" + ToggleJsonPathONE);
        const data = await response.json();

        Object.keys(updatedTogglesONE).forEach(key => {
            data.defectsONE[key] = updatedTogglesONE[key];
        });

        window.electron.updateDataCollectionToggleJson(data);

        alert("Data collection toggles updated successfully!");

        updatedTogglesONE = {};
        loadDataCollectionToggles();
    } catch (error) {
        console.error("Error updating data collection toggle:", error);
    }
}

const cameraJsonPath = "C:/Users/Rupesh/dummypythonfiles/Camera_Feed.json";

// ✅ Refresh ONLY camera page (does NOT touch code/toggles)
function refreshCameraSection() {
    const cameraSection = document.getElementById('camera-section');
    const cameraGrid = document.getElementById('dynamicCameraGrid');
    const refreshBtn = document.getElementById('cameraRefreshBtn');

    if (!cameraSection || !cameraGrid) {
        console.warn("Camera section not active. Refresh ignored.");
        return;
    }

    if (refreshBtn) {
        refreshBtn.classList.add("refreshing");
        refreshBtn.disabled = true;
    }

    stopCameraUpdates();
    cameraGrid.innerHTML = `<div class="loading-message">Refreshing cameras...</div>`;

    // Load camera config and re-enable button after done
    loadCamerasFromConfig()
        .finally(() => {
            setTimeout(() => {
                if (refreshBtn) {
                    refreshBtn.classList.remove("refreshing");
                    refreshBtn.disabled = false;
                }
            }, 250);
        });
}

// ✅ Helper to reinitialize cameras safely (used when config changes)
function reinitializeCameras() {
    const cameraGrid = document.getElementById('dynamicCameraGrid');
    if (!cameraGrid) return;
    stopCameraUpdates();
    cameraGrid.innerHTML = `<div class="loading-message">Reloading cameras...</div>`;
    loadCamerasFromConfig();
}

// Function to dynamically load cameras from the config file
function loadCamerasFromConfig() {
    return fetch(`file:///${cameraJsonPath}`)
        .then(response => response.json())
        .then(data => {
            const cameraGrid = document.getElementById('dynamicCameraGrid');
            if (!cameraGrid) return;

            cameraGrid.innerHTML = '';

            const cameras = data.cameraImage;
            if (!cameras || Object.keys(cameras).length === 0) {
                cameraGrid.innerHTML = '<div class="no-cameras">No cameras configured in camera.json</div>';
                return;
            }

            Object.keys(cameras).forEach(cameraKey => {
                const cameraTitle = cameraKey.charAt(0).toUpperCase() + cameraKey.slice(1);

                const cameraElement = document.createElement('div');
                cameraElement.className = 'camera-container';
                cameraElement.innerHTML = `
                    <div class="camera-title"><i class="fas fa-video"></i> ${cameraTitle}</div>
                    <div class="camera-feed">
                        <img src="" alt="${cameraTitle}" id="${cameraKey}">
                    </div>
                `;
                cameraGrid.appendChild(cameraElement);
            });

            startCameraUpdates();
        })
        .catch(error => {
            console.error("Error loading camera configuration:", error);
            const cameraGrid = document.getElementById('dynamicCameraGrid');
            if (cameraGrid) {
                cameraGrid.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        Failed to load camera configuration. Check console for details.
                    </div>
                `;
            }
        });
}

// Updated camera update function to handle dynamic cameras
function updateCameras() {
    // ✅ If camera page is not open, stop updates
    const cameraSection = document.getElementById('camera-section');
    if (!cameraSection) {
        stopCameraUpdates();
        return;
    }

    fetch(`file:///${cameraJsonPath}`)
        .then(response => response.json())
        .then(data => {
            const cameras = data.cameraImage;
            if (!cameras) {
                console.error("Invalid camera image data format.");
                return;
            }

            const currentCameras = document.querySelectorAll('.camera-container');
            if (currentCameras.length !== Object.keys(cameras).length) {
                console.log("Camera configuration changed. Reinitializing...");
                reinitializeCameras();
                return;
            }

            Object.entries(cameras).forEach(([cameraId, base64Image]) => {
                const imgElement = document.getElementById(cameraId);
                if (imgElement) {
                    imgElement.src = `data:image/jpeg;base64,${base64Image}`;
                } else {
                    console.log(`Camera ${cameraId} not found in DOM. Reinitializing cameras...`);
                    reinitializeCameras();
                }
            });
        })
        .catch(error => console.error("Error fetching camera.json:", error));
}

// Start updating the cameras every 100ms (10fps)
function startCameraUpdates() {
    stopCameraUpdates(); // ✅ prevent multiple intervals
    updateCameras();
    cameraInterval = setInterval(updateCameras, 100);
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

// Modified to use the state management system
async function loadSkuButtons(lineKey) {
    setCurrentLine(lineKey);

    const skuData = await window.electron.getSkuButtons();
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
                    const isSelected = selectedSkuState[lineKey].selectedIndex === index;
                    const isDisabled = selectedSkuState[lineKey].buttonsDisabled && !isStopCode && !isSelected;

                    return `
                        <button class="sku-button ${isStopCode ? 'stop-code-button' : ''} ${isSelected ? 'active' : ''}"
                            onclick="handleSkuClick(${index + 1}, '${label}')"
                            id="sku-button-${index}"
                            ${isDisabled ? 'disabled' : ''}>
                            ${label}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Modified to update state
async function handleSkuClick(scriptNumber, label) {
    const currentLineKey = currentLine;
    const buttonIndex = scriptNumber - 1;

    if (label === "STOP CODE") {
        selectedSkuState[currentLineKey] = {
            selectedIndex: null,
            selectedLabel: null,
            buttonsDisabled: false
        };

        const buttons = document.querySelectorAll('.sku-button');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.disabled = false;
        });

        const pythonPath = 'C:/Users/Rupesh/AppData/Local/Microsoft/WindowsApps/python3.13.exe';

        let stopScriptPath;
        if (currentLine === 'Line 1') {
            stopScriptPath = 'C:/codebase/vaseline_line_1/vaseline_stop_code.py';
            console.log("Line 1 STOP CODE script executed");
        } else if (currentLine === 'Line 2') {
            stopScriptPath = 'C:/codebase/vaseline_line_2/vaseline_stop_code.py';
            console.log("Line 2 STOP CODE script executed");
        }

        await window.electron.runPythonScript(pythonPath, stopScriptPath);

        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = `STOP: ${currentLine}`;
            ws.send(message);
            console.log("Sent over WebSocket:", message);
        }

        return;
    }

    selectedSkuState[currentLineKey] = {
        selectedIndex: buttonIndex,
        selectedLabel: label,
        buttonsDisabled: true
    };

    const buttons = document.querySelectorAll('.sku-button');
    buttons.forEach((btn) => {
        if (btn.classList.contains('stop-code-button')) {
            btn.disabled = false;
        } else {
            btn.classList.remove('active');
            btn.disabled = true;
        }
    });

    const clickedButton = document.getElementById(`sku-button-${buttonIndex}`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    runPythonScript(scriptNumber);
}

function openDashboard() {
    window.open("https://hul.indusvision.ai", "_blank");
}

let currentRunningScript = null;
let currentLine = 'Line 1';

function setCurrentLine(lineName) {
    currentLine = lineName;
}

// Modified runPythonScript function
async function runPythonScript(scriptNumber) {
    try {
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

        if (currentLine === 'Line 1') {
            const ocrUpdated = await window.electron.runOcrConfig(scriptNumber);
            if (!ocrUpdated) {
                console.error("Line 1 config update failed.");
                return;
            }
        } else if (currentLine === 'Line 2') {
            const ocrUpdated = await window.electron.runOcrConfigLine2(scriptNumber);
            if (!ocrUpdated) {
                console.error("Line 2 config update failed.");
                return;
            }
        }

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
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (event) => {
            cleanupIntervals();
            const section = event.currentTarget.getAttribute('data-section');
            loadContent(section, event);
        });
    });

    // Default landing page
    loadContent('code');
    loadScriptConfigs();
    initWebSocket();
});

// Optional: guard if these buttons exist in DOM
const line1Btn = document.getElementById('line1-button');
if (line1Btn) {
    line1Btn.addEventListener('click', async () => {
        const scriptNumber = 1;
        await window.electron.runSkuPythonScript('Line 1', scriptNumber);
    });
}

const line2Btn = document.getElementById('line2-button');
if (line2Btn) {
    line2Btn.addEventListener('click', async () => {
        const scriptNumber = 1;
        await window.electron.runSkuPythonScript('Line 2', scriptNumber);
    });
}

function logout() {
    window.electron.logoutUser();
}
