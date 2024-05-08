//valores tabelados
const songs = [
  {
    cat: "Attack",
    songs: [
      "Goblin_Attack_01.wav",
      "Goblin_Attack_02.wav",
      "Goblin_Attack_03.wav",
      "Goblin_Attack_04.wav",
      "Goblin_Attack_05.wav",
    ],
  },
  {
    cat: "Death",
    songs: [
      "Goblin_Death_01.wav",
      "Goblin_Death_02.wav",
      "Goblin_Death_03.wav",
      "Goblin_Death_04.wav",
      "Goblin_Death_05.wav",
    ],
  },
  {
    cat: "Grunt",
    songs: [
      "Goblin_Grunt_01.wav",
      "Goblin_Grunt_02.wav",
      "Goblin_Grunt_03.wav",
      "Goblin_Grunt_04.wav",
      "Goblin_Grunt_05.wav",
    ],
  },
  {
    cat: "Hurt",
    songs: [
      "Goblin_Hurt_01.wav",
      "Goblin_Hurt_02.wav",
      "Goblin_Hurt_03.wav",
      "Goblin_Hurt_04.wav",
      "Goblin_Hurt_05.wav",
    ],
  },
  {
    cat: "Idle",
    songs: [
      "Goblin_Idle_01.wav",
      "Goblin_Idle_02.wav",
      "Goblin_Idle_03.wav",
      "Goblin_Idle_04.wav",
      "Goblin_Idle_05.wav",
    ],
  },
  {
    cat: "Laugh",
    songs: [
      "Goblin_Laugh_01.wav",
      "Goblin_Laugh_02.wav",
      "Goblin_Laugh_03.wav",
      "Goblin_Laugh_04.wav",
      "Goblin_Laugh_05.wav",
    ],
  },
  {
    cat: "Surprise",
    songs: [
      "Goblin_Surprise_01.wav",
      "Goblin_Surprise_02.wav",
      "Goblin_Surprise_03.wav",
      "Goblin_Surprise_04.wav",
      "Goblin_Surprise_05.wav",
    ],
  },
];
const translats = {
  Attack: "Ataque",
  Death: "Morte",
  Grunt: "Grunhido",
  Hurt: "Ferido",
  Idle: "Parado",
  Laugh: "Risada",
  Surprise: "Surpresa",
};
//Elementos HTML
const categorys = document.getElementById("cats");
var audio = new Audio();

songs.forEach((cate) => {
  const div = document.createElement("div");
  categorys.appendChild(div);
  const h3 = document.createElement("h3");
  div.appendChild(h3);
  h3.innerText = translats[cate.cat] || cate.cat;
  cate.songs.forEach((song, index) => {
    const button = document.createElement("button");
    div.appendChild(button);
    button.innerHTML = (translats[cate.cat] || cate.cat) + " " + (index + 1);
    button.addEventListener("click", () => {
      audio.src = "./Songs/" + cate.cat + "/" + song;
      audio.play();
    });
  });
});
