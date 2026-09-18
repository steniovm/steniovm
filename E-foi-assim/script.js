const startscreem = document.getElementById("startscreem");
const loaderfich = document.getElementById("loaderfich");
const searchfich = document.getElementById("searchfich");
const setupfich = document.getElementById("setupfich");
const datafich = document.getElementById("datafich");
const newfichButton = document.getElementById("newfich");
const loadfichButton = document.getElementById("loadfich");
const findfichButton = document.getElementById("findfich");
const continuefich = document.getElementById("continuefich");
const backButton = document.getElementsByClassName("backButton");
const viewbutton = document.getElementById("viewbutton");
const savebutton = document.getElementById("savebutton");
const fileInput = document.getElementById("fileInput");
const inputsdata = document.getElementsByClassName("dataunic");
const marcoContainer = document.getElementById("marcoContainer");
const marcoExContainer = document.getElementById("marcoExContainer");
const inputsMarcodata = document.getElementsByClassName("marcoInput");
const inputsMarcoExdata = document.getElementsByClassName("marcoExInput");
const marcoboxes = document.getElementsByClassName("marcoBox");
const addMarcoP = document.getElementById("addMarcoP");
const addMarcoE = document.getElementById("addMarcoE");
const adventureOutput = document.getElementById("adventureOutput");
const exportbuttonSVG = document.getElementById("exportbuttonSVG");
const exportbuttonPNG = document.getElementById("exportbuttonPNG");
const exportbuttonJPG = document.getElementById("exportbuttonJPG");
const modalfich = document.getElementById("modalfich");
const closeModal = document.getElementById("closeModal");

const fichData = {
  scale: "",
  title: "",
  scientist: "",
  objective: "",
  detailing: "",
  eventsmain: [],
  eventsextra: [],
  author: "",
  date: "",
};

//para o form não ser enviado automaticamente
//event.preventDefault();

function capturedataform() {
  const dados = new FormData(datafich);
  console.log("Captured form data:", dados);
  const dadosObjeto = {};
  // Obtém uma lista única de todos os nomes de campos presentes no formulário
  const chavesUnicas = [...new Set(dados.keys())];
  console.log("Unique field names:", chavesUnicas);
  chavesUnicas.forEach((chave) => {
    // Pega todos os valores associados àquela chave específica
    const valores = dados.getAll(chave);
    // Se houver campo de marcos, salva como Array. Se outro campo, salva como String.
    dadosObjeto[chave] =
      chave === "eventsmain" || chave === "eventsextra" ? valores : valores[0];
  });

  fichData.scale = dadosObjeto.scale || "";
  fichData.title = dadosObjeto.title || "";
  fichData.scientist = dadosObjeto.scientist || "";
  fichData.objective = dadosObjeto.objective || "";
  fichData.detailing = dadosObjeto.detailing || "";
  fichData.eventsmain = dadosObjeto.eventsmain || [];
  fichData.eventsextra = dadosObjeto.eventsextra || [];
  fichData.author = dadosObjeto.author || "";
  fichData.date = formatarData();

  console.log("Dados atualizados com Arrays:", fichData);

  // Salva o rascunho completo no navegador
  localStorage.setItem("EFoiAssim", JSON.stringify(dadosObjeto));
}

function newfichshow() {
  startscreem.classList.add("hidden");
  setupfich.classList.remove("hidden");
  if (marcoContainer.children.length === 0) {
    addMarcoPBox(); // Adiciona um marco principal inicial
  }
  if (marcoExContainer.children.length === 0) {
    addMarcoEBox(); // Adiciona um marco extra inicial
  }
}

newfichButton.addEventListener("click", newfichshow);

function continuefichshow() {
  startscreem.classList.add("hidden");
  setupfich.classList.remove("hidden");
}

continuefich.addEventListener("click", continuefichshow);

for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener("click", () => {
    setupfich.classList.add("hidden");
    startscreem.classList.remove("hidden");
    continuefich.classList.remove("hidden");
    console.log("Back button clicked");
  });
}

function fichverifiqued() {
  if (
    fichData.scale ||
    fichData.title ||
    fichData.scientist ||
    fichData.objective ||
    fichData.detailing ||
    fichData.eventsmain.length > 0 ||
    fichData.eventsextra.length > 0 ||
    fichData.author ||
    fichData.date
  ) {
    return true;
  }
  return false;
}

