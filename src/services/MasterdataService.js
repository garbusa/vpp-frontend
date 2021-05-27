import {MASTERDATA_SERVICE_URL} from '../constants'
import axios from 'axios'

const API_ENTRYPOINT = MASTERDATA_SERVICE_URL + '/masterdata/api';

export async function isMasterdataHealthy() {
    return await axios.get(API_ENTRYPOINT + "/actuator/health")
}

/**
 * REST-Anfragen an die VK-Ressource des Daten-Service
 */
export async function getAllVpps() {
    return await axios.get(API_ENTRYPOINT + "/vpp")
}

export async function getAllActiveVpps() {
    return await axios.get(API_ENTRYPOINT + "/vpp/active")
}

export async function getVppById(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + virtualPowerPlantId)
}

export async function saveVpp(dto) {
    return await axios.post(API_ENTRYPOINT + "/vpp", dto)
}

export async function deleteVppById(virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT + "/vpp" + "/" + virtualPowerPlantId)
}

export async function publishVppById(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + virtualPowerPlantId + "/publish")
}

export async function unpublishVppById(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/vpp" + "/" + virtualPowerPlantId + "/unpublish")
}

export async function updateVppById(virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT + "/vpp" + "/" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die DK-Ressource des Daten-Service
 */
export async function getAllDppByVppId(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/dpp/by/vpp" + "/" + virtualPowerPlantId)
}

export async function getDppById(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/dpp" + "/" + decentralizedPowerPlantId)
}

export async function saveDppToVpp(dto, virtualPowerPlantId) {
    return await axios.post(API_ENTRYPOINT + "/dpp/by/vpp" + "/" + virtualPowerPlantId, dto)
}

export async function deleteDppById(decentralizedPowerPlantId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/dpp" + "/" + decentralizedPowerPlantId
        + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateDppById(decentralizedPowerPlantId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/dpp" + "/" + decentralizedPowerPlantId
        + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die Haushalts-Ressource des Daten-Service
 */
export async function getAllHouseholdByVppId(virtualPowerPlantId) {
    return await axios.get(API_ENTRYPOINT + "/household/by/vpp" + "/" + virtualPowerPlantId)
}

export async function getHouseholdById(householdId) {
    return await axios.get(API_ENTRYPOINT + "/household" + "/" + householdId)
}

export async function saveHouseholdToVpp(virtualPowerPlantId, dto) {
    return await axios.post(API_ENTRYPOINT + "/household/by/vpp" + "/" + virtualPowerPlantId, dto)
}

export async function deleteHouseholdById(householdId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/household" + "/" + householdId
        + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateHouseholdById(householdId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/household" + "/" + householdId
        + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die Wasserkraftanlagen-Ressource des Daten-Service
 */
export async function getAllWatersByDppId(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/water/by/dpp" + "/" + decentralizedPowerPlantId)
}

export async function getAllWatersByHouseholdId(householdId) {
    return await axios.get(API_ENTRYPOINT +
        "/water/by/household" + "/" + householdId)
}

export async function getWaterById(waterEnergyId) {
    return await axios.get(API_ENTRYPOINT +
        "/water" + "/" + waterEnergyId)
}

export async function saveWaterToDpp(dto, decentralizedPowerPlantId) {
    return await axios.post(API_ENTRYPOINT +
        "/water/by/dpp" + "/" + decentralizedPowerPlantId, dto)
}

export async function saveWaterToHousehold(dto, householdId) {
    return await axios.post(API_ENTRYPOINT +
        "/water/by/household" + "/" + householdId, dto)
}

export async function deleteWaterById(waterEnergyId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/water" + "/" + waterEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateWaterById(waterEnergyId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/water" + "/" + waterEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die Windkraftanlagen-Ressource des Daten-Service
 */
export async function getAllWindsByDppId(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/wind/by/dpp" + "/" + decentralizedPowerPlantId)
}

export async function getAllWindsByHouseholdId(householdId) {
    return await axios.get(API_ENTRYPOINT +
        "/wind/by/household" + "/" + householdId)
}

export async function getWindById(windEnergyId) {
    return await axios.get(API_ENTRYPOINT +
        "/wind" + "/" + windEnergyId)
}

export async function saveWindToDpp(dto, decentralizedPowerPlantId) {
    return await axios.post(API_ENTRYPOINT +
        "/wind/by/dpp" + "/" + decentralizedPowerPlantId, dto)
}

export async function saveWindToHousehold(dto, householdId) {
    return await axios.post(API_ENTRYPOINT +
        "/wind/by/household" + "/" + householdId, dto)
}

export async function deleteWindById(windEnergyId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/wind" + "/" + windEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateWindById(windEnergyId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/wind" + "/" + windEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die Solaranlagen-Ressource des Daten-Service
 */
export async function getAllSolarsByDppId(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/solar/by/dpp" + "/" + decentralizedPowerPlantId)
}

export async function getAllSolarsByHouseholdId(householdId) {
    return await axios.get(API_ENTRYPOINT +
        "/solar/by/household" + "/" + householdId)
}

export async function getSolarById(solarEnergyId) {
    return await axios.get(API_ENTRYPOINT +
        "/solar" + "/" + solarEnergyId)
}

export async function saveSolarToDpp(dto, decentralizedPowerPlantId) {
    return await axios.post(API_ENTRYPOINT +
        "/solar/by/dpp" + "/" + decentralizedPowerPlantId, dto)
}

export async function saveSolarToHousehold(dto, householdId) {
    return await axios.post(API_ENTRYPOINT +
        "/solar/by/household" + "/" + householdId, dto)
}

export async function deleteSolarById(solarEnergyId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/solar" + "/" + solarEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateSolarById(solarEnergyId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/solar" + "/" + solarEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}


/**
 * REST-Anfragen an die alternativen Erzeugungsanlagen-Ressource des Daten-Service
 */
export async function getAllOthersByDppId(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/other/by/dpp" + "/" + decentralizedPowerPlantId)
}

export async function getAllOthersByHouseholdId(householdId) {
    return await axios.get(API_ENTRYPOINT +
        "/other/by/household" + "/" + householdId)
}

export async function getOtherById(otherEnergyId) {
    return await axios.get(API_ENTRYPOINT +
        "/other" + "/" + otherEnergyId)
}

export async function saveOtherToDpp(dto, decentralizedPowerPlantId) {
    return await axios.post(API_ENTRYPOINT +
        "/other/by/dpp" + "/" + decentralizedPowerPlantId, dto)
}

export async function saveOtherToHousehold(dto, householdId) {
    return await axios.post(API_ENTRYPOINT +
        "/other/by/household" + "/" + householdId, dto)
}

export async function deleteOtherById(otherEnergyId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/other" + "/" + otherEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateOtherById(otherEnergyId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/other" + "/" + otherEnergyId + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}

/**
 * REST-Anfragen an die Speicheranlagen-Ressource des Daten-Service
 */
export async function getAllStorageByDppId(decentralizedPowerPlantId) {
    return await axios.get(API_ENTRYPOINT +
        "/storage/by/dpp" + "/" + decentralizedPowerPlantId)
}

export async function getAllStorageByHouseholdId(householdId) {
    return await axios.get(API_ENTRYPOINT +
        "/storage/by/household" + "/" + householdId)
}

export async function getStorageById(storageId) {
    return await axios.get(API_ENTRYPOINT +
        "/storage" + "/" + storageId)
}

export async function saveStorageToDpp(dto, decentralizedPowerPlantId) {
    return await axios.post(API_ENTRYPOINT +
        "/storage/by/dpp" + "/" + decentralizedPowerPlantId, dto)
}

export async function saveStorageToHousehold(dto, householdId) {
    return await axios.post(API_ENTRYPOINT +
        "/storage/by/household" + "/" + householdId, dto)
}

export async function deleteStorageById(storageId, virtualPowerPlantId) {
    return await axios.delete(API_ENTRYPOINT +
        "/storage" + "/" + storageId + "?virtualPowerPlantId=" + virtualPowerPlantId)
}

export async function updateStorageById(storageId, virtualPowerPlantId, dto) {
    return await axios.put(API_ENTRYPOINT +
        "/storage" + "/" + storageId + "?virtualPowerPlantId=" + virtualPowerPlantId, dto)
}