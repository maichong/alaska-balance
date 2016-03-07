/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

export default class Currency extends service.Model {

  static label = 'Currency';
  static title = 'name';
  static defaultColumns = '';
  static defaultSort = '-sort';

  static fields = {
    name: {
      label: '名称',
      type: String,
      require: true
    },
    unit: {
      label: '单位',
      type: String,
      require: true
    },
    isDefault: {
      label: '是否是默认',
      type: Boolean,
      default: false
    },
    sort: {
      label: '排序',
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
