function changeColor(){
    let red = document.getElementById('redR').value;
    console.log('teste');
    let green = document.getElementById('greenR').value;
    let blue = document.getElementById('blueR').value;
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    console.log(red);
    console.log(color);
    document.body.style.backgroundColor = color;
    document.getElementById('ColorOutput').innerHTML = ': ' + color;
  }
  document.getElementById('redR').addEventListener('input',changeColor);
  document.getElementById('greenR').addEventListener('input',changeColor);
  document.getElementById('blueR').addEventListener('input',changeColor);

  var data = [ 16, 68, 20, 30, 54, 100, 50 ];
      var canvas = document.getElementById('canvas');
      var c = canvas.getContext('2d'); 
      c.fillStyle = "gray"; 
      c.fillRect(0,0,800,600); 
      for(var i=0;i<300;i++){
        var R = Math.floor(Math.random()*255);
        var G = Math.floor(Math.random()*255);
        var B = Math.floor(Math.random()*255);
        c.fillStyle = 'rgb('+R+','+G+','+B+')';
        c.fillRect(i,i,800-2*i,600-2*i);
      }
      for(var i=0; i<data.length; i++) { 
        var dp = data[i]; 
        c.fillRect(25 + i*60, 600-dp*5 - 30, 50, dp*5); 
      } 