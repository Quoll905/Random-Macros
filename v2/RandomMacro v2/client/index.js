const corpo = document.querySelector('.corpo');
const info = document.querySelector('.info');
const form = document.querySelector('.container-form');

const paginaInformazioni = document.querySelector('.pagina-informazioni');
const paginaContatti = document.querySelector('.pagina-contatti');
const paginaSupporto = document.querySelector('.pagina-supportaci');

const pagine = [corpo, paginaInformazioni, paginaContatti, paginaSupporto];

const menu = ['.home','.informazioni','.contatti','.supportaci'];



function mostraPagina(paginaDaMostrare, chiudiMenu=true){

  let c = document.getElementsByClassName('nav-link');
  for (let i = 0; i < c.length; i++) {
    c[i].classList.remove('active');
  }

  const mostra = document.querySelector(paginaDaMostrare);


  pagine.forEach((pagina) => {
    if (pagina.classList.contains('active')){
      pagina.style.visibility = 'hidden';
      pagina.style.display = 'none';
      pagina.classList.remove('active');
    }
  })

  mostra.classList.add('active');
  mostra.style.visibility = 'visible';
  if (mostra.classList.contains('corpo')){
    mostra.style.display = 'block';
  }else{
    mostra.style.display = 'flex';
  }

  if (chiudiMenu){
    document.querySelector('.navbar-toggler').click();
  }
  

  pagine.forEach((pagina,i) => {
    if (pagina.classList.contains('active')){
      document.querySelector(menu[i]).classList.add('active');
    }
  });


}
