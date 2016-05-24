/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

const User = service.model('user.User');

export default class WithdrawReject extends service.Sled {
  async exec(data) {
    let withdraw = data.withdraw;
    if (withdraw.state === 0) {
      let reason = data.body.reason || service.error('Missing reject reason');
      withdraw.state = -1;
      withdraw.reason = reason;
      await withdraw.save();

      let user = await User.findById(withdraw.user);
      if (user) {
        await user._[withdraw.currency].income(withdraw.amount, 'Withdraw Rejected', 'withdraw_rejected');
      }
    } else if (withdraw.state !== -1) {
      service.error('State error');
    }
    return withdraw.toObject();
  }
}
