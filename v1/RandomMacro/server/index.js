const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');


const app = express();

const db = monk('localhost:5000/RandomMacros');
db.then(() => {
  console.log('Connected correctly to database')
});

const listaAlimenti = db.get('listaAlimenti');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




app.get('/', (req,res)=>{
    res.json({
        message: "lalalala"
    });
});

app.get('/macros',(req,res)=>{
    listaAlimenti
        .find()
        .then(listaAlimenti => {
            res.json(listaAlimenti);
        })
})


app.post('/macros',(req,res)=>{

    const alimento = {
        nome : req.body.nome.toString(),

        carbo : parseInt(req.body.carbo),
        proteine : parseInt(req.body.proteine),
        grassi : parseInt(req.body.grassi),
    }

    //console.log(alimento);

    listaAlimenti
        .insert(alimento)
        .then(alimentoInserito=>{
            res.json(alimentoInserito);
        });


});

// TODO: tutta la parte di query del database e risultato






app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
}) ;
