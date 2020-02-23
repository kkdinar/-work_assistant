const Sequelize = require('sequelize');

module.exports.syncSqlite3 = async () => {

    //Подключение к базе sqlite3/main.db
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './sqlite3/main.db'
    });

    const Model = Sequelize.Model;
    class User extends Model {}
    User.init({
        // attributes
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
            // allowNull defaults to true
        }
    }, {
        sequelize,
        modelName: 'user'
        // options
    });

    //{force: true} - удалить таблицы и создать их заново, но уже с нужной нам структурой
    let message;
    await sequelize
        .sync({
            force: true
        })
        .then(result => message = 'Синхронизация прошла успешно')
        .catch(err => message = 'Синхронизация прошла НЕ успешно' + err);

    //Закрываем соединение с базой
    sequelize.close();
    return message;
};