/**
 * Recipes controller
 */

// Recipes services
const { RecipesService } = require('@api/services');

module.exports = class recipesController {
  /**************************************************************
   * Insert recipes data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static insertRecipesData = async req => {
    const { day, min, max } = req.body;
    const { changes } = await RecipesService.insertRecipesData({
      day,
      min,
      max
    });
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * update recipes data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static updateRecipesData = async req => {
    const { day, min, max } = req.body;
    const { changes } = await RecipesService.updateRecipesData({
      day,
      min,
      max
    });
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * delete recipes data
   @param {*} data Client req 
   @returns {*} Response object and status code
   */
  static deleteRecipesData = async req => {
    const { day } = req.params;

    const { changes } = await RecipesService.deleteRecipesData({
      day
    });
    return { changes };
  };
  /**************************************************************/

  /**************************************************************
   * Select all wine recipes data
   @returns {*} Response object and status code
   */
  static selectAll = async () => {
    const data = await RecipesService.selectAll();
    return { data };
  };
  /**************************************************************/
};
