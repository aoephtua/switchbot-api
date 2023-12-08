// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import SwitchBotApi from './switchBotApi.mjs';
import SwitchBotBlindTilt from './devices/switchBotBlindTilt.mjs';

/**
 * Exports @see SwitchBotApi as default class.
 */
export default SwitchBotApi;

/**
 * Exports SwitchBot devices.
 */
export {
    SwitchBotBlindTilt
};
