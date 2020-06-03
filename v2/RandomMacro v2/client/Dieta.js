const formPrincipale = document.querySelector('.formPrincipale');
const body = document.querySelector('.modal-body-dieta');

const URL_DIETA = "http://localhost:8000/calcolaDieta";


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  mostraDieta();
});




function mostraDieta(){
  console.log('Calcolo...');

  const formData = new FormData(formPrincipale);

  const carbo = formData.get('input-carboidrati');
  const proteine = formData.get('input-proteine');
  const grassi = formData.get('input-grassi');

  const macroDaRispettare = {
    carbo,
    proteine,
    grassi
  };

  console.log(macroDaRispettare);

  fetch(URL_DIETA,{
    method:'POST',
    body: JSON.stringify(macroDaRispettare),
    headers: {'content-type':'application/json'}
  }).then(response => response.json())
    .then(items => {

      let carboTot = 0;
      let proteineTot = 0;
      let grassiTot = 0;

      let kcalTot = 0;

      let listaAlimenti = [];


      for (let item of items ) {




        carboPerCento = parseFloat(item.macro.carboidrati);
        proteinePerCento = parseFloat(item.macro.proteine);
        grassiPerCento = parseFloat(item.macro.grassi);


        const carboPerGrammo = carboPerCento/100;
        const proteinePerGrammo = proteinePerCento/100;
        const grassiPerGrammo = grassiPerCento/100;

        console.log(item.nome);

        let porzione = Math.floor(Math.random()*(parseInt(item.RangePorzioneMedia[1])-parseInt(item.RangePorzioneMedia[0])+1)+parseInt(item.RangePorzioneMedia[0]));


        let kcalTotAlimento = (parseInt(item.kcalPerCentoG)/100) * porzione;
        console.log('kcal alimento', kcalTotAlimento);

        let carboTotAlimento = carboPerGrammo * porzione;
        let proteineTotAlimento = proteinePerGrammo * porzione;
        let grassiTotAlimento = grassiPerGrammo * porzione;

        console.log('carbo alimento', carboTotAlimento);
        console.log('proteine alimento', proteineTotAlimento);
        console.log('grassi alimento', grassiTotAlimento);

        carboTot += carboTotAlimento;
        proteineTot += proteineTotAlimento;
        grassiTot += grassiTotAlimento;
        kcalTot += kcalTotAlimento;

        console.log(carboTot);
        console.log(proteineTot);
        console.log(grassiTot);
        console.log(kcalTot);

        const nuovoAlimentoDaInserire = {
          nome: item.nome,
          porzione: porzione,
          carbo: carboTotAlimento,
          proteine: proteineTotAlimento,
          grassi: grassiTotAlimento,
          kcal: kcalTotAlimento
        }

        if (carboTot<macroDaRispettare.carbo && proteineTot<macroDaRispettare.proteine && grassiTot<macroDaRispettare.grassi){
          listaAlimenti.push(nuovoAlimentoDaInserire);
        }
        else {
          carboTot -= carboTotAlimento;
          proteineTot -= proteineTotAlimento;
          grassiTot -= grassiTotAlimento;
          kcalTot -= kcalTotAlimento;
          continue;
        }


      }

      console.log(items);
      console.log(listaAlimenti);

      body.innerHTML = "";

      listaAlimenti.forEach((item) => {

        const div = document.createElement('div');
        div.style.height = '180px';
        div.style.width = 'auto';
        div.style.padding = '20px';
        div.style.marginLeft = '5%';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.margin = '10px';
        div.style.border = '1px solid blue';
        div.style.borderRadius = '10px';

        const h5 = document.createElement('h5');
        h5.innerHTML = item.nome.toString();
        div.appendChild(h5);

        const h6 = document.createElement('h6');
        h6.innerHTML = `Porzione : ${item.porzione.toString()}`;
        div.appendChild(h6);

        const carboidrati = document.createElement('h6');
        carboidrati.innerHTML = `Carboidrati : ${item.carbo.toFixed(1).toString()}`;
        div.appendChild(carboidrati);

        const proteine = document.createElement('h6');
        proteine.innerHTML = `Proteine : ${item.proteine.toFixed(1).toString()}`;
        div.appendChild(proteine);

        const grassi = document.createElement('h6');
        grassi.innerHTML = `Grassi : ${item.grassi.toFixed(1).toString()}`;
        div.appendChild(grassi);

        const kcal = document.createElement('h6');
        kcal.innerHTML = `Kcal : ${item.kcal.toFixed(2).toString()}`;
        div.appendChild(kcal);

        body.appendChild(div);
      });

    });

}
