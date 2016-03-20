'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/**
 * @class BalanceService
 */
class BalanceService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-balance';
    options.dir = __dirname;
    super(options, alaska);
  }

  postInit() {
    let service = this;
    let currencies = this.config('currencies');
    if (!currencies || !currencies.length) {
      throw new Error('alaska-balance service require currency settings.');
    }
    this._currencies = currencies;
    let currenciesMap = this._currenciesMap = {};
    currencies.forEach(c => {
      currenciesMap[c.value] = c;
      if (c.default) {
        this._defaultCurrency = c;
      }
    });
    if (!this._defaultCurrency) {
      throw new Error('Default currency not specified.');
    }

    let userService = this.service('user');
    userService.pre('registerModel', function (Model) {
      if (Model.name !== 'User') {
        return;
      }
      currencies.forEach(c => {
        Model.underscoreMethod(c.value, 'income', function () {
          var ref = _asyncToGenerator(function* (amount, title) {
            let user = this;
            let balance = (0, _lodash.round)(user.get(c.value) + amount, c.precision);
            user.set(c.value, balance);
            let Income = service.model('Income');
            let imcome = new Income({
              title,
              amount,
              balance,
              currency: c.value,
              user
            });
            yield imcome.save();
            yield user.save();
          });

          return function (_x, _x2) {
            return ref.apply(this, arguments);
          };
        }());
        if (Model.fields[c.value]) {
          return;
        }
        Model.fields[c.value] = {
          label: c.label,
          type: Number,
          default: 0
        };
      });
    });
  }

  get currencies() {
    return this._currencies;
  }

  get defaultCurrency() {
    return this._defaultCurrency;
  }

  settings(user, settings) {
    var _this = this;

    return _asyncToGenerator(function* () {
      settings.currencies = _this._currenciesMap;
      settings.defaultCurrency = _this._defaultCurrency;
    })();
  }
}
exports.default = BalanceService;