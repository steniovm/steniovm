/*
Developed by: Stênio V. Medeiros
https://steniovm.github.io/steniovm/
Official repository
https://github.com/steniovm/MythicCardsRpgSolo
License: GNU GENERAL PUBLIC LICENSE Version 3
The code for this software is completely free, but the Mythic images belong to wordmillgames.
Mythic is a GM emulator for tabletop RPGs. It can also be used as a GM assistant.
The standard version of Mythic consists of a rulebook that uses 2d10 as a random element. The Card version is a simplified version but still quite rich.
In Brazil, Mythic has been translated and is being distributed by the publisher Retropunk ( https://retropunk.com.br/editora ).
The book can be purchased at the publisher's store, https://loja.retropunk.com.br/index.php?id_product=841&rewrite=mythic-emulador-de-mestre-de-jogo-pdf&controller=product .
The deck of cards can also be purchased ( https://loja.retropunk.com.br/index.php?id_product=844&rewrite=mythic-baralho-de-narrativas-mythicas-jpg&controller=product ) in jpg with a pdf manual, and in a physical version.
The software was written entirely in vanilla html, css and javascript, so it can be run directly in the browser without the need to install any dependency packages.
Because it uses local storage, the user must continue their adventure on the same device, same browser and same browser user profile. In addition, in some browsers it may be necessary for the user to authorize the use of Cookies.

Desenvolvido por: Stênio V. Medeiros
https://steniovm.github.io/steniovm/
Repositório oficial
https://github.com/steniovm/MythicCardsRpgSolo
Licença: GNU GENERAL PUBLIC LICENSE Version 3
O codigo deste software é totalmente livre, porém as imagens do Mythic pertencem à wordmillgames.
O Mythic é um emulador de mestre para RPGs de mesa. Também pode ser usado como auxiliar de mestre.
A versão padrão do Mythic consiste em um livro de regras que utilizam 2d10 como elemento de aleatóriedade. A versão em Cartas é uma versão simplificada porém ainda bastante rica.
No Brasil o Mythic foi traduzido e está sendo distribuido pela editora Retropunk ( https://retropunk.com.br/editora ).
A livro pode ser comprado na loja da editora, https://loja.retropunk.com.br/index.php?id_product=841&rewrite=mythic-emulador-de-mestre-de-jogo-pdf&controller=product .
O baralho também pode pode ser adquirido ( https://loja.retropunk.com.br/index.php?id_product=844&rewrite=mythic-baralho-de-narrativas-mythicas-jpg&controller=product ) em jpg com manual em pdf, e na versão física.
O software foi todo escrito em html, css e javascript vanilla, de forma que pode ser executado direto no navegador sem necessidade de instalar qualquer pacote de dependências.
Por usar o local storage o usuário deve continuar sua aventura no mesmo dispositivo, mesmo navegador e mesmo perfil de usuário do navegador. Além disso, em alguns navegadores pode ser necessário que o usuário autorize a utilização de Cookies.
*/
//global variables and constants
//variaveis e constantes globais
const FCN = [
  "#FFFFFF",
  "#7A87A7",
  "#687699",
  "#56658C",
  "#425580",
  "#000000",
  "#C92027",
  "#D02F27",
  "#D64532",
  "#DB5C4D",
];
const tramalist = [];
const personlist = [];
const NCMYTHIC = 100;
const TEMPMS = 3000;
const cimgs = "/cards/";
const texts = {
  "pt-BR": {
    FatorCaos: "Fator de caos",
    ListaTramaVazia: "Lista de tramas vazia",
    ListaPersonVazia: "Lista de personagens vazia",
    Reembaralhe: "baralho vazio - reembaralhe",
    DigiteTrama: "Digite a trama",
    DigitePersonagem: "Digite o personagem",
    Visualização: "Visualização",
    ClaroEscuro: "Claro/Escuro",
    Regras: "Regras",
    Autoremocao: "Autoremoção das listas",
    TamanhoCartas: "Tamanho das cartas",
    Destaque: "Em destaque",
    NaMesa: "Na mesa",
  },
  en: {
    FatorCaos: "Chaos Factor",
    ListaTramaVazia: "Empty plot list",
    ListaPersonVazia: "Empty character list",
    Reembaralhe: "empty deck - reshuffle",
    DigiteTrama: "Enter the plot",
    DigitePersonagem: "Enter Character",
    Visualização: "View",
    ClaroEscuro: "Light/Dark",
    Regras: "Rules",
    Autoremocao: "Auto-remove from lists",
    TamanhoCartas: "Card size",
    Destaque: "Highlight",
    NaMesa: "On table",
  },
};
let language = "pt-BR";
let baralho = [];
let descarte = [];
let fc = 5;
let nlist = 0;
let autreli = true;
let sizes = { menu: 32, cardg: 256, cardm: 120 };

