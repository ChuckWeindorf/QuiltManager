//controller between mysql and the express routes for favorites
import quiltQuery from "../database/connection";

/**
 *
 * @param {*} ALL all favorites query
 * @returns Array of favorites objects OR error object
 */
async function getAll() {
  return await quiltQuery("SELECT * FROM favorites", []);
}

/**
 *
 * @param {*} cintID Get single favorite by favoriteID
 * @returns Single favorite object OR error object
 */
async function getOne(cintID) {
  return await quiltQuery("SELECT * FROM favorites WHERE favoriteID = ?", [
    cintID,
  ]);
}

/**
 *
 * @param {*} objfavoritesData  Inserts New favorite data object
 * @returns favoriteID assigned from database OR error object
 */
async function insertOne(objfavoritesData) {
  return await quiltQuery(`INSERT INTO favorites SET ?`, [objfavoritesData]);
}

/**
 *
 * @param {*} cintID  favoriteID to receive the updates
 * @param {*} objfavoritesData  Updated field list and values to modify
 * @returns confirmation OR error object
 */
async function updateOne(cintID, objfavoritesData) {
  return await quiltQuery(`UPDATE favorites SET ? WHERE favoriteID = ?`, [
    objfavoritesData,
    cintID,
  ]);
}

/**
 *
 * @param {*} cintID favoriteID to be deleted
 * @returns confirmation OR error object
 */
async function deleteOne(cintID) {
  return await quiltQuery(`DELETE FROM favorites WHERE favoriteID = ?`, [
    cintID,
  ]);
}

export { getAll, getOne, insertOne, updateOne, deleteOne };
