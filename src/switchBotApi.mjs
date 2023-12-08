// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { randomBytes, createHmac } from 'crypto';
import axios from 'axios';

/**
 * SwitchBotApi is an abstract base class to set authorization headers,
 * send HTTP requests or fetch devices and scenes.
 */
export default class SwitchBotApi {

    /**
     * Initializes new instance of @see SwitchBotApi.
     * 
     * @param {string} token Open token for authentication.
     * @param {string} secret Secret key for authentication.
     */
    constructor(token, secret) {
        this.token = token;
        this.secret = secret;

        this.axiosInstance = axios.create({
            baseURL: 'https://api.switch-bot.com/v1.1/'
        });
    }

    /**
     * Gets a list of devices related to the current user.
     * 
     * @returns Array with devices.
     */
    getDevices = async () => this.request('devices');

    /**
     * Gets a list of manual scenes related to the current user.
     * 
     * @returns Array with scenes.
     */
    getScenes = async () => this.request('scenes');

    /**
     * Sends a request to execute a manual scene related to the current user.
     * 
     * @param {string} sceneId Identifier of the scene. 
     * @returns Object with command status and identifier.
     */
    executeScene = async (sceneId) => sceneId && this.request(`scenes/${sceneId}/execute`, 'POST');

    /**
     * Sends HTTP request by parameters.
     * 
     * @param {string} url The target URL for content request.
     * @param {string} method The target HTTP method for content request.
     * @param {string|object|Array} data Optional data for POST request.
     * @returns Object with data of response.
     */
    async request(url, method, data) {
        const error = this.#validateCredentials();

        if (!error) {
            const headers = this.#getAuthorizationHeaders(this.token, this.secret);

            try {
                const { status, data: result } = await this.axiosInstance({
                    url,
                    method: method || 'GET',
                    data: data || {},
                    headers
                });

                if (status === 200 && result?.statusCode === 100) {
                    return { data: result.body };
                }
            } catch (error) {
                return { error };
            }
        } else {
            return error;
        }
    }

    /**
     * Gets object with authorization header for authentication of HTTP request.
     * 
     * @param {string} token Open token for authentication.
     * @param {string} secret Secret key for authentication.
     * @returns Object with headers for authentication.
     */
    #getAuthorizationHeaders(token, secret) {
        const timestamp = Date.now();
        const nonce = randomBytes(16).toString('base64');
        const data = token + timestamp + nonce;
        const signTerm = createHmac('sha256', secret)
            .update(Buffer.from(data, 'utf-8'))
            .digest();
    
        return {
            'Authorization': token,
            'sign': signTerm.toString('base64'),
            'nonce': nonce,
            't': timestamp
        };
    }

    /**
     * Validates whether token and secret are valid.
     * 
     * @returns Undefined or object with validation error.
     */
    #validateCredentials() {
        if (!this.token || !this.secret) {
            return { error: 'Invalid token or secret' };
        }
    }
}
