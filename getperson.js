const fetch = require('node-fetch')
 
module.exports = {

     getPerson : async (id) => {
        fetch(`https://swapi.dev/api/people/${id}`)
            .then(response => response.json())
            .then(person => {
    
                const homeworldUrl = person.homeworld
    
                //console.log(home)
                fetch(homeworldUrl)
                    .then(response => response.json())
                    .then(world => {
                        person.homeworld = world.name
                        //console.log(person)
                        //return person
                    })
    
            })
            .catch(err => console.log(err))
    } 
    
}