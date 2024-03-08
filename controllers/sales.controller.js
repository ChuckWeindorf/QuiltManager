//controller between mysql and the express routes for sales
const quiltQuery = require("../database/connection");

//include left join for required customer information
const cstrQueryString =
  "SELECT " +
  "sales.SaleID, sales.CustomerID, Worktype, WorkDescription, OrderDate, ReceivedDate, " +
  "StartDate, CompleteDate, TargetDate, Paid, QuoteAmount, customers.LastName " +
  "FROM sales LEFT JOIN customers ON sales.CustomerID = customers.CustomerID";

/**
 *
 * @param {*} ALL all sales query
 * @returns Array of sales objects OR error object
 */
async function getAll() {
  return await quiltQuery(cstrQueryString, []);
}

/**
 *
 * @param {*} cintID is the customer id filter for all workorders
 * @returns workorder array or error object
 */
async function getAllCust(cintID) {
  return await quiltQuery(
    cstrQueryString + ` WHERE sales.CustomerID = ${cintID}`,
    []
  );
}

/**
 *
 * @param {*} cintID Get single sale by SaleID
 * @returns Single sale object OR error object
 */
async function getOne(cintID) {
  return await quiltQuery("SELECT * FROM sales WHERE SaleID = ?", [cintID]);
}

/**
 *
 * @param {*} objSalesData  Inserts New sale data object
 * @returns saleID assigned from database OR error object
 */
async function insertOne(objSalesData) {
  return await quiltQuery(`INSERT INTO sales SET ?`, [objSalesData]);
}

/**
 *
 * @param {*} cintID  saleID to receive the updates
 * @param {*} objSalesData  Updated field list and values to modify
 * @returns confirmation OR error object
 */
async function updateOne(cintID, objSalesData) {
  return await quiltQuery(`UPDATE sales SET ? WHERE SaleID = ?`, [
    objSalesData,
    cintID,
  ]);
}

/**
 *
 * @param {*} cintID saleID to be deleted
 * @returns confirmation OR error object
 */
async function deleteOne(cintID) {
  return await quiltQuery(`DELETE FROM sales WHERE SaleID = ?`, [cintID]);
}

 module.exports = {getAll, getOne, getAllCust, insertOne, updateOne, deleteOne}
