import {ACTION_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = ACTION_SERVICE_URL + '/action/api';

/**
 * Load Calls
 */
export async function getActionRequestById(actionRequestBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/action" + "/" + actionRequestBusinessKey)
}

export async function getAllActionRequestsByVppId(vppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/action" + "/by/vpp/" + vppBusinessKey)
}

export async function scheduleActionRequest(vppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/action" + "/schedule/" + vppBusinessKey)
}

