const mostraLista = document.querySelector('.modal-mostra-alimenti');

const URL_LISTA_ALIMENTI = "http://localhost:9000/MostraLista";

function mostraListaAlimenti() {

  fetch(URL_LISTA_ALIMENTI)
    .then(response => {console.log(response); return response.json();})
    .then(listaAlimenti => {
      mostraLista.innerHTML = "";
      listaAlimenti.forEach((item) => {
        const div = document.createElement('div');
        div.style.height = '150px';
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
        h6.innerHTML = `Kcal/100g : ${item.kcalPerCentoG.toString()}`;
        div.appendChild(h6);

        const carboidrati = document.createElement('h6');
        carboidrati.innerHTML = `Carboidrati : ${item.macro.carboidrati.toString()}`;
        div.appendChild(carboidrati);

        const proteine = document.createElement('h6');
        proteine.innerHTML = `Proteine : ${item.macro.proteine.toString()}`;
        div.appendChild(proteine);

        const grassi = document.createElement('h6');
        grassi.innerHTML = `Grassi : ${item.macro.grassi.toString()}`;
        div.appendChild(grassi);

        mostraLista.appendChild(div);
      });
      console.log(listaAlimenti);
    })

}