function setFichData(field, value) {
  if (field in fichData) {
    fichData[field] = value;
  } else {
    console.warn(`Field "${field}" does not exist in fichData.`);
  }
}
function pushFichData(field, value) {
  if (field in fichData) {
    fichData[field].push(value);
  } else {
    console.warn(`Field "${field}" does not exist in fichData.`);
  }
}

for (let i = 0; i < inputsdata.length; i++) {
  inputsdata[i].addEventListener("change", (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFichData(fieldName, fieldValue);
    console.log(`Updated ${fieldName}: ${fieldValue}`);
    console.log("Current fichData:", fichData);
    capturedataform();
  });
}

function seteventinmarcodata() {
  for (let i = 0; i < inputsMarcodata.length; i++) {
    inputsMarcodata[i].addEventListener("change", (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      fichData[fieldName] = [];
      for (let i = 0; i < inputsMarcodata.length; i++) {
        pushFichData(fieldName, inputsMarcodata[i].value);
      }
      console.log(`Updated ${fieldName}: ${fieldValue}`);
      console.log("Current fichData:", fichData);
      capturedataform();
    });
  }
}
seteventinmarcodata();
function seteventinmarcoexdata() {
  for (let i = 0; i < inputsMarcoExdata.length; i++) {
    inputsMarcoExdata[i].addEventListener("change", (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      fichData[fieldName] = [];
      for (let i = 0; i < inputsMarcoExdata.length; i++) {
        pushFichData(fieldName, inputsMarcoExdata[i].value);
      }
      console.log(`Updated ${fieldName}: ${fieldValue}`);
      console.log("Current fichData:", fichData);
      capturedataform();
    });
  }
}
seteventinmarcoexdata();

function showFichData() {
  if (fichData.scale === "short") {
    document.getElementById("avcurto").checked = true;
  } else {
    document.getElementById("avlongo").checked = true;
  }
  document.getElementsByName("title")[0].value = fichData.title;
  document.getElementsByName("scientist")[0].value = fichData.scientist;
  document.getElementsByName("objective")[0].value = fichData.objective;
  document.getElementsByName("detailing")[0].value = fichData.detailing;

  // Clear existing main events
  marcoContainer.innerHTML = "";
  // Populate main events
  for (let i = 0; i < fichData.eventsmain.length; i++) {
    const newMarcoBox = creatMarcoBox(i);
    newMarcoBox.querySelector(".marcoInput").value = fichData.eventsmain[i];
    const removeButton = newMarcoBox.querySelector(".deleteButton");
    removeButton.addEventListener("click", () => {
      newMarcoBox.remove();
      seteventinmarcodata(); // Atualiza os eventos principais após a remoção
      capturedataform();
    });
    marcoContainer.appendChild(newMarcoBox);
  }

  // Clear existing extra events
  marcoExContainer.innerHTML = "";
  // Populate extra events
  for (let i = 0; i < fichData.eventsextra.length; i++) {
    const newMarcoExBox = creatMarcoExBox(i);
    newMarcoExBox.querySelector(".marcoExInput").value =
      fichData.eventsextra[i];
    const removeButton = newMarcoExBox.querySelector(".deleteButton");
    removeButton.addEventListener("click", () => {
      newMarcoExBox.remove();
      seteventinmarcoexdata(); // Atualiza os eventos extras após a remoção
      capturedataform();
    });
    marcoExContainer.appendChild(newMarcoExBox);
  }

  document.getElementsByName("author")[0].value = fichData.author;

  newfichshow();
}

function loadfich(fichLoaded) {
  if (fichLoaded.scale) {
    fichData.scale = fichLoaded.scale;
  }
  if (fichLoaded.title) {
    fichData.title = fichLoaded.title;
  }
  if (fichLoaded.scientist) {
    fichData.scientist = fichLoaded.scientist;
  }
  if (fichLoaded.objective) {
    fichData.objective = fichLoaded.objective;
  }
  if (fichLoaded.detailing) {
    fichData.detailing = fichLoaded.detailing;
  }
  if (fichLoaded.eventsmain) {
    fichData.eventsmain = fichLoaded.eventsmain;
  }
  if (fichLoaded.eventsextra) {
    fichData.eventsextra = fichLoaded.eventsextra;
  }
  if (fichLoaded.author) {
    fichData.author = fichLoaded.author;
  }
  if (fichLoaded.date) {
    fichData.date = fichLoaded.date;
  }
  showFichData();
  capturedataform();
}

