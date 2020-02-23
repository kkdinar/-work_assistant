const Sequelize = require('sequelize');

module.exports.testConnectionSqlite3 = async () => {
    //Подключение к базе sqlite3/main.db
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './sqlite3/main.db'
    });

    //Проверка соединения с базой
    let message;
    await sequelize
        .authenticate()
        .then(() => {
            message = 'Connection has been established successfully.';
        })
        .catch(err => {
            message = 'Unable to connect to the database:' + err;
        });

    //Закрываем соединение с базой
    sequelize.close();

    return message;
};