const mysql = require('mysql')


const accDB = {

   openDB:() => {
       
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'apidia6'
    })

   },

   accAllDB : () => {
    return new Promise((resolve,reject)=>{
        accDB.openDB()
        connection.connect(err => {
            if (err) reject(err)
            connection.query(`SELECT * FROM pessoas `, (err,result,fields) => {
                if (err) reject(err)
                resolve(result)
                connection.end()
            })
        })
    })
},


    addDB: (id, nome = '', gender = '', homeworld = '') => {
        return new Promise((resolve, reject) => {
            accDB.openDB()
         connection.connect(err => {
            if (err) reject(err)
            connection.query(`
                INSERT pessoas 
                values (${id}, "${nome}","${gender}", "${homeworld}");
                `, (err, result, fields) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        resolve('O registro já existe em nosso banco de dados!')
                    } else { reject(err) }
                }

                resolve(`Sucesso! ${nome} foi cadastrado(a) com o ID ${id}`)
                connection.end()
                })

            })

        })



    }

}

module.exports = accDB;