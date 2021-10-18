var divcanvas = document.getElementById('divcanva');
var mycanvas = document.getElementById('animacao');
var c = mycanvas.getContext('2d');
var nbol = document.getElementById('numero').value;
var rbol = document.getElementById('raio').value;
c.width = mycanvas.offsetWidth;
c.height = mycanvas.offsetHeight;
var bolinhas = vetorbol(nbol);
//mostrarbol();
//inicio();

function changeColor(){
  let red = document.getElementById('redR').value;
  let green = document.getElementById('greenR').value;
  let blue = document.getElementById('blueR').value;
  let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
  divcanvas.style.backgroundColor = color;
  mycanvas.style.backgroundColor = 'rgb(' + (255-red) + ',' + (255-green) + ',' + (255-blue) + ')';
}

function bolinha(x,y,raio,r,g,b){
    this.x = x + Math.floor(Math.random()*10 - 5);
    this.y = y + Math.floor(Math.random()*10 - 5);
    this.ra = raio;
    this.r = r + Math.floor(Math.random()*10 - 5);
    this.g = g + Math.floor(Math.random()*10 - 5);
    this.b = b + Math.floor(Math.random()*10 - 5);
    this.dx = Math.random()*2 - 1;
    this.dy = Math.random()*2 - 1;
    this.mostrar = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.ra, 0, 2*Math.PI);
        c.fillStyle=('rgb('+this.r+','+this.g+','+this.b+')');
        c.fill();
    }
    this.mover = function(){
        if(this.x+this.dx>0 && this.x+this.dx<c.width){
            this.x = this.x + this.dx;
        }else{
            this.dx = -this.dx;
            this.x = this.x + this.dx;
        }
        if(this.y+this.dy>0 && this.y+this.dy<c.height){
            this.y = this.y+this.dy;
        }else{
            this.dy = -this.dy;
            this.y = this.y+this.dy;
        }
        this.mostrar();
    }

}

function vetorbol(){
    var bolinhas = [];
    for(var i=0; i<nbol; i++){
        var x = Math.floor(Math.random()*c.width);
        var y = Math.floor(Math.random()*c.height);
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        bolinhas.push(new bolinha(x,y,rbol,r,g,b));
    }
    return bolinhas;
}

function inicio(){
    bolinhas = vetorbol(nbol);
    for(i=0;i<nbol;i++){
        bolinhas[i].mostrar();
    }
    mostrarbol();
}

function mostrarbol(){
    c.clearRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(mostrarbol);
    for(i=0;i<nbol;i++){
        bolinhas[i].mover();
    }
}

function pinicio(){
    nbol = document.getElementById('numero').value;
    rbol = document.getElementById('raio').value;
}

function clicar(e){
    var mx = e.clientX - mycanvas.offsetLeft;
    var my = e.clientY + mycanvas.offsetTop - c.height;
    var mae = Math.floor(Math.random()*(nbol-1));
    console.clear;
    console.log("Posição do clique: "+ mx+","+my);
    for(i=0;i<nbol;i++){
        if((mx-bolinhas[i].x<(2*bolinhas[i].ra)) && (my-bolinhas[i].y<(2*bolinhas[i].ra))){
            bolinhas[i].x = bolinhas[mae].x + Math.floor(Math.random()*10 - 5);
            bolinhas[i].y = bolinhas[mae].y + Math.floor(Math.random()*10 - 5);
            bolinhas[i].r = bolinhas[mae].r + Math.floor(Math.random()*10 - 5);
            bolinhas[i].g = bolinhas[mae].g + Math.floor(Math.random()*10 - 5);
            bolinhas[i].b = bolinhas[mae].b + Math.floor(Math.random()*10 - 5);
            console.log('acertou');
            return;
        }else{console.log('errou');}
    }
}

document.getElementById('redR').addEventListener('input',changeColor);
document.getElementById('greenR').addEventListener('input',changeColor);
document.getElementById('blueR').addEventListener('input',changeColor);
document.getElementById('iniciar').addEventListener('click',inicio);
document.getElementById('iniciar').addEventListener('click',mostrarbol);
document.getElementById('iniciar').addEventListener('click',pinicio);
mycanvas.addEventListener('mouseup',clicar,true);

//var nbol = document.getElementById('numero').value;
//var rbol = document.getElementById('raio').value;