//Functions
//Funções

//Detect language
//Detecta idioma
function languageDetect() {
  const lang = navigator.language;
  language = lang == "pt-BR" || lang == "pt" ? "pt-BR" : "en";
  if (lang === "en") {
    btcardmythic.title = "Mythic Cards";
    btembaralhar.title = "Shuffle Mythic Cards";
    btlisttrama.title = "Plot List Cards";
    btlistperson.title = "Character List Cards";
    btlistas.title = "Edit Lists";
    fccard.title = "Reference Cards";
    pdcard.title = "Reference Cards";
    divfcaos.title = "Chaos Factor";
    colormode.title = "Color Mode";
    caosinstruction.title = "How to use the Chaos Factor";
    perginstruction.title = "How to Ask Destiny Questions";
    cardnumber.title = "Numbered List Cart";
    cardg.title = "Card drawn";
  }
}

//open and save data
//abrir e salvar dados
function saveData() {
  data = JSON.stringify({
    baralho: baralho,
    descarte: descarte,
    tramalist: tramalist,
    personlist: personlist,
    fc: fc,
    nlist: nlist,
    dkmode: darkmode.disabled,
    autreli: autreli,
    sizem: sizes.menu,
    sizecm: sizes.cardm,
    sizecg: sizes.cardg,
  });
  localStorage.setItem("mythic", data);
}
function getSaveData() {
  const data = JSON.parse(localStorage.getItem("mythic"));
  if (data.baralho.length) {
    baralho.push(...data.baralho);
  }
  if (data.descarte.length) {
    descarte.push(...data.descarte);
    data.descarte.forEach((el) => showcard(el));
  }
  if (data.tramalist.length) {
    tramalist.push(...data.tramalist);
    data.tramalist.forEach((el) => addtramatable(el));
  }
  if (data.personlist.length) {
    personlist.push(...data.personlist);
    data.personlist.forEach((el) => addpersontable(el));
  }
  if (data.fc) setFC(data.fc);
  if (data.nlist) nlist = data.nlist;
  darkmode.disabled = data.dkmode;
  if (data.autreli != undefined) {
    btaremove.checked = data.autreli;
    autreli = data.autreli;
  }
  if (data.sizem) {
    insizemenu.value = data.sizem;
    sizes.menu = data.sizem;
  }
  if (data.sizecm) {
    insizemini.value = data.sizecm;
    sizes.cardm = data.sizecm;
  }
  if (data.sizecg) {
    insizecard.value = data.sizecg;
    sizes.cardg = data.sizecg;
  }
  if (data.sizem || data.sizecm || data.sizecg) setsizes();
}
//shuffles Mythic cards
//embaralha cartas do Mythic
function embaralhar() {
  let bar = [];
  baralho = [];
  for (i = 0; i <= NCMYTHIC; i++) {
    const card = {
      imgs: "MYTHIC_" + i + ".jpg",
      reverse: randreverse(),
    };
    bar.push(card);
  }
  while (bar.length > 0) {
    let n = Math.floor(Math.random() * bar.length);
    baralho.push(bar.splice(n, 1));
  }
  descarte = [];
}
//draws lots to see whether the card will be turned over or not
//sorteia se a carta será virada ou não
function randreverse() {
  return Math.random() < 0.5;
}
//call function to shuffle
//chama função para embaralhar
function randomcards() {
  hiddenmodals();
  mesa.innerHTML = "";
  embaralhar();
  saveData();
}
//set the chaos factor
//seta o fator de caos
function setFC(n) {
  fc = n;
  fcaos.innerHTML = "FC " + n;
  fcaos.title = texts[language].FatorCaos + ": " + n;
  fcaos.style.background = FCN[n];
}
function upFC() {
  if (fc < 9) setFC(fc + 1);
  saveData();
}
function downFC() {
  if (fc > 1) setFC(fc - 1);
  saveData();
}
//shows and hides modals
//mostra e esconde os modals
function hiddenmodals() {
  divcaos.classList.add("hiddendiv");
  divperg.classList.add("hiddendiv");
  divonelist.classList.add("hiddendiv");
  divcardythic.classList.add("hiddendiv");
  divlists.classList.add("hiddendiv");
  divsetings.classList.add("hiddendiv");
}
function showmodal(modal) {
  hiddenmodals();
  modal.classList.remove("hiddendiv");
}
function showcaos() {
  showmodal(divcaos);
}
function showperg() {
  showmodal(divperg);
}
function showlists() {
  showmodal(divlists);
}
function showsetings() {
  showmodal(divsetings);
}
//displays the cards drawn on the table
//exibe na mesa as cartas sacadas
function showcard(card) {
  const divel = document.createElement("div");
  const imgel = document.createElement("img");
  divel.classList.add("cardm");
  imgel.classList.add("med");
  imgel.src = "." + cimgs + card.imgs;
  if (card.reverse) imgel.classList.add("invert");
  divel.appendChild(imgel);
  if (card.imgs != "MYTHIC_0.jpg") {
    const targ = document.createElement("div");
    targ.classList.add("targe");
    divel.appendChild(targ);
  }
  divel.addEventListener("click", (ev) => {
    const cardnode = ev.target.parentElement;
    const card = {
      imgs: cardnode.childNodes[0].src.split(cimgs)[1],
      reverse: cardnode.childNodes[0].classList.contains("invert"),
    };
    showcardg(card);
  });
  mesa.appendChild(divel);
}
function showcardg(card) {
  showmodal(divcardythic);
  cardg.src = "." + cimgs + card.imgs;
  if (card.reverse) cardg.classList.add("invert");
  else cardg.classList.remove("invert");
  if (card.imgs == "MYTHIC_0.jpg") {
    divtarge.classList.add("hiddendiv");
  } else {
    divtarge.classList.remove("hiddendiv");
  }
}
function showcardtrama() {
  if (tramalist.length > 0) {
    const n = Math.floor(Math.random() * tramalist.length);
    showmodal(divonelist);
    numberlist.innerHTML = tramalist[n].n;
    desclist.innerHTML = tramalist[n].desc;
    if (autreli) removetrama(tramalist[n].n);
    saveData();
  } else {
    printmenssage(texts[language].ListaTramaVazia);
  }
}
function showcardperson() {
  if (personlist.length > 0) {
    const n = Math.floor(Math.random() * personlist.length);
    showmodal(divonelist);
    numberlist.innerHTML = personlist[n].n;
    desclist.innerHTML = personlist[n].desc;
    if (autreli) removeperson(personlist[n].n);
    saveData();
  } else {
    printmenssage(texts[language].ListaPersonVazia);
  }
}
//draws a card from the Mythic deck
//saca uma carta do baralho do Mythic
function saccard() {
  if (baralho.length > 0) {
    const card = baralho.pop()[0];
    showcard(card);
    showcardg(card);
    descarte.push(card);
    setTimeout(() => {
      mesa.scrollTop = -mesa.scrollHeight;
    }, 10);
    saveData();
  } else {
    printmenssage(texts[language].Reembaralhe);
  }
}
//adds and removes items from lists
//adiciona e remove itens das listas
function removetrama(nt) {
  let i = -1;
  document.getElementById("tlist" + nt).remove();
  tramalist.forEach((el, ind) => {
    if (el.n === nt) i = ind;
  });
  if (i >= 0) tramalist.splice(i, 1);
  if (tramalist.length + personlist.length == 0) nlist = 0;
  saveData();
}
function addtramatable(trama) {
  const tr = document.createElement("tr");
  const tdn = document.createElement("td");
  const tdd = document.createElement("td");
  const tdb = document.createElement("td");
  const button = document.createElement("button");
  tr.id = "tlist" + trama.n;
  tr.appendChild(tdn);
  tr.appendChild(tdd);
  tr.appendChild(tdb);
  tdn.innerHTML = trama.n;
  tdd.innerHTML = trama.desc;
  tdb.appendChild(button);
  button.innerHTML = "-";
  button.id = "tblist" + trama.n;
  let nt = trama.n;
  button.addEventListener("click", () => {
    removetrama(nt);
  });
  ltramas.appendChild(tr);
}
function addtrama() {
  if (novtrama.value) {
    const nvtrama = novtrama.value;
    nlist++;
    let nt = nlist;
    const trama = { n: nt, desc: nvtrama };
    tramalist.push(trama);
    addtramatable(trama);
    saveData();
  } else {
    printmenssage(texts[language].DigiteTrama);
  }
}
function removeperson(np) {
  let i = -1;
  document.getElementById("plist" + np).remove();
  personlist.forEach((el, ind) => {
    if (el.n === np) i = ind;
  });
  if (i >= 0) personlist.splice(i, 1);
  if (tramalist.length + personlist.length == 0) nlist = 0;
  saveData();
}
function addpersontable(person) {
  const tr = document.createElement("tr");
  const tdn = document.createElement("td");
  const tdd = document.createElement("td");
  const tdb = document.createElement("td");
  const button = document.createElement("button");
  tr.id = "plist" + person.n;
  tr.appendChild(tdn);
  tr.appendChild(tdd);
  tr.appendChild(tdb);
  tdn.innerHTML = person.n;
  tdd.innerHTML = person.desc;
  tdb.appendChild(button);
  button.innerHTML = "-";
  button.id = "pblist" + person.n;
  let np = person.n;
  button.addEventListener("click", () => {
    removeperson(np);
  });
  lperson.appendChild(tr);
}
function addperson() {
  if (novperson.value) {
    const nvperson = novperson.value;
    nlist++;
    let np = nlist;
    const person = { n: np, desc: nvperson };
    personlist.push(person);
    addpersontable(person);
    saveData();
  } else {
    printmenssage(texts[language].DigitePersonagem);
  }
}
function autoremove() {
  autreli = btaremove.checked;
  saveData();
}
//print message
//imprime mensagem
function printmenssage(text) {
  divmessages.classList.remove("hiddendiv");
  messages.innerHTML = text;
  setTimeout(() => {
    divmessages.classList.add("hiddendiv");
  }, TEMPMS);
}
//change color scheme
//troca esquema de cores
function colormodetoggle() {
  darkmode.disabled = !darkmode.disabled;
  saveData();
}
//set element sizes
//seta tamanhos dos elementos
function setsizes() {
  stylefomat.innerHTML = `
  .mini { width: ${sizes.menu}px;}
  .cardm { width: ${sizes.cardm}px;}
  .med { width: ${sizes.cardm}px;}
  .card { width: ${sizes.cardg}px;}
  main { top: ${sizes.menu * 1.38 + 32}px;}
  `;
}
function setsizemenu() {
  sizes.menu = insizemenu.value;
  setsizes();
  saveData();
}
function setsizecardg() {
  sizes.cardg = insizecard.value;
  setsizes();
  saveData();
}
function setsizecardm() {
  sizes.cardm = insizemini.value;
  setsizes();
  saveData();
}
//initialization
//inicialização
fcmais.addEventListener("click", upFC);
fcmenos.addEventListener("click", downFC);
fcaos.addEventListener("click", showcaos);
fccard.addEventListener("click", showcaos);
divcaos.addEventListener("click", hiddenmodals);
divperg.addEventListener("click", hiddenmodals);
pdcard.addEventListener("click", showperg);
btcardmythic.addEventListener("click", saccard);
btlistas.addEventListener("click", showlists);
fechalistas.addEventListener("click", hiddenmodals);
fechasetings.addEventListener("click", hiddenmodals);
btnovtrama.addEventListener("click", addtrama);
btnovperson.addEventListener("click", addperson);
btlisttrama.addEventListener("click", showcardtrama);
btlistperson.addEventListener("click", showcardperson);
btconfig.addEventListener("click", showsetings);
divonelist.addEventListener("click", hiddenmodals);
divcardythic.addEventListener("click", hiddenmodals);
btembaralhar.addEventListener("click", randomcards);
colormode.addEventListener("click", colormodetoggle);
btaremove.addEventListener("change", autoremove);
insizemenu.addEventListener("change", setsizemenu);
insizecard.addEventListener("change", setsizecardg);
insizemini.addEventListener("change", setsizecardm);

embaralhar();
setFC(5);
languageDetect();
getSaveData();
