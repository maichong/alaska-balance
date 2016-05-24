/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

export default class WithdrawAccept extends service.Sled {
  async exec(data) {
    let withdraw = data.withdraw;
    if (withdraw.state === 0) {
      withdraw.state = 1;
      await withdraw.save();
    }
    return withdraw.toObject();
  }
}
