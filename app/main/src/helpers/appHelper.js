'use strict'

const { app } = require('electron');

const openAboutWindow = require('about-window').default;
const preferences = require('./preferencesHelper.js');

module.exports = {
    getApplicationTemplateBindings: function () {
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
}