console.log('Hello world');

const form = document.querySelector('.formAggiungi-form');
const errorElement = document.querySelector('.error-message');
const loadingElement = document.querySelector('.loading');

const divAggiungiElemento = document.querySelector('.formAggiungi');
divAggiungiElemento.style.display = "none";

const divMostraListaAlimenti = document.querySelector('.mostraListaAlimenti');
divMostraListaAlimenti.style.display = "none";

const header = document.querySelector('header');


const API_URL = 'http://localhost:5000/macros';

let loading = false;
let finished = false;

let flagLista = 0;



form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const nome = formData.get('nomeAlimento');
        // TODO: insert marca solo se non vuota
        const carbo = formData.get('carbo');
        const proteine = formData.get('proteine');
        const grassi = formData.get('grassi');

        //console.log(carbo.toString(), proteine.toString(), grassi.toString());

        if (carbo && proteine && grassi) {
            errorElement.style.display = 'none';
            form.reset();
            //loadingElement.style.display = 'block';

            const macros = {
                nome,
                carbo,
                proteine,
                grassi
            };

            // console.log(macros);

            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(macros),
                headers: {'content-type': 'application/json'}
            }).then(response=>response.json())
              .then(alimentoInserito => {
                  console.log(alimentoInserito);
              });






        }


});


// TODO: tutta la parte di query del database e risultato


function listAllAliments(){

    if (flagLista) {
        divMostraListaAlimenti.innerHTML = '';
        flagLista=0;
    }
    flagLista = 1;

    divAggiungiElemento.style.display === "none" ? divAggiungiElemento.style.display = "block" : divAggiungiElemento.style.display = "none";
    document.querySelector('.formAggiungi-form').style.display !== "none" ? document.querySelector('.formAggiungi-form').style.display = "none" : document.querySelector('.formAggiungi-form').style.display = "block";

    divMostraListaAlimenti.style.display = "block";

    fetch(API_URL)
        .then(res => res.json())
        .then(listaAlimenti => {
            console.log(listaAlimenti);
            listaAlimenti.forEach((alimento) => {

                const div = document.createElement('div');
                div.style.display = "table";

                const header = document.createElement('h5');
                header.textContent = alimento.nome + ' ......';

                const contents = document.createElement('h6');
                contents.textContent = 'C: ' + alimento.carbo.toString() + ' P: ' + alimento.proteine.toString() + ' G: ' + alimento.grassi.toString();

                div.appendChild(header);
                div.appendChild(contents);
                divMostraListaAlimenti.appendChild(div);



            })
        })
}








// FORM AGGIUNGI ALIMENTO

function mostraDivAggiungiAlimento(){
    divAggiungiElemento.style.display === "none" ? divAggiungiElemento.style.display = "block" : divAggiungiElemento.style.display = "none";
    document.querySelector('.formAggiungi-form').style.display = "block";
    divMostraListaAlimenti.style.display = "none";

    header.style.opacity === '0.3' ? header.style.opacity = 1 : header.style.opacity = 0.3;
    header.style.pointerEvents === "none" ? header.style.pointerEvents = "all" : header.style.pointerEvents = "none";
}
