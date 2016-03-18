'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

exports.default = {
  prefix: '/balance',
  services: [{ id: 'alaska-user', alias: 'user' }],
  currencies: [{
    value: 'balance',
    label: '余额',
    unit: '元',
    //精确到小数点后两位
    precision: 2,
    default: true
  }, {
    value: 'credit',
    label: '积分',
    unit: '点'
  }]
};