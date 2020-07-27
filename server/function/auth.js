const Bcrypt = require("bcrypt");

exports.login = async ctx => {
    const { username, password } = ctx.request.body;
    const user = await ctx.db.collection('users').findOne({ username });
    if (user) {
        const res = Bcrypt.compareSync(password, user.password);
        if (res) {
            ctx.session.login = user;
            ctx.body = "login successfully";
        }
    } else {
        ctx.throw(401, 'Unauthorized')
    }
}

exports.logout = async ctx => {
    ctx.session = null
    ctx.body = "logout successfully"
}
