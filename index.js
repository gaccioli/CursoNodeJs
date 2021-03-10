const Hapi = require('@hapi/hapi')
const getPerson = require('./getperson.js')
const accAllDB = require('./accdb.js').accAllDB
const addDB = require('./accdb.js').addDB
const accdb = require('./accdb.js').openDB


const init = async () => {
 
   const server = Hapi.server({
       port: 3000,
       host: 'localhost'
   })



   server.route({
    method: 'GET',
    path: '/all',
    handler: async (request, h) =>{
        return await accAllDB()
    }

})


 /*    person não está recebendo os paramentors vindo do getPerson 
    (são 2:30 da manha e não to vendo mais nada terminar depois.) */

    server.route({
     method:'GET',
     path: '/{id?}',
     handler: async (request, h) =>{
        const userId = request.params.id ? request.params.id : 'não deu certo'
        const person = getPerson.getPerson(userId)

        console.log(person)

            addDB(userId, person.name, person.gender, person.homeworld)

            console.log(person)
        
    }
})

 
   await server.start()
 
}

init()




 
 