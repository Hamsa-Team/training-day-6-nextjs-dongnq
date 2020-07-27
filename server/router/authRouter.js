const Router = require('koa-router');
const { login, logout } = require('../function/auth.js');
const authRouter = new Router();

authRouter.post('/api/login', ctx => login(ctx));
authRouter.get('/api/logout', ctx => logout(ctx));

module.exports = authRouter;