'use strict';

const path = require('path');
const { app, Menu, ipcMain } = require('electron');
const windowHelper = require('./app/main/src/helpers/windowHelper.js');
const appHelper = require('./app/main/src/helpers/appHelper.js');

let splash;
let dashboard;

/**
 * Perform necessary application configuration
 * 
 * @author cognophile
 * @returns void
 */
function bootstrap() {
    setTimeout(function () {
        loadDashboard();
    }, 2500);
}

/**
 * Initialise the application 
 * 
 * @author cognophile
 * @returns void
 */
function main() {
    splash = windowHelper.getBaseWindow('Just us a sec...');
    splash.loadURL(path.join('file://', __dirname, './app/main/views/templates/splash.html'));
    splash.on('closed', function () {
        splash = null;
    });

    splash.on('ready-to-show', () => {
        splash.show();
        bootstrap();
    });
}

/**
 * Load the application dashboard
 * 
 * @author cognophile
 * @returns void
 */
function loadDashboard() {
    const appTemplate = appHelper.getApplicationTemplateBindings();
    Menu.setApplicationMenu(Menu.buildFromTemplate(appTemplate));

    dashboard = windowHelper.getBaseWindow('Dashboard');
    dashboard.loadURL(path.join('file://', __dirname, './index.html'));
    // dashboard.webContents.openDevTools()

    dashboard.on('closed', function () {
        dashboard = null;
    });

    dashboard.on('ready-to-show', () => {
        splash.destroy();
        dashboard.show();
    });

    windowHelper.enableDarwinDraggable(dashboard);
}

app.on('ready', function () {
    main();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (splash === null) {
    main()
  }
})