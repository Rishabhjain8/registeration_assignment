const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
connectToMongo();

const PORT = process.env.PORT || 5000;

app.use('/api/auth',require('./routes/auth'));

__dirname = path.resolve();

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,'/registeration/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'registeration', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
})