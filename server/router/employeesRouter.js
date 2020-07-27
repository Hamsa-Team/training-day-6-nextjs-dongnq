const Router = require('koa-router');
const loginMiddleware = require('../middleware/loginMiddleware.js');
const { getEmployees, crawlEmployees } = require('../function/employees.js');

const employeesRouter = new Router({ prefix: '/api/employees' });

employeesRouter.use(loginMiddleware);
employeesRouter.get('/', ctx => getEmployees(ctx));
employeesRouter.get('/crawl', ctx => crawlEmployees(ctx));

module.exports = employeesRouter;