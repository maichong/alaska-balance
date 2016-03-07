/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import Currency from './Currency';

export default class Income extends service.Model {

  static label = '收支记录';
  static defaultColumns = 'title';
  static defaultSort = '-createdAt';

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    user: {
      label: '用户',
      type: 'relationship',
      ref: 'User',
      index: true
    },
    currency: {
      label: '货币',
      type: Currency
    },
    amount: {
      label: '数量',
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

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
