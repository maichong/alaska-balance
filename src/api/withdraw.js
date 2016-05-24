/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

export async function create(ctx) {
  let user = ctx.user || service.error(403);
  let body = ctx.state.body || ctx.request.body;
  body.user = user;
  let withdraw = await service.run('Withdraw', body);
  ctx.body = withdraw.data('create');
}
