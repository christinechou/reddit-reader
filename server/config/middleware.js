const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = function(app, express) {

  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(express.static('client'))
  app.use(bodyParser.urlencoded({ extended: true}));

};
