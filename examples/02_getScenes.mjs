// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { token, secret } from './config.mjs';
import SwitchBotApi from '../src/index.mjs';

/**
 * Writes a message to the console.
 */
const log = console.log;

/**
 * Initializes new instance of @see SwitchBotApi and sets credentials.
 */
const switchBotApi = new SwitchBotApi(token, secret);

/**
 * Fetches scenes over API.
 */
const scenes = await switchBotApi.getScenes();

/**
 * Prints scenes of @see SwitchBotApi to stdout.
 */
log(scenes?.data);
