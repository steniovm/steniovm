let teste

//variaveis e constantes globais
const board = document.getElementById("board");
const ctx = board.getContext("2d");
const cellSize = board.width/11;
const dropsong = new Audio("songs/drop.wav");
const bgmusic = new Audio("songs/jigsaw-puzzle-background.mp3");
const stepsong = new Audio("songs/plasterbrain__ui-cute-select-major-6th.flac");
const personimg = document.createElement('img');
personimg.src="imgs/person.png";
bgmusic.loop = true;
bgmusic.volume = 0.5;
let countinstruct = 0;
let speed = (document.getElementById("inspeed").max - document.getElementById("inspeed").value +200);
let interval;
let typegame = "";//tipo de jogo escolhido
let seqcards=[];//sequencia de instruções
let person = {px:0,py:0,dx:0,dy:1,ag:0};//personagem, posição e direção que está virado

//controles de volume
document.getElementById('mute-audio').addEventListener('click',()=>{
    dropsong.volume = 0;
    bgmusic.volume = 0;
    stepsong.volume = 0;
});
document.getElementById('down-audio').addEventListener('click',()=>{
    if (dropsong.volume > 0) dropsong.volume -= 0.1;
    if (bgmusic.volume > 0) bgmusic.volume -= 0.1;
    if (stepsong.volume > 0) stepsong.volume -= 0.1;
});
document.getElementById('up-audio').addEventListener('click',()=>{
    if (dropsong.volume < 1) dropsong.volume += 0.1;
    if (bgmusic.volume < 1) bgmusic.volume += 0.1;
    if (stepsong.volume < 1) stepsong.volume += 0.1;
});
document.getElementById('max-audio').addEventListener('click',()=>{
    dropsong.volume = 1;
    bgmusic.volume = 1;
    stepsong.volume = 1;
});

//funções referentes ao drag and drop
function dropCopy(ev){
    ev.preventDefault();
    if(ev.toElement.id=="algol"){
        let id = ev.dataTransfer.getData("text");
        let nodeCopy = document.getElementById(id).cloneNode(true);
        nodeCopy.id = "intr"+countinstruct++;
        ev.currentTarget.style.background = "transparent";
        ev.target.appendChild(nodeCopy);
        dropsong.play();
    }
}
function deleteitem(itemid){
    if(itemid.composedPath()[1].id == "algol"){
        document.getElementById(itemid.composedPath()[0].id).remove();
        dropsong.play();
    }
}
function dragoverhandler(ev) {
 ev.currentTarget.style.background = "lightblue";
 ev.preventDefault();
}
function dragstarthandler(ev) {
 ev.currentTarget.style.border = "dashed 1px silver";
 ev.dataTransfer.setData("text", ev.target.id); 
}

//configura velocidade do jogo (somente quando se escolhe tipo ritimo)
function changespeed(){
    speed = (document.getElementById("inspeed").max - document.getElementById("inspeed").value +200);
}
//configuração do tipo de jogo escolhido
function initgame(ev){
    typegame = ev.target.id
    document.getElementById('modalinit').style.display = "none";
    let cards = document.getElementsByClassName('instruction')
    switch (typegame){
        case "btACF":
            for( let i=0; i<cards.length; i++){
                cards[i].classList.remove('notinst');
            }
            document.getElementById('modalboard').classList.add('modalnone');
            document.getElementById('modalboard').classList.remove('modalshow');
        break;
        case "btACL":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
            document.getElementById('modalboard').classList.remove('modalnone');
            document.getElementById('modalboard').classList.add('modalshow');
        break;
        case "btACM":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
            document.getElementById('modalboard').classList.remove('modalnone');
            document.getElementById('modalboard').classList.add('modalshow');
            drawInCanva();
        break;
        case "btACR":
            for( let i=0; i<cards.length; i++){
                cards[i].classList.remove('notinst');
            }
            document.getElementById('modalboard').classList.add('modalnone');
            document.getElementById("inspeed").classList.remove("inspeed");
            document.getElementById('modalboard').classList.remove('modalshow');
        break;
        case "btACZ":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
            document.getElementById('modalboard').classList.remove('modalnone');
            document.getElementById('modalboard').classList.add('modalshow');
        break;
        default:
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
            document.getElementById('modalboard').classList.remove('modalnone');
        break;
    }
    bgmusic.play();
}

