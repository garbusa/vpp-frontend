import {ACTION_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = ACTION_SERVICE_URL + '/action/api';

/**
 * Load Calls
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

