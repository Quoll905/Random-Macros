const fileMessaggi = "../Messaggi.json";
const fs = require('fs');

const express = require('express');
const monk = require('monk');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const helmet = require('helmet');

const DB_URL = "localhost:10000/RandomMacros"

// ------ --- --- --- CONNESSIONE SERVER --- --- ---

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan('common'));
app.use(helmet());

// ------ --- --- --- CONNESSIONE DATABASE --- --- ---

const db = monk(DB_URL);
db.then(value => {
  console.log('Connesso al database!');
});

  // -- Collezioni --

const Contatti = db.get('Contatti');

const alimenti = db.get('ListaAlimenti');

// ------ --- --- --- GESTIONE SERVER --- --- ---

app.get('/',(req,res)=>{
  alimenti
    .find({},{
      fields:{ _id:0, }
    })
    .then(lista => {
      res.json(lista)
    });
})

app.post('/messaggioContatti',(req,res)=>{

  const messaggio = {
    nome: req.body.nome,
    email: req.body.email,
    messaggio: req.body.messaggio,
    problema: req.body.problema
  };


  let data = JSON.stringify(messaggio);
  fs.appendFile(fileMessaggi, `${data}\n`, (err)=>{
    if (err) {
      console.log('errore');
    }
    console.log('Messaggio scritto!');
  });


  Contatti.insert(messaggio)
    .then(messaggioInserito => {
      res.json(messaggioInserito)
      console.log('inserito!');
    })

});




app.get('/MostraLista',(req,res)=>{
  alimenti
    .find({},{fields:{
      nome: 1,
      kcalPerCentoG: 1,
      macro: 1,
      _id: 0
    }})
    .then(lista => {
      res.json(lista)
    });

})





app.post('/calcolaDieta',(req,res) => {

  // const macroDaRispettare = {
  //   carbo: Number.parseFloat(req.body.carbo),
  //   proteine: Number.parseFloat(req.body.proteine),
  //   grassi: Number.parseFloat(req.body.grassi),
  // };

  alimenti
    .aggregate([
      {$sample: {size: 535}}
    ])
    .then(lista=>{
      res.json(lista)
    });


});










app.listen(8000,()=>{
  console.log('server running...');
})
