const express = require('express');
const fs = require('node:fs');
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const path = require('path')
require('dotenv').config();
const PORT = process.env.PORT || 5000 // port

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> {
            console.log(`Сервер запущен на хосте:${PORT}`)
        }) 
    } catch (e) {
        console.log(e)
    }
}
start()

// Server logs

app.use(function(request, response, next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("./logs/server.log", data + "\n", function(){});
    next();
});

//обработка ошибок
app.use(errorHandler)






