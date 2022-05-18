const express = require('express')
const routes = express.Router()
// const sqlite3 = require('sqlite3').verbose();

var db = require("./database")


const DBSOURCE = "db.sqlite"

//Endopoint permite que os usuários do serviço obtenham todos os alunos cadastrados no sistema.
routes.get('/alunos', (req, res, next) => {
    limiteDefault = 25
    paginDefault = 1

    if (req.query) {
        if (req.query.limite && !(req.query.nome)) {
            var queryParamLimit = (req.query.limite)
            query = `select * from alunos LIMIT ` + queryParamLimit
        }


        if (req.query.pagina) {
            var queryParamNome = (req.query.pagina)
        }

        if (req.query.nome) {
            var queryParamNome = (req.query.nome)
            if (req.query.limite)
                var queryParamLimit = req.query.limite
            else queryParamLimit = limiteDefault
            query = `select * from alunos where lower(nome) like '%${queryParamNome}%' LIMIT ` + queryParamLimit
        }

    } else
        query = 'select * from alunos'

    var params = []

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "successo",
            "sql": query,
            "data": rows
        })
    })
})


//Endopoint permite que os usuários do serviço cadastrem novos alunos no sistema.
routes.post('/alunos', (req, res, next) => {
    var erros = []
    if (!req.body.rga)
        erros.push("Por favor, informe o RGA do aluno")
    if (!req.body.nome)
        erros.push("Por favor, informe o Nome do aluno")

    if (erros.length) {
        res.status(400).json({ "error": erros.join(",") })
        return
    }

    var data = { // alterar para gerar o id incremental
        id: req.body.id,
        rga: req.body.rga,
        nome: req.body.nome,
        curso: req.body.curso
    }

    var query = 'INSERT INTO alunos (id, rga, nome, curso) values (?,?,?,?)'
    var params = [data.id, data.rga, data.nome, data.curso]

    db.run(query, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": "Parametros inválidos" })
            return
        }
        res.json({
            "message": "201 - Sucesso",
            "data": data,
            "id": data.id
        })
    })
})

routes.get('/alunos/:id', (req, res, next) => {
    var query = "select * from alunos where id = ?"
    var params = [req.params.id]
    db.get(query, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (!row) { // "mascarando a saida"
            res.status(400).json({ "error": "404 - Not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});


routes.delete('/alunos/:id', (req, res, next) => {
    db.run(
        'DELETE FROM alunos Where id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "status": "200 - Sucesso ", changes: this.changes })
        }
    )

})



routes.put('/alunos', (req, res, next) => {
    res.status(405).json({ "error": "405 - Método não permitido" })
})
routes.put('/delete', (req, res, next) => {
    res.status(405).json({ "error": "405 - Método não permitido" })
})

module.exports = routes