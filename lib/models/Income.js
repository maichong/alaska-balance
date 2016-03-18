'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class Income extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = Income;
Income.label = '收支记录';
Income.defaultColumns = 'title,user,currency,amount,balance,createdAt';
Income.defaultSort = '-createdAt';
Income.nocreate = true;
Income.noedit = true;
Income.noremove = true;
Income.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  user: {
    label: '用户',
    type: 'relationship',
    ref: 'user.User',
    index: true
  },
  currency: {
    label: '货币',
    type: 'select',
    options: service.currencies,
    default: service.defaultCurrency.value
  },
  amount: {
    label: '金额',
    type: Number,
    default: 0
  },
  balance: {
    label: '余额',
    type: Number,
    default: 0
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};