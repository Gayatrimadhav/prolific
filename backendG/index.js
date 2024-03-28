const connectToMongo=require('./db');
const express = require('express');
const cors = require('cors')

connectToMongo();
const path=require("path");
const app = express()
const port = 5008
app.use(cors())
app.use(express.json())

const _dirname=path.dirname("")
const buildpath = path.join(_dirname,"../frontend/build")
app.use(express.static(buildpath));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})