/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

const USER = service.service('user');

export default class Init extends service.Sled {
  exec() {
    USER.run('RegisterAbility', {
      id: 'admin.alaska-balance.withdraw.accept',
      title: `Accept Withdraw`,
      service: 'alaska-admin'
    });
    USER.run('RegisterAbility', {
      id: 'admin.alaska-balance.withdraw.reject',
      title: `Reject Withdraw`,
      service: 'alaska-admin'
    });
  }
}
