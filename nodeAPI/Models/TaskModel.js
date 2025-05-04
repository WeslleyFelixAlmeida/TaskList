const connection = require("./Connection");

class TaskModel {
    constructor() { }

    static async criarTarefa({ titulo, status, descricao, idUsuario, dataInicioTarefa, dataFimTarefa }) {
        const sqlCommand = "INSERT INTO tarefas VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)";
        let values = [
            titulo,
            descricao,
            status,
            idUsuario,
            dataInicioTarefa,
            dataFimTarefa
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });
        } catch (err) {
            return err;
        }
    }

    static async atualizarDescTarefa({ id, descricao, idUsuario }) {
        const sqlCommand = "UPDATE tarefas SET descricao = ? WHERE id = ? AND idUsuario = ?";
        let values = [
            descricao,
            id,
            idUsuario
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });
        }
        catch (err) {
            return err;
        }
    }

    static async atualizarTituloTarefa({ id, titulo, idUsuario }) {
        const sqlCommand = "UPDATE tarefas SET titulo = ? WHERE id = ? AND idUsuario = ?";
        let values = [
            titulo,
            id,
            idUsuario
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });

        } catch (err) {
            return err;
        }
    }

    static async atualizarDataFimTarefa({ id, dataFimTarefa, idUsuario }) {
        const sqlCommand = "UPDATE tarefas SET dataFimTarefa = ? WHERE id = ? AND idUsuario = ?";
        let values = [
            dataFimTarefa,
            id,
            idUsuario
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });

        } catch (err) {
            return err;
        }
    }

    static async deletarTarefa({ id, idUsuario }) {
        const sqlCommand = "DELETE FROM tarefas WHERE id = ? AND idUsuario = ?";
        let values = [
            id,
            idUsuario
        ];

        try {
            connection.query(sqlCommand, values, (err, result) => {
                return result;
            });
        } catch (err) {
            return err;
        }
    }

    static puxarTarefasBanco({ id }) {
        const sqlCommand = `
        SELECT 
          id, 
          titulo, 
          descricao, 
          statusID, 
          DATE_FORMAT(dataInicioTarefa, '%d/%m/%Y') AS dataInicioTarefaFormatada,
          DATE_FORMAT(dataFimTarefa, '%d/%m/%Y') AS dataFimTarefaFormatada
        FROM tarefas 
        WHERE idUsuario = ? 
        ORDER BY dataInicioTarefa DESC;
      `;

        let values = [
            id
        ];

        return new Promise((resolve, reject) => {
            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }


    static puxarDadosTarefa(idTarefa, idUsuario) {
        const sqlCommand = `
        SELECT 
          id, 
          titulo, 
          descricao, 
          statusID, 
          DATE_FORMAT(dataInicioTarefa, '%d/%m/%Y') AS dataInicioTarefaFormatada,
          DATE_FORMAT(dataFimTarefa, '%d/%m/%Y') AS dataFimTarefaFormatada
        FROM tarefas 
        WHERE id = ? AND idUsuario = ?
        `;

        let values = [
            idTarefa,
            idUsuario
        ];

        return new Promise((resolve, reject) => {
            connection.query(sqlCommand, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    static alterarStatusTarefa({ id, statusID }) {
        const sqlCommand = "UPDATE tarefas SET statusID = ? WHERE id = ?";
        const values = [
            statusID,
            id
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
}

module.exports = TaskModel;