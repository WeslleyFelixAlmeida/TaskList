const connection = require('./Connection');
class UserModel {
    constructor() { };

    static checarExistenciaUsuario({ nomeUsuario }) {
        const sqlCommand = "SELECT nomeUsuario FROM usuarios WHERE nomeUsuario = ?;";
        const values = [nomeUsuario];

        return new Promise((resolve, reject) => {
            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result.length > 0);
            });
        });
    }

    static async cadastrarUsuario({ nomeUsuario, senhaUsuario }) {
        try {
            let usuarioExiste = await this.checarExistenciaUsuario({ nomeUsuario });

            if (usuarioExiste) {
                throw new Error("Erro, usuário já existe!");
            }

            const sqlCommand = "INSERT INTO usuarios VALUES (DEFAULT, ?, ?, NOW());";

            const values = [
                nomeUsuario,
                senhaUsuario
            ];

            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    return err;
                }

                return result.insertId;
            });

        } catch (err) {
            throw new Error("Erro ao cadastrar usuário: " + err.message);
        }
    }

    static async loginProcesso({ nomeUsuario, senhaUsuario }) {
        const sqlCommand = "SELECT id, nomeUsuario, senhaUsuario FROM usuarios WHERE nomeUsuario = ?;";

        const values = [
            nomeUsuario,
        ]

        try {
            const query = await connection.promise().query(sqlCommand, values);
            return query[0];
        } catch (err) {
            return err;
        }
    }

    static async adicionarToken(idUsuario, keyUsuario) {
        const sqlCommand = "INSERT INTO userLogged VALUES (DEFAULT, ?, ?, ?, ?);";
        const dataAtual = new Date();
        const dataAtualFormatada = dataAtual.toISOString().slice(0, 19).replace("T", " ");

        const dataExclusao = new Date();
        dataExclusao.setDate(dataAtual.getDate() + 3);
        const dataExclusaoFormatada = dataExclusao.toISOString().slice(0, 19).replace("T", " ");


        const values = [
            keyUsuario,
            dataAtualFormatada,
            dataExclusaoFormatada,
            idUsuario
        ];

        connection.query(sqlCommand, values, (err, result) => {
            if (err) {
                return err
            }

            return result;
        });
    }

    static buscarUsuarioPorToken({ token }) {
        const sqlCommand = "SELECT horaCriacao, horaFinalizacao, idUsuario FROM userLogged WHERE keyUsuario = ?";
        const values = [
            token
        ];

        return new Promise((resolve, reject) => {
            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static logout({ token }) {
        const sqlCommand = "DELETE FROM userLogged WHERE keyUsuario = ?";
        const values = [
            token
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });
        } catch (err) {
            return err;
        }
    }

    static async getUserInfos({ id }) {
        const sqlCommand = "SELECT nomeUsuario, senhaUsuario FROM usuarios WHERE id = ?;";

        const values = [
            id,
        ];

        try {
            const query = await connection.promise().query(sqlCommand, values);
            return query[0];
        } catch (err) {
            return err;
        }
    }

    static async alterarNomeUsuario({ id, nomeUsuario }) {
        const sqlCommand = "UPDATE usuarios SET nomeUsuario = ? WHERE id = ?";
        const values = [
            nomeUsuario,
            id
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    return err;
                }
                return result;
            });
        } catch (err) {
            return err;
        }
    }

    static async alterarSenhaUsuario({ id, senhaUsuario }) {
        try {
            const sqlCommand = "UPDATE usuarios SET senhaUsuario = ? WHERE id = ?";
            const values = [
                senhaUsuario,
                id
            ];
            return new Promise((resolve, reject) => {
                connection.query(sqlCommand, values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            })
        } catch (err) {
            return err;
        }
    }

    static async deletarConta({ id }) {
        try {
            const sqlCommand = "DELETE from usuarios WHERE id = ?";
            const values = [id];

            return new Promise((resolve, reject) => {
                connection.query(sqlCommand, values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            return err;
        }
    }
}

module.exports = UserModel;