//desenha gride no tabuleiro
function drawGrid(){
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, board.width, board.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    // Desenha as linhas horizontais do grid
  for (let y = 0; y <= board.height; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(board.width, y);
    ctx.stroke();
  }
    // Desenha as linhas verticais do grid
  for (let x = 0; x <= board.width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, board.height);
    ctx.stroke();
  }
}
//apaga celula do tabuleiro
function clearCell(){
    const px = (board.width/2)+(cellSize*person.px)-(personimg.width/2);
    const py = (board.height/2)-(cellSize*person.py)-(personimg.height/2);
    ctx.fillStyle = "#f5f5f5b0";
    ctx.fillRect(px+1, py+1, cellSize-2, cellSize-2);
    return {px,py};
}
//imprime personagem no tabuleiro
function drawPerson(){
    console.log(person);
    const px = (board.width/2)+(cellSize*person.px)-(personimg.width/2);
    const py = (board.height/2)-(cellSize*person.py)-(personimg.height/2);
    const cx = (board.width/2)+(cellSize*person.px);
    const cy = (board.height/2)-(cellSize*person.py);
    ctx.translate(cx,cy);
    ctx.rotate(person.ag);
    ctx.translate(-cx,-cy);
    ctx.drawImage(personimg,px,py);
    ctx.translate(cx,cy);
    ctx.rotate(-person.ag);
    ctx.translate(-cx,-cy);
    return {px,py};
}
drawGrid();
//drawPerson();
//funções de cada card
function gireEsquerda(){
    this.rum = function(per){
        this.dx = -per.dy;
        this.dy = per.dx;
        per.dx = this.dx;
        per.dy = this.dy;
        per.ag -= Math.PI/2;
        return per;
    }
    this.imgcard = function(){
         return 'imgs/gireEsquerda.png';
    }
    return "Gire Esquerda"
}
function gireDireita(){
    this.rum = function(per){
        this.dx = per.dy;
        this.dy = -per.dx;
        per.dx = this.dx;
        per.dy = this.dy;
        per.ag += Math.PI/2;
        return per
    }
    this.imgcard = function(){
        return 'imgs/gireDireita.png';
    }
    return "Gire Direita"
}
function girDireita(angulo){
    this.angulo = angulo;
    this.radianos = (this.angulo * Math.PI / 180);
    console.log(this.radianos);
    this.rum = function (per){
        this.dx = (per.dx * Math.cos(this.radianos) + per.dy * Math.sin(this.radianos));
        this.dy = -(per.dx * Math.sin(this.radianos) - per.dy * Math.cos(this.radianos));
        per.dx = this.dx;
        per.dy = this.dy;
        per.ag += this.radianos;
        return per
    }
    this.imgcard = function(){
            document.getElementById("currentAction").innerHTML = this.angulo+"º¬>";
        return 'imgs/girDireita.png';
    }
    return "Gire "+angulo+"graus para Direita"
}
function girEsquerda(angulo){
    this.angulo = angulo;
    this.radianos = -(this.angulo * Math.PI / 180);
    this.rum = function (per){
        this.dx = (per.dx * Math.cos(this.radianos) + per.dy * Math.sin(this.radianos));
        this.dy = -(per.dx * Math.sin(this.radianos) - per.dy * Math.cos(this.radianos));
        per.dx = this.dx;
        per.dy = this.dy;
        per.ag += this.radianos;
        return per;
    }
    this.imgcard = function(){
        document.getElementById("currentAction").innerHTML = "<¬"+this.angulo+"º";
        return 'imgs/girEsquerda.png';
    }
    return "Gire "+angulo+"graus para Esquerda"
}
function meiaVolta(){
    this.rum = function(per){
        this.dx = -per.dx;
        this.dy = -per.dy;
        per.dx = this.dx;
        per.dy = this.dy;
        per.ag += Math.PI;
        return per;
    }
    this.imgcard = function(){
        return 'imgs/meiaVolta.png';
    }
    return "Gire Direita"
}
function paraFrente(){
    this.rum = function(per){
        per.px += per.dx;
        per.py += per.dy;
        return per;
    }
    this.imgcard = function(){
        return 'imgs/paraFrente.png';
    }
    return "Passo pra Frente"
}
function paraTras(){
    this.rum = function(per){
        per.px -= per.dx;
        per.py -= per.dy;
        return per;
    }
    this.imgcard = function(){
        return 'imgs/paraTras.png';
    }
    return "Passo pra Tras"
}
function paraEsquerda(){
    this.rum = function(per){
        per.px += per.dy;
        per.py += per.dx;
        return per;
    }
    this.imgcard = function(){
        return 'imgs/paraEsquerda.png';
    }
    return "Passo pra Esquerda"
}
function paraDireita(){
    this.rum = function(per){
        per.px -= per.dy;
        per.py -= per.dx;
        return per;
    }
    this.imgcard = function(){
        return 'imgs/paraDireita.png';
    }
    return "Passo pra Direita"
}
function coringa(){
    this.rum = function(per){
        alert("CORINGA");
        return per;    
    }
    this.imgcard = function(){
        return 'imgs/coringa.png';
    }
    return "CORINGA"
}
function acao(text){
    this.text = text
    this.rum = function(per){
        alert(this.text.toUpperCase());
        return per;    
    }
    this.imgcard = function(){
        document.getElementById("currentAction").innerHTML = this.text;
        return 'imgs/acao.png';
    }
    return "AÇÂO"
}

