//controller between mysql and the express routes for customers
import quiltQuery from "../database/connection";

/**
 * 
 * @param {*} ALL all customers query
 * @returns Array of customer objects OR error object
 */
async function getAll() {
    return await quiltQuery("SELECT * FROM customers", []);
}

/**
 * 
 * @param {*} cintID Get single customer by CustomerID 
 * @returns Single customer object OR error object
 */
async function getOne(cintID) {
    return await quiltQuery("SELECT * FROM customers WHERE CustomerID = ?", 
      [cintID]);
}

/**
 * 
 * @param {*} objCustData  Inserts New customer data object
 * @returns CustomerID assigned from database OR error object
 */
async function insertOne(objCustData) {
    return await quiltQuery(
        `INSERT INTO customers SET ?`,
        [objCustData]);
};

/**
 * 
 * @param {*} cintID  CustomerID to receive the updates
 * @param {*} objCustData  Updated field list and values to modify
 * @returns confirmation OR error object
 */
async function updateOne(cintID, objCustData) {
    return await quiltQuery(
        `UPDATE customers SET ? WHERE CustomerID = ?`,
        [objCustData, cintID]);
};

/**
 * 
 * @param {*} cintID CustomerID to be deleted
 * @returns confirmation OR error object
 */
async function deleteOne(cintID) {
    return await quiltQuery(
        `DELETE FROM customers WHERE CustomerID = ?`,
        [cintID]);
};

export { getAll, 
         getOne, 
         insertOne, 
         updateOne, 
         deleteOne,
         };