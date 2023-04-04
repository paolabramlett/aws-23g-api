const fs = require('fs')
const express =  require('express')

const kodemia = JSON.parse(fs.readFileSync('kodemia.json'))
const kodemiaFile = 'kodemia.json'
const encoding = 'utf8'
 

const server = express()
server.use(express.json())

server.get('/',( request, response ) => {
    response.json({
        message: 'My  koder API is running'
    })
})

//Section Koders
server.get('/koders',( request, response ) => {
    const {
        limit =  10
    } = request.query

    response.json({
        message:'All the koders',
        data:{
            koders:kodemia.koders.slice(0, parseInt(limit))
        }
    }) 
})


server.post('/koders', (request, response) => {
    const newKoder = {
        name: request.body.name,
        generation: request.body.generation
    }

    kodemia.koders.push(newKoder)

    fs.writeFile( kodemiaFile, JSON.stringify(kodemia), encoding, (error) => {
        if(error){
            console.error('Koder not saved');
        }        
        response.json({
            message:'Add new koder',
            data:{
                koders: newKoder
            }
        })
    })
    console.log(JSON.parse(fs.readFileSync(kodemiaFile)))
})

//Call server
server.listen(8082,() => {
    console.log('Server is running')
})