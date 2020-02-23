const Koa = require('koa');
const app = new Koa();
const config = require('./config');
const testdb = require("./testConnectionDB.js");
const users = require('./models/users.js');

//Вывод на экран сообщения
app.use(async ctx => {

    //Проверка подключения к базе sqlite3 
    let message;
    await testdb.testConnectionSqlite3()
        .then((mes) => message = mes);
    await users.syncSqlite3()
        .then((mes) => message = message + mes);

    ctx.body = message;
});

app.listen(config.main_port);