/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */


import alaska from 'alaska';
import { round } from 'lodash';

/**
 * @class BalanceService
 */
export default class BalanceService extends alaska.Service {
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
        Model.underscoreMethod(c.value, 'income', async function (amount, title, type) {
          let user = this;
          let balance = round(user.get(c.value) + amount, c.precision);
          user.set(c.value, balance);
          let Income = service.model('Income');
          let imcome = new Income({
            type,
            title,
            amount,
            balance,
            currency: c.value,
            user
          });
          await imcome.save();
          await user.save();
        });
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

  get currenciesMap() {
    return this._currenciesMap;
  }

  get defaultCurrency() {
    return this._defaultCurrency;
  }

  async settings(user, settings) {
    settings.currencies = this._currenciesMap;
    settings.defaultCurrency = this._defaultCurrency;
  }
}

