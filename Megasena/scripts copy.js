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
let tabela = document.getElementById('notas');//tabela de dados
let tabgrups = document.getElementById('grups');//tabela com os somatórios dos grupos
let notasfil = document.getElementById('notasfil');//tabela de dados filtrados
let formfil = document.querySelectorAll('.formfil');//elementos de filtro
let filtrob = document.getElementById('filtro');//botão do filtro
let jurcel = [];//cedulas com o valor do jurus
let notas  = [];//vetor de notas
let notasfilt = [];//vetor de notas filtradas

//objetos
//objeto nota
const novanota = () => ({
    numero: 0,
    nome: nameclient.value,
    vencimento: new Date(vencim.value),
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
  td2.innerHTML = (itemlinha.vencimento.getFullYear()+"-"+(itemlinha.vencimento.getUTCMonth()+1)+"-"+itemlinha.vencimento.getUTCDate());
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
//insere soma por grupo
function inseresoma(key, somatorio){
  let linha = document.createElement("tr");//cria linha de tabela
  let td0 = document.createElement("td");//cria celula que recebe chave do grupo
  let td1 = document.createElement("td");//cria celula que recebe valor da soma
  td0.innerHTML=key;
  td1.innerHTML=somatorio;
  linha.append(td0);
  linha.append(td1);
  tabgrups.append(linha);
}
//agrupa por cliente
function agrupname(){
    let agrup = agruparPor(notas,'nome');
    let keys = Object.keys(agrup);
    let somas= [];
    keys.forEach((key) => {
      let va = agrup[key].reduce(function(ac, at) {
        return parseFloat(ac) + parseFloat(at.valor);
      }, 0);
      somas.push(va);
      inseresoma(key,va);
      });
}
//agrupa por data de vencimento
function agrupvenc(){
    let agrup = agruparPor(notas,'vencimento');
    let keys = Object.keys(agrup);
    let somas= [];
    keys.forEach((key) => {
      let va = agrup[key].reduce(function(ac, at) {
        return parseFloat(ac) + parseFloat(at.valor);
      }, 0);
      somas.push(va);
      let dff = new Date(key);
      let df = dff.getFullYear()+"-"+(dff.getUTCMonth()+1)+"-"+dff.getUTCDate();
      inseresoma(df,va);
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
//insere nota filtradas na linha da tabela
function linhafilt(notafilt){
  let linha = document.createElement("tr");//cria linha de tabela
  let td0 = document.createElement("td");//cria celula que recebe numero sequencial da nota
  let td1 = document.createElement("td");//cria celula que recebe nome
  let td2 = document.createElement("td");//cria celula que recebe data de vencimento
  let td3 = document.createElement("td");//cria celula que recebe valor da nota
  let td4 = document.createElement("td");//cria celula que recebe dias de atraso
  let td5 = document.createElement("td");//cria celula que recebe valor de juros
  td0.innerHTML = notafilt.numero;
  linha.append(td0);
  td1.innerHTML = notafilt.nome;
  linha.append(td1);
  let dff = new Date(notafilt.vencimento);
  td2.innerHTML = dff.getFullYear()+"-"+(dff.getUTCMonth()+1)+"-"+dff.getUTCDate();
  linha.append(td2);
  td3.innerHTML = notafilt.valor;
  linha.append(td3);
  td4.innerHTML = notafilt.atras;
  linha.append(td4);
  td5.innerHTML = notafilt.juros;
  linha.append(td5);
  notasfil.append(linha);
}
//filtro
function filtro(valorf){
  let valorff = parseFloat(valorf.valor);
  let dataini;
  let datafim;
  let datames;
  if(formfil[0].value) dataini = new Date(formfil[0].value);
  if(formfil[1].value) datafim = new Date(formfil[1].value);
  if(formfil[2].value) datames = new Date(formfil[2].value);
  if (formfil[2].value){//se inserido mês
    if((formfil[3].value)&&(formfil[4].value)){//se inserido valores minimo e maximo
      if((valorf.vencimento.getUTCMonth()==datames.getUTCMonth())&&//testa mes
        (valorff >= parseFloat(formfil[3].value))&&(valorff <= parseFloat(formfil[4].value))){//testa valor
           return valorf;
         }
    }else{//se não inserido valores minimo e maximo
      if(valorf.vencimento.getUTCMonth()==datames.getUTCMonth()){//testa mes
        return valorf;
      }
    }
  }else{//se não inserido mês
    if((formfil[0].value)&&(formfil[1].value)){//se inserido datas de inicio e fim
      if((formfil[3].value)&&(formfil[4].value)){//se inserido valor minimo e maximo
        if((valorf.vencimento.getMilliseconds()>=dataini.getMilliseconds())&&//testa data de inicio
           (valorf.vencimento.getMilliseconds()<=datafim.getMilliseconds())&&//testa data de fim
           (valorff >= parseFloat(formfil[3].value))&&(valorff <= parseFloat(formfil[4].value))){//testa valor
             return valorf;
           }
      }else{//se não inserido valores minimo e maximo
        if((valorf.vencimento.getMilliseconds()>=dataini.getMilliseconds())&&//testa data de inicio
           (valorf.vencimento.getMilliseconds()<=datafim.getMilliseconds())){//testa data de fim
             return valorf;
           }
      }
    }else{//se não inseridas datas de inicio e fim
      if((formfil[3].value)&&(formfil[4].value)){//se inserido valores minimos e maximos
        if((valorff >= parseFloat(formfil[3].value))&&(valorff <= parseFloat(formfil[4].value))){//testa valores
          return valorf;
        }
      }
    }
  }
}
function filtrar(){
  notasfilt=notas.filter(filtro);
  notasfilt.forEach(linhafilt);
}

//eventos
inputbt.addEventListener('click',addnote);
calcj.addEventListener('click',calculator);
nameagrup.addEventListener('click',agrupname);
vencagrup.addEventListener('click',agrupvenc);
filtrob.addEventListener('click',filtrar);

/*
https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
https://www.devmedia.com.br/javascript-map-mapeando-elementos-de-um-array/40648
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
https://desenvolvimentoparaweb.com/javascript/map-filter-reduce-javascript/
https://raullesteves.medium.com/javascript-entendendo-o-reduce-de-uma-vez-por-todas-c4cbaa16e380
*/