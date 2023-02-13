const express = require('express')
const app = express()
const {getMeetings} = require('../meetings/getMeetings')

const port = 3000
// app use, call the middelwares
app.use(express.json())

app.get('/meetings/running', async(req,res)=>{
    let meetings = await getMeetings()
    res.send({
        data: meetings,
        meetingsRunning: meetings.length
    })
})

app.listen(port,()=>{
    console.log(`Server online on port ${port}`);
})
  

