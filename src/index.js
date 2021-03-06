/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import alaska from 'alaska';
import USER from 'alaska-user';

/**
 * @class BalanceService
 */
class BalanceService extends alaska.Service {
  constructor(options) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-balance';
    super(options);
  }

  postInit() {
    let service = this;
    USER.pre('registerModel', function (Model) {
      if (Model.name !== 'User') return;
      service._currencies.forEach(c => {
        Model.underscoreMethod(c.value, 'income', async function (amount, title, type) {
          let user = this;
          let balance = (user.get(c.value) + amount) || 0;
          if (c.precision !== undefined) {
            balance = _.round(balance, c.precision);
          }
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
        if (Model.fields[c.value]) return;
        Model.fields[c.value] = {
          label: c.label,
          type: Number,
          default: 0,
          addonAfter: c.unit
        };
      });
    });
  }

  postLoadConfig() {
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

  async settings(ctx, user, settings) {
    settings.currencies = this._currenciesMap;
    settings.defaultCurrency = this._defaultCurrency;
  }
}

export default new BalanceService();
