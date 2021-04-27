import {MASTERDATA_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = MASTERDATA_SERVICE_URL + '/masterdata/api';

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

export async function updateDppById(dppBusinessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/dpp" + "/" + dppBusinessKey
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

export async function saveHouseholdToVpp(vppBusinessKey, dto) {
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
 * WaterEnergy Calls
 */

export async function getAllWatersByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/water/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllWatersByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/water/by/household" + "/" + householdBusinessKey)
}

export async function getWaterById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/water" + "/" + businessKey)
}

export async function saveWaterToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/water/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveWaterToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/water/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteWaterById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/water" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateWaterById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/water" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}

/**
 * WindEnergy Calls
 */

export async function getAllWindsByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/wind/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllWindsByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/wind/by/household" + "/" + householdBusinessKey)
}

export async function getWindById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/wind" + "/" + businessKey)
}

export async function saveWindToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/wind/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveWindToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/wind/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteWindById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/wind" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateWindById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/wind" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}

/**
 * SolarEnergy Calls
 */

export async function getAllSolarsByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/solar/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllSolarsByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/solar/by/household" + "/" + householdBusinessKey)
}

export async function getSolarById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/solar" + "/" + businessKey)
}

export async function saveSolarToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/solar/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveSolarToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/solar/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteSolarById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/solar" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateSolarById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/solar" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}


/**
 * OtherEnergy Calls
 */

export async function getAllOthersByDppId(dppBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/other/by/dpp" + "/" + dppBusinessKey)
}

export async function getAllOthersByHouseholdId(householdBusinessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/other/by/household" + "/" + householdBusinessKey)
}

export async function getOtherById(businessKey) {
    return await axios.get(API_ENTRYPOINT +
        "/other" + "/" + businessKey)
}

export async function saveOtherToDpp(dto, dppBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/other/by/dpp" + "/" + dppBusinessKey, dto)
}

export async function saveOtherToHousehold(dto, householdBusinessKey) {
    return await axios.post(API_ENTRYPOINT +
        "/other/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteOtherById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/other" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateOtherById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/other" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
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
    console.log("2.sending dto", dto);
    return await axios.post(API_ENTRYPOINT +
        "/storage/by/household" + "/" + householdBusinessKey, dto)
}

export async function deleteStorageById(businessKey, vppBusinessKey) {
    return await axios.delete(API_ENTRYPOINT +
        "/storage" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey)
}

export async function updateStorageById(businessKey, vppBusinessKey, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/storage" + "/" + businessKey + "?vppBusinessKey=" + vppBusinessKey, dto)
}