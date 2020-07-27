module.exports = async function loginMiddleware(ctx, next) {
    if (!ctx.session.login) {
        ctx.status = 403;
        ctx.body = "Forbidden";
    };
    await next();
}