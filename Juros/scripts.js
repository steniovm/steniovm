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
let tabela = document.querySelector('table');//tabela de dados
let jurcel = [];//cedulas com o valor do jurus
let notas  = [];//vetor de notas

//objetos
//objeto nota
const novanota = () => ({
    nome: nameclient.value,
    vencimento: new Date( vencim.value),
    valor: valuenot.value,
    atras: 0,
    juros: 0,
  })
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
    if (at > 0){
        return (nota.valor*JMORA) + (nota.valor*(at*JDIA));
    } else {
        return 0;
    }
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

//adcionar nota
function addnote(){
    var newline;
    //adciona nota no vetor
    notas.push(novanota());
    //cria linha de tabela
    newline = novalinha();
    tabela.append(newline);
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

//eventos
inputbt.addEventListener('click',addnote);
calcj.addEventListener('click',calculator);
/*
https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
https://www.devmedia.com.br/javascript-map-mapeando-elementos-de-um-array/40648
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement
*/
