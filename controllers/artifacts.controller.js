//controller between mysql and the express routes for artifacts
import quiltQuery from "../database/connection";

/**
 * 
 * @param {*} ALL all artifacts query
 * @returns Array of artifact objects OR error object
 */
async function getAll() {
    return await quiltQuery("SELECT * FROM artifacts", []);
}

/**
 * 
 * @param {*} cintID Get single artifact by artifactID 
 * @returns Single artifact object OR error object
 */
async function getOne(cintID) {
    return await quiltQuery("SELECT * FROM artifacts WHERE ArtifactID = ?", [cintID]);
}

/**
 * 
 * @param {*} retrieve all categories
 * @returns list of unique categories available in artifacts OR error object
 */
async function getCats() {
    return await quiltQuery("SELECT DISTINCT category FROM artifacts", []);
}

/**
 * 
 * @param {*} retrieve all artifacs in one category
 * @returns list of artifacts for category OR error object
 */
async function getCatList(cstrCat) {
    //console.log(`get cat list with ${cstrCat}`);
    return await quiltQuery
    (`SELECT * FROM artifacts WHERE arttype = "Pattern" and category = ?`, [cstrCat]);
}


/**
 * 
 * @param {*} objArtifactsData  Inserts New artifact data object
 * @returns artifactID assigned from database OR error object
 */
async function insertOne(objArtifactsData) {
    return await quiltQuery(
        `INSERT INTO artifacts SET ?`,
        [objArtifactsData]);
};

/**
 * 
 * @param {*} cintID  artifactID to receive the updates
 * @param {*} objArtifactsData  Updated field list and values to modify
 * @returns confirmation OR error object
 */
async function updateOne(cintID, objArtifactsData) {
    return await quiltQuery(
        `UPDATE artifacts SET ? WHERE ArtifactID = ?`,
        [objArtifactsData, cintID]);
};

/**
 * 
 * @param {*} cintID artifactID to be deleted
 * @returns confirmation OR error object
 */
async function deleteOne(cintID) {
    return await quiltQuery(
        `DELETE FROM artifacts WHERE ArtifactID = ?`,
        [cintID]);
};

export { getAll, 
         getOne, 
         getCats,
         getCatList,
         insertOne, 
         updateOne, 
         deleteOne
         };