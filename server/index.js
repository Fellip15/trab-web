const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// var morgan = require('morgan')
require('dotenv').config();

// configuracao do app
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
// app.use(morgan('dev'));

app.use("/public/itemImages", express.static("./public/itemImages"));
app.use("/public/userImages", express.static("./public/userImages"));
/* Rotas */
// ex: app.use(require("./routes/User")); -> exemplo da monitoria
app.use(require("./routes/User"));
app.use(require("./routes/Image"));
app.use(require("./routes/Item"));

app.use((err, req, res, next)=>{
    console.log(err.message);
    return res.status(404).send({
      message: err.message
    })
  })

/* mongoose pra quando a gente for usar mongodb */
mongoose.connect(process.env.CONN_STR, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const PORT = 5300;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
});
