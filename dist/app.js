'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _utils = require('./utils');

var _config = require('./config');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_utils.utils.dbConnection();

app.set('port', process.env.PORT || 8888);
app.set('jwt-secret', _config.config.secret);

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ urlencoded: true }));

app.use('/', _api2.default);

app.listen(app.get('port'), function () {
    console.log('Server Running on port ' + app.get('port'));
});