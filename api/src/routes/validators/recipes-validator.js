/**
 * Recipes validator
 */

// Express validator middleware
const { body, param } = require('express-validator');

/**
 * Check field
 */
const checkField = object =>
  object
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage('Field must contain only number');

/**
 * Export validation object
 */
module.exports = {
  // Check number of row param
  delete: [checkField(param('day'))],

  // Check value to insert
  insertRecipesData: [
    checkField(body('day')),
    checkField(body('min')),
    checkField(body('max'))
  ],

  // Check value to insert
  updateRecipesData: [
    checkField(body('day')),
    checkField(body('min')),
    checkField(body('max'))
  ]
};
