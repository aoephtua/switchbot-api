// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import SwitchBotDevice from '../switchBotDevice.mjs';

/**
 * SwitchBotBlindTilt is a class to control position of Blind Tilt.
 */
export default class SwitchBotBlindTilt extends SwitchBotDevice {

    /**
     * Sets the position of Blind Tilt to specified parameters.
     * 
     * @param {string} direction Value of the direction. 
     * @param {number} position Number with the position.
     * @returns Object with command status and identifier.
     */
    setPosition = (direction, position) =>
        this.executeDeviceCommand('setPosition', `${direction};${position || 0}`);

    /**
     * Sets the position of Blind Tilt to open.
     * 
     * @returns Object with command status and identifier.
     */
    fullyOpen = () => this.setPosition('up', 100);

    /**
     * Sets the position of Blind Tilt to closed up.
     * 
     * @returns Object with command status and identifier.
     */
    closeUp = () => this.setPosition('up');

    /**
     * Sets the position of Blind Tilt to closed down.
     * 
     * @returns Object with command status and identifier.
     */
    closeDown = () => this.executeDeviceCommand('closeDown');

    /** 
     * Error: closeDown = () => this.setPosition('down');
     * 
     * POST request:
     * https://api.switch-bot.com/v1.1/devices/:deviceId/commands
     * {
     *   commandType: 'command',
     *   command: 'setPosition',
     *   parameter: 'down;0'
     * }
     * 
     * Response body:
     * {
     *   statusCode: 400,
     *   body: {},
     *   message: 'ExpressionAttributeValues contains invalid value: The parameter cannot be converted to a numeric value: NaN for key :dataItem'
     * }
     * 
     * Diagnosis: Server-side error
     * 
     * Issue:
     * https://github.com/OpenWonderLabs/SwitchBotAPI/issues/176
     */
}
