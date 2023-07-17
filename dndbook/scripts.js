//constantes e variaveis globais
const urlbase = "https://www.dnd5eapi.co";
const listoptions = document.getElementById('listoptions');
const endpointslistl1 = document.getElementById('endpointslistl1');
const endpointslistl2 = document.getElementById('endpointslistl2');
const resulttext = document.getElementById('resulttext');
const showfinal = document.getElementById('showfinal');
let listendpoints = {};

//chamadas iniciais
consultApi("/api/",listInital);

function consultApi(param="/api/",cb=null,p=null){
  console.log(urlbase+param);
  fetch(urlbase+param).then(function(response){
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function(data){
      //console.log(JSON.stringify(data, null, " "));
      console.log(data);
      cb(data,p);
    })
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
}

function listInital(list){
  if (list) {
    listendpoints = list;
    let keys = Object.keys(list);
    endpointslistl1.innerHTML = '<h3>Opções Básicas:</h3>';
    keys.forEach(element => {
      let op = `<button onclick="consultApi('${listendpoints[element]}',listSecund,'${element}');">${element}</button>`;
      endpointslistl1.innerHTML += op;
    });
  }
}
function listSecund(list,param){
  if (list) {
    listendpoints = list.results;
    console.log(listendpoints);
    endpointslistl2.innerHTML = `<h3>${param}:</h3>`;
    listendpoints.forEach(element => {
      let op = `<button onclick="consultApi('${element.url}',listTercent);">${element.name}</button>`;
      endpointslistl2.innerHTML += op;
      endpointslistl2.classList.remove('hiddemelement');
    });
  }
}
function listTercent(list){
  if (list) {
    resulttext.innerHTML=JSON.stringify(list,null," ");
    showfinal.innerHTML = printObjectDate(list);
    showfinal.classList.remove('hiddemelement');
    console.log(list);
  }
}
let undvar;
function printObjectDate(list){//elemento em Object
  let listop = '';
  let keys = Object.keys(list);
    keys.forEach(element => {
      let op;
      if (Array.isArray(list[element])){
        op = `<label><strong>${element}: </strong><div class="listatr">${printArrayDate(list[element])}</div></label>`;//cria elemento interno
      }else if(typeof list[element] === "object"){
        op = `<label><strong>${element}: </strong><div class="listatr">${printObjectDate(list[element])}</div></label>`;//cria elemento interno
      }else{
        op = `<label><strong>${element}: </strong> ${printProp(list[element],element)}</label>`;
      }
      listop += op;
    });
  return listop;
}

function printArrayDate(list){//elemento em array
  let listop = '';
  list.forEach(element => {
    let op;
    if (Array.isArray(element)){
      op = `<label><div class="listatr">${printArrayDate(element)}</div></label>`;//cria elemento interno
    }else if(typeof element === "object"){
      op = `<label><div class="listatr">${printObjectDate(element)}</div></label>`;//cria elemento interno
    }else{
      op = `<label> ${element}</label>`;
    }
    listop += op;
  });
  return listop;
}

function printProp(prop,key){
  let op = '';
  switch (key){
    case 'image':
      op = `<img src="${urlbase+prop}"/>`;
      break;
    case 'url':
      op = `<button onclick="consultApi('${prop}',listTercent);">Ir para: ${prop}</button>`;
      break;
    default:
      op = prop;
  }
  return op;
}

function printreturn(data){
  console.log(data);
}