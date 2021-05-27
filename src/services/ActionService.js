import {ACTION_SERVICE_URL} from '../constants'
import axios from 'axios'

/**
 * API Entry URL
 * @type {string}
 */
const API_ENTRYPOINT = ACTION_SERVICE_URL + '/action/api';

/**
 * REST-Anfragen an den Maßnahmen-Service
 */

export async function isActionHealthy() {
    return await axios.get(API_ENTRYPOINT + "/actuator/health")
}

export async function getActionRequestById(actionRequestId) {
    return await axios.get(API_ENTRYPOINT +
        "/action" + "/" + actionRequestId)
}

export async function getAllActionRequestsByVppId(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/action" + "/by/vpp/" + virtualPowerPlantId)
}

export async function scheduleActionRequest(dto) {
    return await axios.post(API_ENTRYPOINT +
        "/action", dto)
}

