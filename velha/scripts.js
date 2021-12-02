//constantes

//Variaveis Globais - referencias aos elementos
let playgamer = document.getElementById("playgamer");
let champ = document.getElementById("champ");
let bboard = document.querySelectorAll(".buttonboard");
let state = 'O';//variavel de estado - 'O' = vez do jogador O - 'X' = vez do jogador X - 'F' = Jogo finalizado
let boardstate = [['-','-','-'],
                  ['-','-','-'],
                  ['-','-','-']];//matriz do jogo

//preenchimento dos elementos
function updateboard(){
    for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            bboard[i+(3*j)].innerHTML=boardstate[i][j];
        }
    }
}
//marcar posição
function markposition(posit){
    let ph = posit % 3;//posição horizontal
    let pv = (posit - ph)/3;//posição vertical
    let tempchamp = state;
    //marca a jogada
    if (state=='O'){
        if(boardstate[pv][ph]=='-'){
            boardstate[pv][ph]='O';
            bboard[posit].innerHTML='O';
            if (verfinsh()){
                state='F';
            }else{
                state='X';
                playgamer.innerHTML=state;
            }
        }

    }else if(state=='X'){
        if(boardstate[pv][ph]=='-'){
            boardstate[pv][ph]='X';
            bboard[posit].innerHTML='X';
            if (verfinsh()){
                state='F';
            }else{
                state='O';
                playgamer.innerHTML=state;
            }
        }
    }
    //quando o jogo termina
    if (state=='F'){
        champ.innerHTML=tempchamp;
        if(tempchamp=='F' || tempchamp=='VELHA'){
            resetgame();
        }
    }
    if(vervelha()){
        champ.innerHTML='VELHA';
        playgamer.innerHTML='VELHA';
        state='F';
    }
}

function verfinsh(){
    let test = false;
    //teste horizontal e vertical
    for(let i=0;i<3;i++){
        //teste horizontal
        if(boardstate[i][0]==state &&
            boardstate[i][1]==state &&
            boardstate[i][2]==state){
                test = true;
            }
        //teste vertical
        if(boardstate[0][i]==state &&
            boardstate[1][i]==state &&
            boardstate[2][i]==state){
                test = true;
            }
    }
    //teste diegonal
    if((boardstate[0][0]==state &&
        boardstate[1][1]==state &&
        boardstate[2][2]==state) ||
       (boardstate[2][0]==state &&
        boardstate[1][1]==state &&
        boardstate[0][2]==state)){
            test = true;
        }
    return test;
}
function vervelha(){
    let test=true;
    if(!verfinsh()){
        for(let i=0;i<3;i++)
        for(let j=0;j<3;j++){
            if(boardstate[i][j]=='-'){
                test=false;
            }
        }
    }
    return test;
}

function resetgame(){
    boardstate = [['-','-','-'],
                  ['-','-','-'],
                  ['-','-','-']];
    state = 'O';
    updateboard();
    champ.innerHTML='';
    playgamer.innerHTML=state;
}
//chamadas das funções
updateboard();

//eventos
for (let i=0;i<9;i++)
    bboard[i].addEventListener('click',function (){markposition(i)});