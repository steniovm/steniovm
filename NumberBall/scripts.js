const LIMITS = {top:0,left:0,down:92,right:88,downb:96,rightb:94,gleft:35,gright:57};
const VELOCOM = 0.5;
const gamerconfig = document.getElementById('gamerconfig');
const alga = document.getElementsByName('alga');
const dire = document.getElementsByName('dire');
const inTime = document.getElementById('inTime');
const inVel = document.getElementById('inVel');
const Vmusic = document.getElementById('Vmusic');
const Vefect = document.getElementById('Vefect');
const Iniciar = document.getElementById('Iniciar');
const bRestart = document.getElementById('bRestart');
const Saveps = document.getElementById('Saveps');
const ballgame = document.querySelector('.ballgame');
const cabec = document.querySelectorAll('.cabec');
const algar = document.querySelectorAll('.algar');
const playactiv = document.getElementById('playactiv');
const arrow = document.getElementById('arrow');
const plc = document.getElementById('plc');
const pla = document.getElementById('pla');
const music = new Audio("./assets/jigsaw-puzzle-background.mp3");
music.loop = true;
const apitosong = new Audio("./assets/apitodefutebol.mp3");
const oversong = new Audio("./assets/defeat-sound.mp3");
const winssong = new Audio("./assets/applause_bbc.mp3");
const goalsong = new Audio("./assets/goool.mp3");
let positions = {
    ball:{x:0,y:0},
    cabec:[{x:0,y:0}],
    algar:[{x:0,y:0}]
};
let bollvec = {dx:0,dy:0};
let printok = true;
let gameplay = false;
let playac = undefined;
let direc = 0;
let config = {
    valga:0,
    vdire:0,
    timeg:0,
    veloc:0,
    vmusi:0,
    vefec:0
};
let direcbt={up:"",left:"",down:"",right:""};
let placar=[0,0];
let finterval = undefined;

//funções
//carrega as configurações
function upconfig(){
    alga.forEach(function(item,index){
        if (item.checked){
            config.valga = index;
        }
    });
    dire.forEach(function(item,index){
        if (item.checked){
            config.vdire = index
        }
    });
    config.timeg = inTime.value;
    config.veloc = inVel.value;
    config.vmusi = Vmusic.value;
    config.vefec = Vefect.value;
    music.volume = config.vmusi;
    apitosong.volume = config.vefec;
    oversong.volume = config.vefec;
    winssong.volume = config.vefec;
    goalsong.volume = config.vefec;
    if (printok) console.log(config);
}
//salva configurações em cookie
function saveconf(){
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = 'numberball' + "=" + JSON.stringify(config) + ";" + expires + ";path=/";
}
//renderiza os jogadores nas suas posições atuais em campo
function showplayers(){
    ballgame.style.top = positions.ball.y+'%';
    ballgame.style.left = positions.ball.x+'%';
    for (let i=0; i<10; i++){
        cabec[i].style.top = positions.cabec[i].y+'%';
        cabec[i].style.left = positions.cabec[i].x+'%';
        algar[i].style.top = positions.algar[i].y+'%';
        algar[i].style.left = positions.algar[i].x+'%';
    }
    if (playac){
        arrow.style.top = (positions.algar[playac].y-2)+'%';
        arrow.style.left = (positions.algar[playac].x-2)+'%';
    }
}
//sorteia a posição atual de cada jogador em campo
function positioninit(){
    positions.ball = {x:47,y:48};
    positions.cabec[0] = {x:44,y:2};
    positions.algar[0] = {x:44,y:90};
    for (let i=1;i<10;i++) {
        let cy = Math.random()*42;
        let cx = Math.random()*LIMITS.right;
        let ny = Math.random()*42+50;
        let nx = Math.random()*LIMITS.right;
        positions.cabec.push({x:cx,y:cy});
        positions.algar.push({x:nx,y:ny});
    }
    showplayers();
    if (printok) console.log(positions);
}
//renderiza os numeros dos jogadores conforme escolha dos algarismos
function shownambers(){
    for (let i=0;i<10;i++){
        algar[i].src="./assets/"+alga[config.valga].value+i+".svg";
    }
}
//configura botões direcionais conforme configurado
function direcbtdef(){
    if (config.vdire==0){
        direcbt.up = "ArrowUp";
        direcbt.left = "ArrowLeft";
        direcbt.down = "ArrowDown";
        direcbt.right = "ArrowRight";
    }else if (config.vdire==1){
        direcbt.up = "w";
        direcbt.left = "a";
        direcbt.down = "s";
        direcbt.right = "d";
    }
}
//marca o gol. parametro: 0-cabeçudos 1-algarismos
function newgool(team){
    placar[team]++; //
    plc.innerHTML = placar[0];
    pla.innerHTML = placar[1];
    positions.ball = {x:47,y:48};
    goalsong.play();
    showplayers();
}
//executa a partida dentro do tempo
async function playing(){
    if (gameplay){
        let dx;
        let dy;
        apitosong.play();
        setTimeout(function(){
            music.play();
        },1000);
        finterval = setInterval(function(){
            //detecta colisão bola parede lateral
            if (positions.ball.x < LIMITS.left || positions.ball.x > LIMITS.rightb){
                bollvec.dx *= -1;
            }
            //detecta colisão bola parede de gol
            if (positions.ball.y < LIMITS.top || positions.ball.y > LIMITS.downb){
                //detecta se foi gol
                if (positions.ball.x >= LIMITS.gleft && positions.ball.x <= LIMITS.gright){
                    if (positions.ball.y <= LIMITS.top) newgool(1);
                    if (positions.ball.y >= LIMITS.downb) newgool(0);
                }else{
                    bollvec.dy *= -1;
                }
            }
            //detecta colisão bola jogador
            for (let i=0;i<10;i++){
                let ddx = (positions.ball.x)-(positions.cabec[i].x)-4;
                let ddy = (positions.ball.y)-(positions.cabec[i].y)-4;
                let dd = Math.sqrt(Math.pow(ddx,2)+Math.pow(ddy,2));
                if (dd<=8){
                    bollvec.dy = VELOCOM;
                    if (bollvec.dx >=0) {bollvec.dx = VELOCOM;}
                    else {bollvec.dx = -VELOCOM;}
                }
                ddx = (positions.ball.x)-(positions.algar[i].x)-4;
                ddy = (positions.ball.y)-(positions.algar[i].y)-4;
                dd = Math.sqrt(Math.pow(ddx,2)+Math.pow(ddy,2));
                if (dd<=8){
                    if (i!=playac){
                        bollvec.dy = -VELOCOM;
                        if (bollvec.dx >=0) {bollvec.dx = VELOCOM;}
                        else {bollvec.dx = -VELOCOM;}
                    }else{
                        bollvec.dy = -(2*VELOCOM*Math.cos(direc*(Math.PI/180)));
                        bollvec.dx = (2*VELOCOM*Math.sin(direc*(Math.PI/180)));
                    }
                }
            }
            //move a bola
            positions.ball.x += bollvec.dx;
            positions.ball.y += bollvec.dy;
            //move jogadores aleatóriamente (movimento browniano) exceto jogador selecionado
            for (let i=0; i<10; i++){
               dx = Math.random()*2-1;
               dy = Math.random()*2-1;
               if (positions.cabec[i].x + dx >= LIMITS.left && positions.cabec[i].x + dx <= LIMITS.right ){
                positions.cabec[i].x += dx;
               }
               if (positions.cabec[i].y + dy >= LIMITS.top && positions.cabec[i].y + dy <= LIMITS.down ){
                positions.cabec[i].y += dy;
               }
               if (playac && i!=playac){
                if (positions.algar[i].x + dx >= LIMITS.left && positions.algar[i].x + dx <= LIMITS.right ){
                    positions.algar[i].x += dx;
                }
                if (positions.algar[i].y + dy >= LIMITS.top && positions.algar[i].y + dy <= LIMITS.down ){
                    positions.algar[i].y += dy;
                }
               } 
            }
            //atualiza posição dos jogadores
            showplayers();
        },100*(1.1-config.veloc));//timer conforme velocidade configurada
    }
}

