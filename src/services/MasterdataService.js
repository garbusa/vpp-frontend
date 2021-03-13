import {SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = SERVICE_URL + '/masterdata/api';

/**
 * VPP Calls
 */
export async function getAllVpps() {
    return await axios.get(API_ENTRYPOINT + "/vpp")
}

export async function getVppById(businessKey) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + businessKey)
}

export async function saveVpp(dto) {
    return await axios.post(API_ENTRYPOINT + "/vpp", dto)
}

export async function deleteVppById(businessKey) {
    return await axios.delete(API_ENTRYPOINT + "/vpp" + "/" + businessKey)
}

export async function publishVppById(businessKey) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + businessKey + "/publish")
}

export async function unpublishVppById(businessKey) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + businessKey + "/unpublish")
}

export async function updateVppById(businessKey, dto) {
    return await axios.put(API_ENTRYPOINT + "/vpp" + "/" + businessKey, dto)
}

/**
 * DPP Calls
 */

export async function getAllDppByVppId(vppBusinessKey) {
    return await axios.get(API_ENTRYPOINT + "/dpp/by/vpp" + "/" + vppBusinessKey)
}

export async function getDppById(businessKey) {
    return await axios.get(API_ENTRYPOINT + "/dpp" + "/" + businessKey)
}

export async function saveDppToVpp(dto, vppBusinessKey) {
    return await axios.post(API_ENTRYPOINT + "/dpp/by/vpp" + "/" + vppBusinessKey, dto)
}

export async function deleteDppById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/dpp" + "/" + businessKey
        + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateDppById(dto, vppBusinessKey) {
    return await axios.put(API_ENTRYPOINT +
        "/dpp" + "/" + dto.decentralizedPowerPlantId
        + "?vppBusinessKey=" + vppBusinessKey, dto)
}

/**
 * Household Calls
 */

export async function getAllHouseholdByVppId(vppBusinessKey) {
    return await axios.get(API_ENTRYPOINT + "/household/by/vpp" + "/" + vppBusinessKey)
}

export async function getHouseholdById(businessKey) {
    return await axios.get(API_ENTRYPOINT + "/household" + "/" + businessKey)
}

export async function saveHouseholdToVpp(dto, vppBusinessKey) {
    return await axios.post(API_ENTRYPOINT + "/household/by/vpp" + "/" + vppBusinessKey, dto)
}

export async function deleteHouseholdById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/household" + "/" + businessKey
        + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateHouseholdById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/household" + "/" + businessKey
        + "?vppBusinessKey=" + vppBusinessKey, dto)
}

/**
 * Producer Calls
 */

export async function getAllProducerByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/producer/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllProducerByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/producer/by/household" + "/" + householdBusinessKey)
}

export async function getProducerById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/producer" + "/" + businessKey)
}

export async function saveProducerToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/producer/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveProducerToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/producer/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteProducerById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/producer" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateProducerById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/producer" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}

/**
 * Storage Calls
 */
export async function getAllStorageByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/storage/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllStorageByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/storage/by/household" + "/" + householdBusinessKey)
}

export async function getStorageById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/storage" + "/" + businessKey)
}

export async function saveStorageToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/storage/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveStorageToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/storage/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteStorageById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/storage" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateStorageById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/Storage" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}