loadfichButton.addEventListener("click", () => {
  if (fichverifiqued()) {
    const confirmLoad = confirm(
      "Você tem dados não salvos. Deseja continuar e perder os dados atuais?",
    );
    if (!confirmLoad) {
      return;
    }
  }
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;
      try {
        const jsonData = JSON.parse(fileContent);
        loadfich(jsonData);
        console.log("JSON data:", jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  }
});

findfichButton.addEventListener("click", () => {
  startscreem.classList.add("hidden");
  searchfich.classList.remove("hidden");
});

function creatMarcoBox(n) {
  const marcoBox = document.createElement("div");
  marcoBox.classList.add("marcoBox");
  marcoBox.innerHTML = `
  <div class="arrowbuttons">
    <button class="upArrow" type="button">&#9650;</button>
    <label class="numberOrder">${n + 1}º</label>
    <button class="downArrow" type="button">&#9660;</button>
  </div>
  <div class="marcoInputBox">
    <input type="text" class="marcoInput" name="eventsmain" required />
  </div>
  <div class="deleteButtonContainer">
    <button type="button" class="functionButton deleteButton">-</button>
  </div>
  `;
  return marcoBox;
}

function creatMarcoExBox() {
  const marcoEBox = document.createElement("div");
  marcoEBox.classList.add("marcoExBox");
  marcoEBox.innerHTML = `
  <div class="marcoExInputBox">
    <input type="text" class="marcoExInput" name="eventsextra" required />
  </div>
  <div class="deleteButtonContainer">
    <button type="button" class="functionButton deleteButton">-</button>
  </div>
  `;
  return marcoEBox;
}

function updateOrderLabels() {
  for (let i = 0; i < marcoboxes.length; i++) {
    marcoboxes[i].querySelector(".numberOrder").textContent = `${i + 1}º`;
  }
}

function moveMarcoBox(marcoBox, dir) {
  const outherMB =
    dir === "up"
      ? marcoBox.previousElementSibling
      : marcoBox.nextElementSibling;
  if (!outherMB || !outherMB.classList.contains("marcoBox")) return;
  if (dir === "up") {
    marcoContainer.insertBefore(marcoBox, outherMB);
  } else {
    marcoContainer.insertBefore(outherMB, marcoBox);
  }
  updateOrderLabels();
  capturedataform(); // Atualiza os dados após a movimentação
}

marcoContainer.addEventListener("click", (ev) => {
  const arrowButton = ev.target.closest(".upArrow, .downArrow");
  if (!arrowButton) return;

  const marcoBox = arrowButton.closest(".marcoBox");
  const dir = arrowButton.classList.contains("upArrow") ? "up" : "down";
  moveMarcoBox(marcoBox, dir);
});

function addMarcoPBox() {
  const newMarcoBox = creatMarcoBox(marcoContainer.children.length);
  const removeButton = newMarcoBox.querySelector(".deleteButton");
  removeButton.addEventListener("click", () => {
    newMarcoBox.remove();
    updateOrderLabels();
    seteventinmarcodata(); // Atualiza os eventos principais após a remoção
    capturedataform();
  });
  marcoContainer.appendChild(newMarcoBox);
  seteventinmarcodata(); // Atualiza os eventos principais após a adição
}

addMarcoP.addEventListener("click", addMarcoPBox);

function addMarcoEBox() {
  const newMarcoExBox = creatMarcoExBox(marcoExContainer.children.length);
  const removeButton = newMarcoExBox.querySelector(".deleteButton");
  removeButton.addEventListener("click", () => {
    newMarcoExBox.remove();
    seteventinmarcoexdata(); // Atualiza os eventos extras após a remoção
    capturedataform();
  });
  marcoExContainer.appendChild(newMarcoExBox);
  seteventinmarcoexdata(); // Atualiza os eventos extras após a adição
}

addMarcoE.addEventListener("click", addMarcoEBox);

closeModal.addEventListener("click", () => {
  modalfich.classList.add("hidden");
  console.log("Modal closed");
});

function formatarData(data = new Date()) {
  const ano = data.getFullYear();
  // padStart garante que meses/dias com 1 dígito tenham o "0" na frente
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  const segundo = String(data.getSeconds()).padStart(2, "0");

  return `${ano}${mes}${dia}${hora}${minuto}${segundo}`;
}
function extrairData(dataString) {
  const ano = dataString.substring(0, 4);
  const mes = dataString.substring(4, 6);
  const dia = dataString.substring(6, 8);
  const hora = dataString.substring(8, 10);
  const minuto = dataString.substring(10, 12);
  const segundo = dataString.substring(12, 14);

  return `${dia}/${mes}/${ano}-${hora}:${minuto}:${segundo}`;
}

savebutton.addEventListener("click", () => {
  fichData.date = formatarData();
  const namefile = `${fichData.title || "fichData"}_${fichData.date}.json`;
  const jsonData = JSON.stringify(fichData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = namefile;
  a.click();

  URL.revokeObjectURL(url);
});

function marcoListPoints() {
  const pointStart = `<div class="marcopoint marcostart">
              <h4>Inicio</h4>
              <img class="marcobulletstar" src="./assets/imgs/efoiassim-elementos-01.svg" alt="Inicio da aventura" />
            </div>`;
  const pointBlack = `<img class="marcobullet" src="./assets/imgs/efoiassim-elementos-02.svg" alt="Marco point" />`;
  const npoints = { short: 3, long: 5 };
  let listpoints = pointStart;
  for (let i = 0; i < fichData.eventsmain.length; i++) {
    for (let j = 0; j < npoints[fichData.scale]; j++) {
      listpoints += pointBlack;
    }
    listpoints += `<div class="marcopoint">
              <img class="marcobulletstar" src="./assets/imgs/efoiassim-elementos-03.svg" alt="Marco point win" />
              <p>${fichData.eventsmain[i]}</p>
            </div>`;
  }
  return listpoints;
}

function marcoExListPoints() {
  let events = "";
  for (let i = 0; i < fichData.eventsextra.length; i++) {
    events += `<p><span class="checkbox"></span> ${fichData.eventsextra[i]}</p>`;
  }
  return events;
}

function fichToModal() {
  showCientistName.textContent = fichData.scientist;
  showdiscoveryName.textContent = fichData.objective;
  showDetailedDescription.textContent = fichData.detailing;
  showMarcosList.innerHTML = marcoListPoints();
  showMarcosExList.innerHTML = marcoExListPoints();
  showAuthorName.innerHTML = `<strong>Autor</strong>: ${fichData.author}`;
  showDateMade.innerHTML = `<strong>Data</strong>: ${extrairData(fichData.date)}`;
}

if (localStorage.getItem("EFoiAssim")) {
  loadfich(JSON.parse(localStorage.getItem("EFoiAssim")));
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

viewbutton.addEventListener("click", () => {
  console.log("Visualizando ficha");
  fichToModal();
  modalfich.classList.remove("hidden");
});

async function exportToImage(type) {
  console.log(`Exporting as ${type.toUpperCase()}`);
  await delay(1000);
  let link = document.createElement("a");
  let filename = `${fichData.title || "fichData"}_${formatarData()}.${type}`;
  console.log(`Filename: ${filename}`);
  switch (type) {
    case "svg":
      htmlToImage.toSvg(adventureOutput).then(function (dataUrl) {
        console.log(dataUrl);
        console.log("SVG Data URL generated");
        link.href = dataUrl;
        link.download = filename;
        link.click();
      });
      break;
    case "png":
      htmlToImage.toPng(adventureOutput).then(function (dataUrl) {
        console.log("PNG Data URL generated");
        link.href = dataUrl;
        link.download = filename;
        link.click();
      });
      break;
    case "jpeg":
      htmlToImage.toJpeg(adventureOutput).then(function (dataUrl) {
        console.log("JPEG Data URL generated");
        link.href = dataUrl;
        link.download = filename;
        link.click();
      });
      break;
  }
}

exportbuttonSVG.addEventListener("click", () => {
  console.log("Exporting as SVG");
  fichToModal();
  modalfich.classList.remove("hidden");
  exportToImage("svg");
});

exportbuttonPNG.addEventListener("click", () => {
  console.log("Exporting as PNG");
  fichToModal();
  modalfich.classList.remove("hidden");
  exportToImage("png");
});

exportbuttonJPG.addEventListener("click", () => {
  console.log("Exporting as JPG");
  fichToModal();
  modalfich.classList.remove("hidden");
  exportToImage("jpeg");
});