// executa o algoritimo do usuario
function playAlgo(){
    //preencher o vetor seqcards
    let nodes = document.getElementById('algol').childNodes;
    let nodeslist = [];
    let opemclouseBlock = 0
    for(let i=0; i<nodes.length; i++){
        let param = nodes[i].children[0] ? nodes[i].children[0].value : "";
        if (nodes[i].attributes.name.nodeValue == "abreBloco") {
            opemclouseBlock++;
        }else if(nodes[i].attributes.name.nodeValue == "fechaBloco") {
            opemclouseBlock--;
        }
        if (opemclouseBlock < 0){
            alert('Não é possivel fechar ")" um bloco de codigo não aberto "("');
            restart();
            return;
        }
        nodeslist.push({func:nodes[i].attributes.name.nodeValue , param: param});
    }
    if (opemclouseBlock != 0){
        alert('Todos os blocos de codigo aberto "(" devem ser fechados ")"');
        restart();
        return;
    }
    //compila o seqcards
    seqcards.push(...(writeInst(nodeslist,0)));
    //configura modals e executar o seqcards
    seqcards = rumInstF(seqcards);
    countinstruct = 0;
        switch (typegame){
            case "btACF":
                document.getElementById('modalboard').classList.add('modalimg');
                document.getElementById("btnext").addEventListener('click',rumInstFF);
                rumInstFF();
            break;
            case "btACL":
                document.getElementById('modalboard').classList.add('modalplay');
                clearCell();
                drawPerson();
                document.getElementById("btnext").addEventListener('click',rumInstM);
                interval = setInterval(rumInstM,1000);
            break;
            case "btACM":
                document.getElementById('modalboard').classList.add('modalplay');
                clearCell();
                drawPerson();
                document.getElementById("btnext").addEventListener('click',rumInstM);
                interval = setInterval(rumInstM,1000);
            break;
            case "btACR":
                document.getElementById('modalboard').classList.add('modalimg');
                document.getElementById("btnext").addEventListener('click',rumInstFF);
                document.getElementById("currentAction").innerHTML = "Preparar";
                document.getElementById("currentAction").style = `background-image: none;`;
                interval = setInterval(rumInstFF,speed);
            break;
            case "btACZ":
                document.getElementById('modalboard').classList.add('modalplay');
                clearCell();
                drawPerson();
                document.getElementById("btnext").addEventListener('click',rumInstM);
                interval = setInterval(rumInstM,1000);
            break;
            default:
                document.getElementById('modalboard').classList.remove('modalplay');
                document.getElementById('modalboard').classList.remove('modalimg');
            break;
        }
}

//compila a sequencia de operações
function writeInst(nodeslist, start){
    let position = start;
    let repite = 0;
    let listfunc = [];
    while(nodeslist.length>position){
        let ins = nodeslist[position]
        switch(ins.func){
            case "gireEsquerda":
            case "paraEsquerda":
            case "paraFrente":
            case "paraDireita":
            case "gireDireita":
            case "meiaVolta":
            case "paraTras":
            case "coringa":
            case "girDireita":
            case "girEsquerda":
            case "acao":
                let inst = new (eval(ins.func))(ins.param);
                listfunc.push(inst);
                repite -= (repite>0)? 1 : 0;
                position += (repite>0)? 0 : 1;
            break;
            case "repita":
                position ++;
                repite = ins.param;
            break;
            case "abreBloco":
                let bl = writeInst(nodeslist,position+1);
                listfunc.push(bl);
                repite -= (repite>0)? 1 : 0;
                position += (repite>0)? 0 : (bl.length + 2);
            break;
            case "fechaBloco":
                return listfunc;
            break;
            default:
                console.log("instrução invalida");
                position++;
            break;
        }
    }
    return listfunc;
}

