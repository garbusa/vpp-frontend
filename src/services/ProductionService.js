import {PRODUCTION_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = PRODUCTION_SERVICE_URL + '/production/api';

/**
 * REST-Anfragen an den Erzeugungs-Service
 */
export async function isProductionHealthy() {
    return await axios.get(API_ENTRYPOINT + "/actuator/health")
}


export async function getAllProductionsByActionRequestId(actionRequestId) {
    return await axios.get(API_ENTRYPOINT +
        "/production" + "/" + actionRequestId)
}

