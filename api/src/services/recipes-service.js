/**
 * Recipes service
 */

// Debug
const debug = new require('debug')('api:services:RecipesService');

// Config
const config = require('@api/config');

// Recipes service class
module.exports = class RecipesService {
  // Db path
  static dbDir = config.db.dbDirAlias;

  /**************************************************************
   * Insert wine recipes data into database
   @param {*} data Recipes data
   */
  static insertRecipesData = async ({ day, min, max }) => {
    const db = (await require(this.dbDir)).wine;
    const data = [day, min, max];

    const { changes } = await db.insert(data);

    debug('Recipes data inserted successfully');
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * update wine recipes data into database
   @param {*} data Recipes data
   */
  static updateRecipesData = async ({ day, min, max }) => {
    const db = (await require(this.dbDir)).wine;
    const data = [min, max, day];

    const { changes } = await db.update(data);

    debug('Recipes data updated successfully');
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * delete wine recipes data into database
   @param {*} data Recipes data
   */
  static deleteRecipesData = async ({ day }) => {
    const db = (await require(this.dbDir)).wine;

    const { changes } = await db.delete([day]);

    debug('Recipes data deleted successfully');
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Get all wine recipes data from database
   */
  static selectAll = async () => {
    const db = (await require(this.dbDir)).wine;
    const data = await db.selectAll();
    debug('Recipes retrieved successfully');
    return data;
  };
  /**************************************************************/
};
