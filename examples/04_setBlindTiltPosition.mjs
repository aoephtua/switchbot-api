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
    const promises = [];

    for (const device of deviceList) {
        const { deviceId, deviceType } = device;
    
        /**
         * Validates device type and initializes new instance of Blind Tilt.
         */
        if (deviceType === 'Blind Tilt') {
            const switchBotBlindTilt = new SwitchBotBlindTilt(deviceId, token, secret);
            
            /**
             * 1. Sets the position of @see SwitchBotBlindTilt to specified parameters.
             */
            promises.push(switchBotBlindTilt.setPosition('down', 50));

            /**
             * 2. Sets the position of @see SwitchBotBlindTilt to open.
             */
            //promises.push(switchBotBlindTilt.fullyOpen());

            /**
             * 3. Sets the position of @see SwitchBotBlindTilt to closed up.
             */
            //promises.push(switchBotBlindTilt.closeUp());

            /**
             * 4. Sets the position of @see SwitchBotBlindTilt to closed down. 
             */
            //promises.push(switchBotBlindTilt.closeDown());
        }
    }

    /**
     * Resolves provided promises of @see SwitchBotBlindTil commands.
     */
    const data = await Promise.all(promises);

    /**
     * Prints command data of @see SwitchBotBlindTilt to stdout.
     */
    log(data);
}
