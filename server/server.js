const Next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const Mongo = require('koa-mongo');
const KoaBody = require('koa-body');
const Session = require('koa-session');
const authRouter = require('./router/authRouter.js');
const employeesRouter = require('./router/employeesRouter.js');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const server = new Koa();
const router = new Router();
const app = Next({ dev: true });
const handle = app.getRequestHandler();
server.keys = ['nextJS'];

(async () => {
    try {
        await app.prepare();

        router.get('(.*)', async (ctx) => {
            ctx.req.session = ctx.session.login
            await handle(ctx.req, ctx.res);
            ctx.respond = false;
        });

        server.use(Mongo({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME
        }))
            .use(Session(server))
            .use(KoaBody({ multipart: true }))
            .use(authRouter.routes())
            .use(employeesRouter.routes())
            .use(router.routes())
            .listen(process.env.PORT, () => {
                console.log(`server running at ${process.env.PORT}`);
            });
    } catch (e) {
        console.log(e);
        process.exit();
    }
})();

