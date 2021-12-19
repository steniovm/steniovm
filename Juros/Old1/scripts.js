//constantes
const JMORA = 0.02;//juros de mora
const JDIA = 0.01;//juros ao dia
const TEMPODIA = 1000 * 3600 * 24;//milissegundo em um dia

//Variaveis Globais - referencias aos elementos
let nameclient = document.getElementById('nameclient');
let vencim = document.getElementById('datevenc');
let valuenot = document.getElementById('valuenot');
let inputbt = document.getElementById('innot');//insere dados
let calcj = document.getElementById('calcjuros');//botão de caculos de juros
let nameagrup = document.getElementById('nameagrup');//botão de agrupar por cliente
let vencagrup = document.getElementById('vencagrup');//botão de agrupar por data de vencimento
let tabela = document.querySelector('table');//tabela de dados
//let jurcel = document.querySelector('jurcel');
let jurcel = [];//cedulas com o valor do jurus
let notas  = [];//vetor de notas

//objetos
//objeto nota
const novanota = () => ({
    numero: 0,
    nome: nameclient.value,
    vencimento: new Date( vencim.value),
    valor: valuenot.value,
    atras: 0,
    juros: 0,
  });
function clearForm() {
    nameclient.value = '';
    vencim.value = '';
    valuenot.value = '';
}
//calcula dias de atraso
function atraso(dataini){
    const dataAtual = new Date();
    const datavenc = new Date(dataini);
    if(dataAtual.getTime() > datavenc.getTime()) {
        return Math.trunc((dataAtual.getTime() - datavenc.getTime())/TEMPODIA);
    }
    return 0;
}
//calcula juros na nota
function calculajuros(nota){
    let at = atraso(nota.vencimento);
    nota.atras = at;
    if (at > 0){
      nota.juros = ((nota.valor*JMORA) + (nota.valor*(at*JDIA)));
      return (nota.juros);
    } else {
      return 0;
    }
}
function novatabela(){
  tabela.innerHTML="";
  let cabec = document.createElement('tr');
  let cel1 = document.createElement('th');
  let cel2 = document.createElement('th');
  let cel3 = document.createElement('th');
  let cel4 = document.createElement('th');
  let cel5 = document.createElement('th');
  let cel6 = document.createElement('th');
  cel1.innerHTML="#";
  cabec.append(cel1);
  cel2.innerHTML="Cliente";
  cabec.append(cel2);
  cel3.innerHTML="Vencimento";
  cabec.append(cel3);
  cel4.innerHTML="Valor";
  cabec.append(cel4);
  cel5.innerHTML="Atraso (dias)";
  cabec.append(cel5);
  cel6.innerHTML="Juros";
  cabec.append(cel6);
  tabela.append(cabec);
}
//cria nova linha de tabela
function novalinha(){
    let linha = document.createElement("tr");//cria linha de tabela
    let td0 = document.createElement("td");//cria celula que recebe numero sequencial
    td0.innerHTML = notas.length;
    linha.append(td0);
    let td1 = document.createElement("td");//cria celula que recebe nome
    td1.innerHTML = nameclient.value;
    linha.append(td1);
    let td2 = document.createElement("td");//cria celula que recebe data de vencimento
    td2.innerHTML = vencim.value;
    linha.append(td2);
    let td3 = document.createElement("td");//cria celula que recebe valor da nota
    td3.innerHTML = valuenot.value;
    td2.className = "varcel";
    linha.append(td3);
    let td4 = document.createElement("td");//cria celula que recebe dias de atraso
    td4.innerHTML = atraso(vencim.value);
    td4.className = "atrcel";
    linha.append(td4);
    let td5 = document.createElement("td");//cria celula que recebe valor de juros
    td5.innerHTML = 0;
    td2.classList = "jurcel";
    linha.append(td5);
    jurcel.push(td5);
    return linha;
}
function novalinhagrupo(itemlinha){
  let linha = document.createElement("tr");//cria linha de tabela
  let td0 = document.createElement("td");//cria celula que recebe numero sequencial
  td0.innerHTML = itemlinha.numero;
  linha.append(td0);
  let td1 = document.createElement("td");//cria celula que recebe nome
  td1.innerHTML = itemlinha.nome;
  linha.append(td1);
  let td2 = document.createElement("td");//cria celula que recebe data de vencimento
  td2.innerHTML = itemlinha.vencimento;
  linha.append(td2);
  let td3 = document.createElement("td");//cria celula que recebe valor da nota
  td3.innerHTML = itemlinha.valor;
  td2.className = "varcel";
  linha.append(td3);
  let td4 = document.createElement("td");//cria celula que recebe dias de atraso
  td4.innerHTML = itemlinha.atras;
  td4.className = "atrcel";
  linha.append(td4);
  let td5 = document.createElement("td");//cria celula que recebe valor de juros
  td5.innerHTML = itemlinha.juros;
  td2.classList = "jurcel";
  linha.append(td5);
  console.log(linha);
  return linha;
}
//adcionar nota
function addnote(){
    var newline;
    //adciona nota no vetor
    notas.push(novanota());
    notas[notas.length-1].numero=notas.length;
    //cria linha de tabela
    newline = novalinha();
    tabela.append(newline);
    //limpa o formulario
    nameclient.value="";
    vencim.value="";
    valuenot.value="";
}
//calula juros
function calculator(){
    let jurosvalue = notas.map(calculajuros);
    jurosvalue.forEach(printjur);
}
//imprime jurus
function printjur(item, indice){
    jurcel[indice].innerHTML = (Math.floor(item*100))/100;
}
//agrupa por cliente
function agrupname(){
    let agrup = agruparPor(notas,'nome');
    let count = 0;
    let keys = Object.keys(agrup);
    console.log(keys);
    keys.forEach((key) => {
      console.log(key);
      agrup[key].forEach((itemlinha) => {
        novatabela();
        tabela.append(novalinhagrupo(itemlinha))
      })
    });
}
//agrupa por data de vencimento
function agrupvenc(){
    let agrup = agruparPor(notas,'vencimento');
    let count = 0;
    let keys = Object.keys(agrup);
    console.log(keys);
    keys.forEach((key) => {
      console.log(key);
      agrup[key].forEach((itemlinha) => {
        novatabela();
        tabela.append(novalinhagrupo(itemlinha))
      })
    });
}
//agrupa
function agruparPor(notasr, propriedade) {
  return notasr.reduce(function (acc, obj) {
    let key = obj[propriedade];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

//eventos
inputbt.addEventListener('click',addnote);
calcj.addEventListener('click',calculator);
nameagrup.addEventListener('click',agrupname);
vencagrup.addEventListener('click',agrupvenc);

/*
https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
https://www.devmedia.com.br/javascript-map-mapeando-elementos-de-um-array/40648
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
https://desenvolvimentoparaweb.com/javascript/map-filter-reduce-javascript/
https://raullesteves.medium.com/javascript-entendendo-o-reduce-de-uma-vez-por-todas-c4cbaa16e380
*/