"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
// #endregion Local Imports
exports.plugin = {
    choices: [
        new inquirer.Separator(),
        {
            name: 'Styled Components',
            value: 'styled'
        },
        {
            name: 'Sass',
            value: 'sass'
        }
    ],
    message: 'What plugin do you want to add?',
    name: 'pluginType',
    type: 'list'
};
