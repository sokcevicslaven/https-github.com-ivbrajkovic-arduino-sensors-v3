/**
 * Recipes router module
 */

// Express router
const router = require('express').Router();

// Async wrapper
const { asyncWrapper } = require('./utils');

// Recipes controller
const { RecipesController } = require('./controllers');

// Authorization middleware
const { privateRoute } = require('./middleware');

// Validators
const { recipes: recipesValidator, validate } = require('./validators');

// Get wine recipes data
router.get('/', privateRoute, asyncWrapper(RecipesController.selectAll));

// Insert wine recipes data
router.post(
  '/',
  privateRoute,
  asyncWrapper(validate(recipesValidator.insertRecipesData)),
  asyncWrapper(RecipesController.insertRecipesData)
);

// update wine recipes data
router.put(
  '/',
  privateRoute,
  asyncWrapper(validate(recipesValidator.updateRecipesData)),
  asyncWrapper(RecipesController.updateRecipesData)
);

// delete wine recipes data
router.delete(
  '/:day',
  privateRoute,
  asyncWrapper(validate(recipesValidator.delete)),
  asyncWrapper(RecipesController.deleteRecipesData)
);

// Export router
module.exports = router;
