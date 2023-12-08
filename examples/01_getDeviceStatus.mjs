// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { token, secret } from './config.mjs';
import SwitchBotApi, { SwitchBotBlindTilt } from '../src/index.mjs';

/**
 * Writes a message to the console.
 */
const log = console.log;

/**
 * Initializes new instance of @see SwitchBotApi and sets credentials.
 */
const switchBotApi = new SwitchBotApi(token, secret);

/**
 * Fetches devices over API.
 */
const devices = await switchBotApi.getDevices();

/**
 * Contains the target device list.
 */
const deviceList = devices?.data?.deviceList;

/**
 * Validates target device list.
 */
if (deviceList) {
    for (const device of deviceList) {
        const { deviceId, deviceType } = device;
    
        /**
         * Validates device type and initializes new instance of Blind Tilt.
         */
        if (deviceType === 'Blind Tilt') {
            const switchBotBlindTilt = new SwitchBotBlindTilt(deviceId, token, secret);
            
            /**
             * Fetches device status of @see SwitchBotBlindTilt over API.
             */
            const deviceStatus = await switchBotBlindTilt.getDeviceStatus();
            const data = deviceStatus?.data;

            /**
             * Prints keys and values of @see SwitchBotBlindTilt to stdout.
             */
            log(data);
        }
    }
}
