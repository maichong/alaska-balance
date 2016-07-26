/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import USER from 'alaska-user';

export default class Init extends alaska.Sled {
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
