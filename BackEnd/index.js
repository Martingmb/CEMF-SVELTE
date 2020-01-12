const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express();
const http = require('http').Server(router);
const io = require('socket.io').listen(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const { DATABASE_URL, PORT } = require('./config');
const users = require('./routes/users');
const login = require('./routes/login');
const reporteSemanal = require('./routes/reporteSemanal');
const aseoMaestro = require('./routes/aseo');
const reporteMaestro = require('./routes/reporteMaestro');
const informe = require('./routes/informe');

io.origins('*:*');

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 25000,
    connectTimeoutMS: 10000,
    useCreateIndex: true
});

io.on('connection', () => {
    console.log("Conexion de un usuario");
});

router.use(bodyParser.json());

router.use(cors({ origin: true, credentials: true }));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.use("/api", users, login, reporteSemanal, aseoMaestro, reporteMaestro, informe);

router.get('/test', (req, res) => {
    res.send("SI FUNCIONO");
});

router.listen(PORT, () => {
    console.log("Inicie servicio en puerto: ", PORT);
});

mongoose.connection.on('disconnected', () => {
    console.log("Me desconecte");
    
});