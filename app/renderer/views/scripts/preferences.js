'use strict';

const preferences = require('./app/renderer/src/helpers/preferencesHelper.js');

document.getElementById('navbar-item-preferences-btn').addEventListener('click', () => { 
    preferences.showPreferences();
});