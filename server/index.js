const express = require('express')
const app = express()
const v1 = require('./v1')
const cors = require('cors')

const PORT = 8080

app.use(cors());
app.use(express.json())
app.use('/v1',v1);

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
