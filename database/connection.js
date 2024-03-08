const mysql = require("mysql2");
const config = require("../config");

const quiltConnection = mysql.createPool(config.mysql);

/**
 *
 * @param {string} cstrQuery SQL query or the database
 * @param {array} cstrValues parameters needed for the SQL
 * @returns Asynch returns either an error, or the response from database
 */
//return an asynch promise
function quiltQuery(cstrQuery, cstrValues) {
  return new Promise((objResolve, objReject) => {
    quiltConnection.query(cstrQuery, cstrValues, (objErr, objResults) => {
      if (objErr) {
        objReject(objErr);
      } else {
        objResolve(objResults);
      }
    });
  });
}

module.exports = quiltQuery;
