'use strict';

const path = require('path');
const windowHelper = require('./windowHelper.js');

module.exports = {
    showPreferences: function () {
        let preferences = windowHelper.getSmallWindow('Preferences');
        preferences.loadURL(path.join('file://', __dirname, '../../views/templates/preferences.html'));

        preferences.webContents.on('did-finish-load', () => {
            preferences.show();
            preferences.focus();
        });

        preferences.on('closed', function () {
            preferences = null;
        });
    
        windowHelper.enableDarwinDraggable(preferences);
    },
  };
