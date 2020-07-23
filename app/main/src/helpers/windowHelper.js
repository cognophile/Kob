'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');
const filesystem = require('fs');

module.exports = {
    getBaseWindow: function (title = 'Kob') {
        return new BrowserWindow({
            show: false,
            title: title,
            minWidth: 800,
            minHeight: 600,
            width: 1330,
            height: 850,
            resizable: true,
            transparent: false,
            autoHideMenuBar: true, 
            titleBarStyle: "hidden",
            icon: process.platform === 'linux' && path.join(__dirname, '../../../../resources', 'kob.png'),
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
                preload: path.join(__dirname, '../../../../preload.js'),
            },
        });
    },
    getSmallWindow: function (title = 'Kob') {
        return new BrowserWindow({
            show: false,
            title: title,
            minWidth: 500,
            minHeight: 350,
            width: 500,
            height: 350,
            resizable: true,
            transparent: false,
            autoHideMenuBar: true, 
            titleBarStyle: "hidden",
            icon: process.platform === 'linux' && path.join(__dirname, '../../../../resources', 'kob.png'),
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
                preload: path.join(__dirname, '../../../../preload.js'),
            },
        });
    },
    enableDarwinDraggable: function (window) {
        const document = window.webContents;

        document.on('dom-ready', () => {
            if (process.platform === 'darwin') {
                document.insertCSS(filesystem.readFileSync(path.join(__dirname, '../../../../assets/css/darwin.css'), 'utf8'));
            }
        });
    },
  };
