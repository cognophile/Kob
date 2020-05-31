'use strict';

const path = require('path');
const filesystem = require('fs');
const { app, BrowserWindow, Menu } = require('electron');
const openAboutWindow = require('about-window').default;

let splash
let dashboard

/**
 * Fetch the window template menu and shortcut bindings
 * 
 * @author cognophile
 * @returns void
 */
function getApplicationTemplateBindings() {
    return [
        {
        label: "Application",
        submenu: [
                { 
                    label: "About", 
                    click: () => openAboutWindow({
                        icon_path: path.join(__dirname, 'resources', 'kob.png'),
                        package_json_dir: __dirname,
                        product_name: app.getName(),
                        bug_link_text: 'Found a bug?',
                        bug_report_url: 'https://github.com/cognophile/Kob/issues/new',
                        homepage: 'https://github.com/cognophile/Kob',
                        use_version_info: true,
                        copyright: 'Copyright (c) cognophile 2020',
                        adjust_window_size: true,
                        win_options: {
                            parent: dashboard,
                            modal: true,
                        },
                        show_close_button: 'Close'
                    }),
                    accelerator: "Command+,"
                },
                { type: "separator" },
                { label: "Hide", accelerator: "Command+H", click: function() { app.hide(); }},
                { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }},
            ]
        },
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
    ];
}

function defaultWindow() {
    return new BrowserWindow({
        show: false,
        title: app.getName(),
        minWidth: 800,
        minHeight: 600,
        width: 1600,
        height: 1000,
        resizable: true,
        transparent: false,
        autoHideMenuBar: true, 
        titleBarStyle: "hidden",
        icon: process.platform === 'linux' && path.join(__dirname, 'resources', 'kob.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });
}

function enableDarwinDraggable(window) {
    const document = window.webContents;

    document.on('dom-ready', () => {
        if (process.platform === 'darwin') {
            document.insertCSS(filesystem.readFileSync(path.join(__dirname, 'assets/css/darwin.css'), 'utf8'));
        }
    });
}

/**
 * Perform necessary application configuration
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
function loadApp() {
    splash = defaultWindow();
    splash.loadURL(path.join('file://', __dirname, 'windows/splash.html'));
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
 */
function loadDashboard() {
    const appTemplate = getApplicationTemplateBindings()
    Menu.setApplicationMenu(Menu.buildFromTemplate(appTemplate));

    dashboard = defaultWindow();
    dashboard.loadURL(path.join('file://', __dirname, 'index.html'));
    dashboard.on('closed', function () {
        dashboard = null;
    });

    dashboard.on('ready-to-show', () => {
        splash.destroy();
        dashboard.show();
    });

    enableDarwinDraggable(dashboard);
}

app.on('ready', function () {
    loadApp();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (splash === null) {
    loadApp()
  }
})