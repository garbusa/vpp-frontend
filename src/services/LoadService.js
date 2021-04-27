import {LOAD_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = LOAD_SERVICE_URL + '/load/api';

/**
 * Load Calls
 */
export async function getAllLoadsByActionRequestId(actionRequestBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/load" + "/" + actionRequestBusinessKey)
}

