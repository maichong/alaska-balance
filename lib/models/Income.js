'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

class Income extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = Income;
Income.label = 'Income Record';
Income.defaultColumns = 'title,user,currency,amount,balance,createdAt';
Income.defaultSort = '-createdAt';
Income.nocreate = true;
Income.noedit = true;
Income.noremove = true;
Income.fields = {
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