//valores tabelados
const namesvalues = [
  ["Plaft", "Plin", "Tik", "Tok", "Bash", "Cricri"],
  ["Glub", "Tim", "Ranço", "Yhaa", "Vrum", "Aiaiai"],
  ["Crash", "Zzzz", "Sussa", "Bibi", "Boom", "Bum"],
  ["Spray", "Cringe", "Sopa", "Ovo", "Ban", "Nhack"],
  ["Bing", "Riso", "Slash", "Coff", "Ugh", "Sniff"],
  [
    "Última coisa que comeu",
    "Última coisa que comeu",
    "Última coisa que comeu",
    "Inverta seu nome",
    "Inverta seu nome",
    "Inverta seu nome",
  ],
];
const occupations = [
  "Mercenário",
  "Caçador",
  "Gatuno",
  "Líder",
  "Incendiário",
  "Bruxo",
];
const descriptors = [
  "Covarde",
  "Atrapalhado",
  "Tapado",
  "Fracote",
  "Medíocre",
  "Supimpa",
];
const characteristcs = [
  [
    "Bomba-relógio",
    "Minicabeça",
    "Apêndice extra",
    "Poros fedidos",
    "Verdura",
    "Role 2 vezes",
  ],
  ["Cinzento", "Cabeção", "Orelha extra", "Pintas", "Minion", "Fosforescente"],
  ["Amaldiçoado", "Linguão", "Nariz extra", "Listras", "Galináceo", "Colorido"],
  [
    "Tom bélico",
    "Olho gigante",
    "Olhos extras",
    "Pompom",
    "Peixoso",
    "Amarelo",
  ],
  ["Flutulência", "Pés gigantes", "Braço extra", "Chifre", "Felino", "Azul"],
  [
    "Role 2 vezes",
    "Mão gigante",
    "Cabeça extra",
    "Cicatrizes",
    "Aracnídeo",
    "Vermelho",
  ],
];
const equipaments = [
  "Espada e Escudo",
  "2 Machadinhas",
  "Machadão",
  "3 Adagas",
  "Arco de Caça",
  "Pistola e Chapéu",
  "Rapieira e Bronquel",
  "Espada e Medalhas de Guerra",
  "Lança e Elmo",
  "Espadona",
  "Barril de Pólvora",
  "Pistola e Galinha Explosiva",
  "Bacamarte e Chapéu",
  "Cajado",
  "Varinha e Cachecol",
  "Vassoura e Chapéu",
];
const spells = [
  "Fogo",
  "Gelo",
  "Relâmpago",
  "Troca",
  "Cura",
  "Morte",
  "Planta",
];
//elementos html
const playername = document.getElementById("playername");
const foodname = document.getElementById("foodname");
const Rollbt = document.getElementById("Rollbt");
const showdices = document.getElementById("showdices");
const dicesshow = document.getElementsByClassName("dice");
const tablenames = document.querySelectorAll("#tablename tr");
const tableoccups = document.querySelectorAll("#tableoccup tr");
const tablecharac = document.querySelectorAll("#tablecharac tr");
//variaveis globais
const goblin = {
  name: "",
  level: 1,
  occup: "",
  chart: "",
  combat: 2,
  ability: 2,
  notion: 2,
  vitality: 2,
  injuries: "",
  equip: "",
  spells: "",
};
let pname = "";
let fname = "";
dicerolls = [0, , , , , , ,];
//eventos
playername.addEventListener("change", () => {
  pname = playername.value;
});
foodname.addEventListener("change", () => {
  fname = foodname.value;
});
Rollbt.addEventListener("click", roolDices);
//montagem de tabelas
showNamesTable();
function showNamesTable() {
  namesvalues.forEach((namel, i) => {
    namel.forEach((name, j) => {
      let cell = document.createElement("td");
      cell.innerText = name;
      tablenames[i + 1].appendChild(cell);
    });
  });
}
showOccupTable();
function showOccupTable() {
  let cello;
  let celld;
  for (let i = 0; i < 6; i++) {
    cello = document.createElement("td");
    celld = document.createElement("td");
    cello.innerText = occupations[i];
    celld.innerText = descriptors[i];
    tableoccups[i + 1].appendChild(cello);
    tableoccups[i + 1].appendChild(celld);
  }
}
showChartTable();
function showChartTable() {
  characteristcs.forEach((chartl, i) => {
    chartl.forEach((chart, j) => {
      let cell = document.createElement("td");
      cell.innerText = chart;
      tablecharac[i + 1].appendChild(cell);
    });
  });
}
//rolagem de dados
function roolDices() {
  if (document.querySelectorAll("#showdices>*").length > 8) {
    while (document.querySelectorAll("#showdices>*").length > 8) {
      document.querySelectorAll("#showdices>*")[8].remove();
    }
  }
  for (let i = 1; i < 7; i++) {
    dicerolls[i] = Math.ceil(Math.random() * 6);
    dicesshow[i - 1].innerHTML = dicerolls[i];
  }
  goblin.level = 1;
  goblin.combat = 2;
  goblin.ability = 2;
  goblin.notion = 2;
  goblin.vitality = 2;
  gnameRoll(dicerolls[1], dicerolls[2]);
  goccupRoll(dicerolls[3]);
  gdescRoll(dicerolls[4]);
  gchartRoll(dicerolls[5], dicerolls[6]);
  showgoblin();
  console.log(goblin);
}
//sorteia nome
function gnameRoll(colt, rowt) {
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      tablenames[i].children[j].classList.remove("tdselected");
    }
  }
  if (rowt !== 6) {
    goblin.name = namesvalues[rowt - 1][colt - 1];
  } else {
    if (colt < 4) {
      goblin.name = foodname.value.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
        letra.toUpperCase()
      );
    } else {
      goblin.name = playername.value
        .split("")
        .reverse()
        .join("")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
    }
  }
  tablenames[rowt].children[colt].classList.add("tdselected");
}
//sorteia ocupação
function goccupRoll(index) {
  for (let i = 1; i < 7; i++) {
    tableoccups[i].children[1].classList.remove("tdselected");
  }
  goblin.occup = occupations[index - 1];
  tableoccups[index].children[1].classList.add("tdselected");
  goblin.spells = "";
  switch (index) {
    case 1:
    case 2:
      goblin.combat += 1;
      break;
    case 3:
      goblin.ability += 1;
      break;
    case 4:
    case 5:
      goblin.vitality += 1;
      break;
    case 6:
      goblin.notion += 1;
      gspellsRoll();
      break;
    default:
      break;
  }
  gequipRoll(index);
}
//sorteia equipamento
function gequipRoll(index) {
  const eq = Math.ceil(Math.random() * 3);
  switch (index) {
    case 1:
      if (eq === 1) {
        goblin.equip = equipaments[0];
      } else if (eq === 2) {
        goblin.equip = equipaments[1];
      } else {
        goblin.equip = equipaments[2];
      }
      break;
    case 2:
      if (eq === 1) {
        goblin.equip = equipaments[3];
      } else if (eq === 2) {
        goblin.equip = equipaments[4];
      } else {
        goblin.equip = equipaments[5];
      }
      break;
    case 3:
      if (eq === 1) {
        goblin.equip = equipaments[3];
      } else if (eq === 2) {
        goblin.equip = equipaments[6];
      } else {
        goblin.equip = equipaments[5];
      }
      break;
    case 4:
      if (eq === 1) {
        goblin.equip = equipaments[7];
      } else if (eq === 2) {
        goblin.equip = equipaments[8];
      } else {
        goblin.equip = equipaments[9];
      }
      break;
    case 5:
      if (eq === 1) {
        goblin.equip = equipaments[10];
      } else if (eq === 2) {
        goblin.equip = equipaments[11];
      } else {
        goblin.equip = equipaments[12];
      }
      break;
    case 6:
      if (eq === 1) {
        goblin.equip = equipaments[13];
      } else if (eq === 2) {
        goblin.equip = equipaments[14];
      } else {
        goblin.equip = equipaments[15];
      }
      break;
    default:
      break;
  }
}
//sorteia magias
function gspellsRoll() {
  let sp = [];
  spells.forEach((spell) => sp.push(spell));
  let spselect = [];
  spselect.push(sp.splice(Math.floor(Math.random() * sp.length), 1));
  spselect.push(sp.splice(Math.floor(Math.random() * sp.length), 1));
  spselect.push(sp.splice(Math.floor(Math.random() * sp.length), 1));
  goblin.spells = spselect.join(",");
}
//sorteia descrição
function gdescRoll(index) {
  for (let i = 1; i < 7; i++) {
    tableoccups[i].children[2].classList.remove("tdselected");
  }
  goblin.descriptors = descriptors[index - 1];
  tableoccups[index].children[2].classList.add("tdselected");
  switch (index) {
    case 1:
      goblin.combat -= 1;
      break;
    case 2:
      goblin.ability -= 1;
      break;
    case 3:
      goblin.notion -= 1;
      break;
    case 4:
      goblin.vitality -= 1;
      break;
    case 5:
      break;
    case 6:
      addAtrrRand(Math.ceil(Math.random() * 6));
      break;
    default:
      break;
  }
}
//incrementa um atributo
function addAtrrRand(index) {
  switch (index) {
    case 1:
      goblin.combat++;
      break;
    case 2:
      goblin.ability++;
      break;
    case 3:
      goblin.notion++;
      break;
    case 4:
      goblin.vitality++;
      break;
    default:
      break;
  }
}
//sorteia caracteristica
function gchartRoll(colt, rowt, clear = true) {
  if (clear) {
    for (let i = 1; i < 7; i++) {
      for (let j = 1; j < 7; j++) {
        tablecharac[i].children[j].classList.remove("tdselected");
      }
    }
    goblin.chart = "";
  } else {
    const newdice0 = document.createElement("hr");
    const newdice1 = document.createElement("div");
    const newdice2 = document.createElement("div");
    newdice1.classList.add("dice");
    newdice2.classList.add("dice");
    newdice1.innerText = colt;
    newdice2.innerText = rowt;
    showdices.appendChild(newdice0);
    showdices.appendChild(newdice1);
    showdices.appendChild(newdice2);
  }
  if ((colt === 1 && rowt == 6) || (colt === 6 && rowt == 1)) {
    gchartRoll(
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      false
    );
    gchartRoll(
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      false
    );
  } else {
    goblin.chart += characteristcs[rowt - 1][colt - 1];
    if (!clear) {
      goblin.chart += ", ";
    }
  }
  tablecharac[rowt].children[colt].classList.add("tdselected");
}
function showgoblin() {
  document.getElementById("shname").innerHTML = goblin.name;
  document.getElementById("shlevel").innerHTML = goblin.level;
  document.getElementById("shoccup").innerHTML = goblin.occup;
  document.getElementById("shchart").innerHTML = goblin.chart;
  document.getElementById("shcomb").innerHTML = goblin.combat;
  document.getElementById("shabilt").innerHTML = goblin.ability;
  document.getElementById("shnotion").innerHTML = goblin.notion;
  document.getElementById("shvital").innerHTML = goblin.vitality;
  document.getElementById("shinjur").innerHTML = goblin.injuries;
  document.getElementById("shequip").innerHTML = goblin.equip;
  document.getElementById("shspells").innerHTML = goblin.spells;
}
