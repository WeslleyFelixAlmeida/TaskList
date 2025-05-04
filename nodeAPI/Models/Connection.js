const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskListDb'
});

connection.connect((err) => {
    if(err){
        console.error('Erro de conexão', err);
        return;
    }
    console.log('Conectado com sucesso!');
});

module.exports = connection;