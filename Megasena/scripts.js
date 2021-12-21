//constantes
const MAX = 60; //valor maximo que pode ser sorteado
const NUMEROS = 6; //quantidade de  numeros sorteados

//variaveis globais
let numeros = new Array(NUMEROS);//numeros sorteados
let sorteioN =  0;//numero do sorteio
let srtAtual = document.querySelectorAll('.SrtAtual');//mostradores dos numeros sorteados
let tabela = document.getElementById('SortAnt');//tabela de sorteios antigos
let butSort = document.getElementById('ButSort');//botão sortear
let count;//contador do sorteio
let nIntervId;

//funções
//imprime argumento
function callback(arg, n){
  srtAtual[n+1].innerHTML = arg;
  numeros[n] = arg;
  count++;
}

//sorteia um numero
function callbacks(){
  if (count < NUMEROS){
    let num = (Math.ceil(Math.random()*MAX));
    let n = count;
    let ex = true;
    //verifica se o numero já foi sorteado
    while(ex){
      ex = false;
      numeros.forEach((param) => {
        if (num == param){
          //se econtrar numero igual sorteia novamente
          num = (Math.ceil(Math.random()*MAX));
          console.log("numero repetido: "+num);
          ex = true;
        }
        }, 0);
    }
    callback(num, n)
  }else{
    clearInterval(nIntervId);
    printhisto();
    //butSort.style.visibility = "unset";
    butSort.disabled = false;
  }
}
//limpar mostradores
function clearN(){
  for(let i=0; i<NUMEROS; i++){
    srtAtual[i+1].innerHTML = "";
  }
}
//função sortear
function sortear(){
  count = 0;
  //butSort.style.visibility = "hidden";
  butSort.disabled = true;
  srtAtual[0].innerHTML = sorteioN;
  clearN();
  nIntervId = setInterval(callbacks, 1000);
  sorteioN++;
}
//imprime hitórico
function printhisto(){
  let linha = document.createElement("tr");//cria linha de tabela
  let cel = new Array(NUMEROS+1);
  cel[0] = document.createElement("td");//cria primira celula da linha
  cel[0].innerHTML = (sorteioN-1);
  linha.append(cel[0]);
  for (let i=1; i<=NUMEROS;i++){
    cel[i] = document.createElement("td");//cria celula de numero sorteado
    cel[i].innerHTML = numeros[i-1];
    linha.append(cel[i]);
  }
  tabela.append(linha);//adciona linha à tabela
}

//eventos
butSort.addEventListener('click', sortear);

/*
• Callback function
o https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
• Entendendo funções callback em JavaScript
o https://medium.com/totvsdevelopers/entendendo-fun%C3%A7%C3%B5es-callback-em-javascript-7b500dc7fa22
• WindowOrWorkerGlobalScope.setInterval()
o https://developer.mozilla.org/pt-BR/docs/Web/API/setInterval
*/