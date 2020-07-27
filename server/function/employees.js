const fs = require('fs')

exports.getEmployees = async ctx => {
    try {
        const employees = await ctx.db.collection('employees').find({}).toArray();
        ctx.status = 200;
        ctx.body = employees;
    } catch (err) {
        console.log(err);
    }
}

exports.crawlEmployees = async ctx => {
    try {
        let data = fs.readFileSync('employees.json', 'utf8');
        data = JSON.parse(data);
        data.map(employee => {
            ctx.db.collection('employees').updateOne(
                employee,
                { $set: employee },
                { upsert: true }
            )
        })
        const employees = await ctx.db.collection('employees').find({}).toArray();
        ctx.status = 200;
        ctx.body = employees;
    } catch (err) {
        ctx.body = "crawl failed, please try again";
        console.log(err);
    }
}