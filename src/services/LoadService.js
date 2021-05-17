import {LOAD_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = LOAD_SERVICE_URL + '/load/api';

/**
 * Load Calls
 */
export async function isLoadHealthy() {
    return await axios.get(API_ENTRYPOINT + "/actuator/health")
}


export async function getAllLoadsByActionRequestId(actionRequestId) {
    return await axios.get(API_ENTRYPOINT +
        "/load" + "/" + actionRequestId)
}

