// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { token, secret } from './config.mjs';
import SwitchBotApi from '../src/index.mjs';

/**
 * Writes a message to the console.
 */
const log = console.log;

/**
 * Identifier of the scene.
 */
const sceneId = '';

/**
 * Initializes new instance of @see SwitchBotApi and sets credentials.
 */
const switchBotApi = new SwitchBotApi(token, secret);

/**
 * Sends request to execute scene by identifier over API.
 */
const result = await switchBotApi.executeScene(sceneId);

/**
 * Prints response of @see SwitchBotApi to stdout.
 */
log(result);