//função reiniciar
function restart(){
    countinstruct = 0;
    typegame = "";
    seqcards=[];
    person = {px:0,py:0,dx:0,dy:1,ag:0};
    drawGrid();
    document.getElementById('modalinit').style.display = "flex";
    document.getElementById('modalboard').classList.add('modalnone');
    document.getElementById("inspeed").classList.add("inspeed");
    clearInterval(interval);
    let cards = document.getElementsByClassName('instruction');
    bgmusic.pause();
    for( let i=0; i<cards.length; i++){
        cards[i].classList.remove('notinst');
    }
    document.getElementById('modalboard').classList.remove('modalplay');
    document.getElementById('modalboard').classList.remove('modalimg');
    document.getElementById('modalboard').classList.remove('modalshow');
    let nodes = document.getElementById('algol').childNodes;
    for(let i=0; i<nodes.length; i){
        nodes[0].remove();
    }
}

//executa a sequencia de operações
//btACF - livre - não mostra tabuleiro, somente sequencia de imagens
//btACR - AlgoRitmo - Coreografia
function rumInstF(seq){
    let sq = [];
    for(let i=0; i<seq.length; i++){
        if(Array.isArray(seq[i])){
            sq.push(...rumInstF(seq[i]));
        }else{
            sq.push(seq[i]);
        }
    }
    return sq;
}
function rumInstFF(){
    document.getElementById("currentAction").innerHTML = "";
    document.getElementById("currentAction").style = `background-image: url('${seqcards[countinstruct].imgcard()}');`
    stepsong.play();
    countinstruct = (countinstruct+1)%seqcards.length;
}
//btACM - AlgoMovimento - fazer um desenho
function rumInstM(){
    clearCell();
    person = seqcards[countinstruct].rum(person);
    drawPerson();
    rumInstFF();
}
//funções de desenhar no tabuleiro
function drawInCanva(){
    const n = Math.ceil(Math.random()*7);
    switch (n){
        case 1: drawCircle(); break;
        case 2: drawSquare(); break;
        case 3: drawTriangle(); break;
        case 4: drawRectTriangle(); break;
        case 5: drawLozenge(); break;
        case 6: drawHexagono(); break;
        case 7: drawLadder(); break;
    }
}
function drawCircle(){
    // Desenha um círculo
    ctx.beginPath();
    ctx.arc(165, 165, 120, 0, 2 * Math.PI);
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();  
  }
function drawSquare(){
    // Desenha um quadrado
    ctx.beginPath();
    ctx.moveTo(75, 75);
    ctx.lineTo(255, 75);
    ctx.lineTo(255, 255);
    ctx.lineTo(75, 255);
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
function drawTriangle(){
    // Desenha um Triâgulo Equilátero
    ctx.beginPath();
    ctx.moveTo(165, 45);
    ctx.lineTo(285, 255);
    ctx.lineTo(45, 255);
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
function drawRectTriangle(){
    // Desenha um Triâgulo Retângulo
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(315, 15);
    ctx.lineTo(15, 315);
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
function drawLozenge(){
    // Desenha um losângulo
    ctx.beginPath();
    ctx.moveTo(165, 15);
    ctx.lineTo(255, 165);
    ctx.lineTo(165, 315);
    ctx.lineTo(75, 165);
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
function drawHexagono(){
    // Desenha um hexágono
    const x = 165;
    const y = 165;
    const size = 120;
    ctx.beginPath();
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (let i = 1; i <= 6; i++) {
      ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
    }
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
function drawLadder(){
    // Desenha um losângulo
    ctx.beginPath();
    ctx.moveTo(165, 165);
    ctx.lineTo(195, 165);
    ctx.lineTo(195, 195);
    ctx.lineTo(225, 195);
    ctx.lineTo(225, 225);
    ctx.lineTo(255, 225);
    ctx.lineTo(255, 255);
    ctx.lineTo(285, 255);
    ctx.lineTo(285, 285);
    ctx.lineTo(315, 285);
    ctx.lineTo(315, 315);
    ctx.lineTo(15, 315);
    ctx.lineTo(15, 15);
    ctx.lineTo(45, 15);
    ctx.lineTo(45, 45);
    ctx.lineTo(75, 45);
    ctx.lineTo(75, 75);
    ctx.lineTo(105, 75);
    ctx.lineTo(105, 105);
    ctx.lineTo(135, 105);
    ctx.lineTo(135, 135);
    ctx.lineTo(165, 135);
    ctx.closePath();
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
/*
as opções de jogo serão:
btACF - livre - não mostra tabuleiro, somente sequencia
btACL - AlgoLabirinto - percorrer um caminho
btACM - AlgoMovimento - fazer um desenho
btACR - AlgoRitmo - Coreografia
btACZ - Algozumbi - tiro e labirinto
*/