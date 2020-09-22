/**
 * Validators exports
 */

module.exports = {
  user: require('./user-validator'),
  data: require('./data-validator'),
  settings: require('./settings-validator'),
  recipes: require('./recipes-validator'),
  validate: require('./validate-request')
};