//script inicial
//resgata configurações salvas em cookie
if (document.cookie.indexOf('numberball')>=0){
    config = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith('numberball='))?.split("=")[1])
    upconfig();
}
//inicializa posição dos jogadores em campo
positioninit();

//eventos
//botão iniciar
Iniciar.addEventListener('click',function(){
    upconfig();
    shownambers();
    direcbtdef();
    gamerconfig.style.display = 'none';
    gameplay = true;
    playing();
});
//botão salvar configurações
Saveps.addEventListener('click',function(){
    upconfig();
    saveconf()
});
//botão reiniciar jogo volta para tela de configurações
bRestart.addEventListener('click',function(){
    gameplay = false;
    gamerconfig.style.display = 'flex';
    music.pause();
    if (placar[1]>placar[0]) {
        winssong.play();
    }else{
        oversong.play();
    }
    clearInterval(finterval);
});
//pressionar teclas
document.addEventListener('keydown',function(e){
    //ação somente se jogo iniciado
    if (gameplay){
        const key = e.key;
        console.log(key)
        switch (key){
            //se digita um numero seleciona um jogador em campo
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                if (playac) algar[playac].classList.toggle('enf');
                playac = Number.parseInt(key);
                playactiv.innerHTML = key;
                algar[playac].classList.toggle('enf');
            break;
            //se direcional move o jogador selecionado
            case direcbt.left:
            case direcbt.left.toUpperCase():
                if (playac && positions.algar[playac].x>LIMITS.left){
                    positions.algar[playac].x -= 1;
                }
            break;
            case direcbt.right:
            case direcbt.right.toUpperCase():
                if (playac && positions.algar[playac].x<LIMITS.right){
                    positions.algar[playac].x += 1;
                }
            break;
            case direcbt.up:
            case direcbt.up.toUpperCase():
                if (playac && positions.algar[playac].y>LIMITS.top){
                    positions.algar[playac].y -= 1;
                }
            break;
            case direcbt.down:
            case direcbt.down.toUpperCase():
                if (playac && positions.algar[playac].y<LIMITS.down){
                    positions.algar[playac].y += 1;
                }
            break;
            //se < ou > rotaciona o vetor do chute
            case "<":
            case ",":
                if (direc > -90) {
                    direc -= 2;
                    arrow.style.transform = "rotate("+direc+"deg)";
                }
            break;
            case ">":
            case ".":
                if (direc < 90) {
                    direc += 2;
                    arrow.style.transform = "rotate("+direc+"deg)";
                }
            break;
        }
    }
});
