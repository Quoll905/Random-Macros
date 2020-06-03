
const URL_CONTATTI = "http://localhost:9000/messaggioContatti";

const formContatti = document.querySelector('.form-contatti');

const ringraziamenti = document.querySelector('.ringraziamenti');

let loading = false;

formContatti.addEventListener('submit',(event)=>{
  event.preventDefault();
  const formData = new FormData(formContatti);
  const nome = formData.get('nome');
  const email = formData.get('email');
  const messaggio = formData.get('messaggio');
  let problema = formData.get('problema');
  problema != null ? problema = 'true' : problema = 'false' ;

  const messaggioDaInviare = {
    nome,
    email,
    messaggio,
    problema
  }

  ringraziamenti.style.display = "flex";

  setTimeout(()=>{
    fetch(URL_CONTATTI,{
      method:'POST',
      body: JSON.stringify(messaggioDaInviare),
      headers: {'content-type':'application/json'}
    }).then(response =>response.json())
      .then(messaggioInserito => {
        console.log(messaggioInserito);
        formContatti.reset();
        ringraziamenti.style.display = "none";
      })
  },1500);



});
