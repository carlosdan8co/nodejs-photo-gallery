if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();    
}

const app = require('./app');

require('./database');

app.listen(app.get('port'),(req,res)=>{
    console.log(`Server on port: ${app.get('port')}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
})