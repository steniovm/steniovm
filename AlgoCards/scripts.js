let teste

//variaveis e constantes globais
const board = document.getElementById("board");
const ctx = board.getContext("2d");
const cellSize = 30;
let countinstruct = 0;
let typegame = "";//tipo de jogo escolhido
let seqcards=[];//sequencia de instruções
let person = {px:0,py:0,dx:0,dy:1};//personagem, posição e direção que está virado

//funções referentes ao drag and drop
function dropCopy(ev){
    ev.preventDefault();
    if(ev.toElement.id=="algol"){
        let id = ev.dataTransfer.getData("text");
        let nodeCopy = document.getElementById(id).cloneNode(true);
        nodeCopy.id = "intr"+countinstruct++;
        ev.currentTarget.style.background = "transparent";
        ev.target.appendChild(nodeCopy);
    }
}
function deleteitem(itemid){
    if(itemid.composedPath()[1].id == "algol"){
        document.getElementById(itemid.composedPath()[0].id).remove()
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
        break;
        case "btACL":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        case "btACM":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        case "btACR":
            for( let i=0; i<cards.length; i++){
                cards[i].classList.remove('notinst');
            }
            document.getElementById('modalboard').classList.add('modalnone');
        break;
        case "btACZ":
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
        default:
            for( let i=0; i<cards.length; i++){
                if (i==1||i==3||i==6||i==7||i==11||i==12||i==13){
                    cards[i].classList.add('notinst');
                }else{
                    cards[i].classList.remove('notinst');
                }
            }
        break;
    }
}

//desenha grido no tabuleiro
function drawGrid(){
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
drawGrid();
//funções de cada card
function gireEsquerda(){
    this.img = "url('imgs/gireEsquerda.png');";
    this.rum = function(per){
        this.dx = -per.dy;
        this.dy = per.dx;
        per.dx = this.dx;
        per.dy = this.dy;
        return per
    }
    return "Gire Esquerda"
}
function gireDireita(){
    this.img = "url('imgs/gireDireita.png');";
    this.rum = function(per){
        this.dx = per.dy;
        this.dy = -per.dx;
        per.dx = this.dx;
        per.dy = this.dy;
        return per
    }
    return "Gire Direita"
}
function girDireita(angulo){
    this.radianos = angulo * Math.PI / 180;
    this.rum = function (per){
        this.dx = per.dx * Math.cos(this.radianos) - per.dy * Math.sin(this.radianos);
        this.dy = per.dx * Math.sin(this.radianos) + per.dy * Math.cos(this.radianos);
        per.dx = this.dx;
        per.dy = this.dy;
        return per
    }
    return "Gire "+angulo+"graus para Direita"
}
function girEsquerda(angulo){
    this.radianos = angulo * Math.PI / 180;
    this.rum = function (per){
        this.dy = per.dx * Math.cos(this.radianos) - per.dy * Math.sin(this.radianos);
        this.dx = per.dx * Math.sin(this.radianos) + per.dy * Math.cos(this.radianos);
        per.dx = this.dx;
        per.dy = this.dy;
        return per;
    }
    return "Gire "+angulo+"graus para Esquerda"
}
function meiaVolta(){
    this.rum = function(per){
        this.dx = -per.dx;
        this.dy = -per.dy;
        per.dx = this.dx;
        per.dy = this.dy;
        return per;
    }
    return "Gire Direita"
}
function paraFrente(){
    this.rum = function(per){
        per.px += per.dx;
        per.py += per.dy;
        return per;
    }
    return "Passo pra Frente"
}
function paraTras(){
    this.rum = function(per){
        per.px -= per.dx;
        per.py -= per.dy;
        return per;
    }
    return "Passo pra Tras"
}
function paraEsquerda(){
    this.rum = function(per){
        per.px += per.dy;
        per.py += per.dx;
        return per;
    }
    return "Passo pra Esquerda"
}
function paraDireita(){
    this.rum = function(per){
        per.px -= per.dy;
        per.py -= per.dx;
        return per;
    }
    return "Passo pra Direita"
}
function coringa(){
    this.rum = function(per){
        alert("CORINGA");
        return per;    
    }
    return "CORINGA"
}
function acao(text){
    this.text = text
    this.rum = function(per){
        alert(this.text.toUpperCase());
        return per;    
    }
    return "AÇÂO"
}
function repita(){
    //a fazer
}
function abreBloco(){
    //a fazer
}
function fechaBloco(){
    //a fazer
}

// executa o algoritimo do usuario
function playAlgo(){
    //configura modals
    switch (typegame){
        case "btACF":
        case "btACR":
            document.getElementById('modalboard').classList.add('modalimg');
        break;
        case "btACL":
        case "btACM":
        case "btACZ":
            document.getElementById('modalboard').classList.add('modalplay');
        break;
        default:
            document.getElementById('modalboard').classList.remove('modalplay');
            document.getElementById('modalboard').classList.remove('modalimg');
        break;
    }
    //preencher o vetor seqcards
    let nodes = document.getElementById('algol').childNodes;
    for(let i=0; i<nodes.length; i++){
        let param = nodes[i].children[0] ? nodes[i].children[0].value : "";
        let inst = new (eval(nodes[i].attributes.name.nodeValue))(param);
        seqcards.push(inst);
    }
    //executar o seqcards
    console.log(person)
    seqcards.forEach((item) => {
        person = item.rum(person);
        console.log(person)
    })

}

//função reiniciar
function restart(){
    countinstruct = 0;
    typegame = "";
    seqcards=[];
    person = {px:0,py:0,dx:0,dy:1};
    document.getElementById('modalinit').style.display = "flex";
    document.getElementById('modalboard').classList.remove('modalnone');
    let cards = document.getElementsByClassName('instruction')
    for( let i=0; i<cards.length; i++){
        cards[i].classList.remove('notinst');
    }
    document.getElementById('modalboard').classList.remove('modalplay');
    document.getElementById('modalboard').classList.remove('modalimg');
    let nodes = document.getElementById('algol').childNodes;
    for(let i=0; i<nodes.length; i){
        nodes[0].remove();
    }
}

/*
as opções de jogo serão:
btACF - livre - não mostra tabuleiro, somente sequencia
btACL - AlgoLabirinto - percorrer um caminho
btACM - AlgoMovimento - fazer um desenho
btACR - AlgoRitmo - Coreografia
btACZ - Algozumbi - tiro e labirinto
*/