'use strict';

const path = require('path');
const { app, Menu, ipcMain } = require('electron');
const openAboutWindow = require('about-window').default;
const windowHelper = require('./app/main/src/helpers/windowHelper.js');
const preferences = require('./app/main/src/helpers/preferencesHelper.js');

let splash;
let dashboard;

/**
 * Fetch the window template menu and shortcut bindings
 * 
 * @todo Refactor into WindowHelper class
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
                    // accelerator: "Command+,"
                },
                {
                    label: "Preferences", 
                    click: () => preferences.showPreferences(),
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
    const appTemplate = getApplicationTemplateBindings()
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