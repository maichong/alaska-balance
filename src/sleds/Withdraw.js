/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import service from '../';

export default class Withdraw extends alaska.Sled {

  /**
   * @param data
   *        data.user
   *        [data.currency]
   *        data.amount
   *        [data.note]
   *        [data.title]
   *        [data.withdraw]  前置钩子中生成的记录
   */
  async exec(data) {
    let withdraw = data.withdraw;
    if (withdraw) return withdraw;

    let currency = data.currency || service.defaultCurrency.value;
    if (!service.currenciesMap[currency]) service.error('Unknown currency');

    let amount = Math.abs(data.amount) || service.error('Invalid amount');

    let user = data.user;

    let balance = user.get(currency);
    if (balance < amount) service.error('Insufficient balance');
    await user._[currency].income(-amount, data.title || 'Withdraw', 'withdraw');
    const Withdraw = service.model('Withdraw');
    withdraw = new Withdraw({
      title: data.title,
      note: data.note,
      user: user._id,
      currency,
      amount
    });
    await withdraw.save();
    return withdraw;
  }
}
