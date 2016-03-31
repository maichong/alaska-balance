/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

export default class Income extends service.Model {

  static label = 'Income Record';
  static defaultColumns = 'title,user,currency,amount,balance,createdAt';
  static defaultSort = '-createdAt';
  static nocreate = true;
  static noedit = true;
  static noremove = true;

  static fields = {
    title: {
      label: 'Title',
      type: String,
      require: true
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'user.User',
      index: true
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: service.currencies,
      default: service.defaultCurrency.value
    },
    amount: {
      label: 'Amount',
      type: Number,
      default: 0
    },
    balance: {
      label: 'Balance',
      type: Number,
      default: 0
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
