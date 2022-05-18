var sqlite3 = require('sqlite3').verbose()
//var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, () => {
    // if (err) {
    //     // Cannot open database
    //     console.error('Erro ao conectar no SQLite erro :' + err.message)
    //     throw err
    // } else {
    console.log('SQLite conectado com sucesso!! .')
    // db.run(`insert into alunos(id, nome, rga, curso) values('2', 'Zézinho', '2019.1906.037-5','CC' )`)
    // db.run(`insert into alunos(id, nome, rga, curso) values('3', 'Zézinho', '2019.1906.037-5','CC' )`)


    // db.run(`CREATE TABLE alunos (
    //             id TEXT NOT NULL, 
    //             rga TEXTNOT NULL, 
    //             situacao TEXT DEFAULT 'ativo', 
    //             curso TEXT, 
    //             nome TEXT NOT NULL,  
    //             registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`
    // );


    // }
});


module.exports = db