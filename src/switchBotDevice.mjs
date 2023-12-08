// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import SwitchBotApi from './switchBotApi.mjs';

/**
 * SwitchBotDevice is an abstract base class to handle and control devices.
 */
export default class SwitchBotDevice extends SwitchBotApi {

    /**
     * Initializes new instance of @see SwitchBotDevice.
     * 
     * @param {string} deviceId Identifier of the device.
     * @param {string} token Open token for authentication.
     * @param {string} secret Secret key for authentication.
     */
    constructor(deviceId, token, secret) {
        super(token, secret);

        this.deviceId = deviceId;
    }

    /**
     * Gets status of the device.
     
    * @returns Object with keys and values of the device by type.
     */
    getDeviceStatus = async () => this.deviceId && this.request(`devices/${this.deviceId}/status`);

    /**
     * Sends control command to device.
     * 
     * @param {string} command Name of the command.
     * @param {*} parameter Parameter of the command.
     * @returns Object with command status and identifier.
     */
    executeDeviceCommand = async (command, parameter) =>
        this.request(`devices/${this.deviceId}/commands`, 'POST', { commandType: 'command', command, parameter });
}
