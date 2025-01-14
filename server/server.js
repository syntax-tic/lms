require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./utils/db')
const PORT = 2000
app.use(express.json())
const authrouter = require('./router/auth-router');

app.use('/api/auth', authrouter);


connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening at http://localhost:${PORT}`);
    })

})


app.get('/', (req, res)=>{
    res.send("Hello this is server endpoint")
})

