//controller between mysql and the express routes for salesartifacts
import quiltQuery from "../database/connection";

/**
 * 
 * @param {*} ALL all sales_artifacts query
 * @returns Array of sales_artifact objects OR error object
 */
async function getAll() {
    return await quiltQuery("SELECT * FROM sales_artifacts", []);
}

/**
 * 
 * @param {*} cintID Get single sales_artifact by sales_artifactID 
 * @returns Single sales_artifact object OR error object
 */
async function getOne(cintID) {
    return await quiltQuery("SELECT * FROM sales_artifacts WHERE SaleArtifactID = ?", 
      [cintID]);
}

/**
 * 
 * @param {*} cintID is the key for Workorder to get all images and loin to artifacts for file names 
 * @returns Single sales_artifact object OR error object
 */
async function getOneWorkOrder(cintID) {
    return await quiltQuery("SELECT artifacts.ArtType, artifacts.Category, artifacts.FileName FROM sales_artifacts, artifacts " +
                            "WHERE sales_artifacts.SaleID = ? AND sales_artifacts.ArtifactID = artifacts.ArtifactID", 
      [cintID]);
}

/**
 * 
 * @param {*} objSalesArtifactsData  Inserts New sales_artifact data object
 * @returns sales_artifactID assigned from database OR error object
 */
async function insertOne(objSalesArtifactsData) {
    return await quiltQuery(
        `INSERT INTO sales_artifacts SET ?`,
        [objSalesArtifactsData]);
};

/**
 * 
 * @param {*} cintID  sales_artifactID to receive the updates
 * @param {*} objSalesArtifactsData  Updated field list and values to modify
 * @returns confirmation OR error object
 */
async function updateOne(cintID, objSalesArtifactsData) {
    return await quiltQuery(
        `UPDATE sales_artifacts SET ? WHERE SaleArtifactID = ?`,
        [objSalesArtifactsData, cintID]);
};

/**
 * 
 * @param {*} cintID sales_artifactID to be deleted
 * @returns confirmation OR error object
 */
async function deleteOne(cintID) {
    return await quiltQuery(
        `DELETE FROM sales_artifacts WHERE SaleArtifactID = ?`,
        [cintID]);
};

export { getAll, 
         getOne, 
         insertOne, 
         updateOne, 
         deleteOne,
         getOneWorkOrder
         };