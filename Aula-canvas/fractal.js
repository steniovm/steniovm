var mycanvas = document.getElementById('fractal');
var c = mycanvas.getContext('2d'); 
function draw(startX, startY, len, angle, branchWidth) {
  var R = Math.floor(Math.random()*255);
  var G = Math.floor(Math.random()*255);
  var B = Math.floor(Math.random()*255);
  c.lineWidth = branchWidth;
  c.beginPath();
  c.save();
  c.strokeStyle = 'rgb('+R+','+G+','+B+')';
  c.fillStyle = 'rgb('+R+','+G+','+B+')';
  c.translate(startX, startY);
  c.rotate(angle * Math.PI/180);
  c.moveTo(0, 0);
  c.lineTo(0, -len);
  c.stroke();
  c.shadowBlur = 15;
  c.shadowColor = "rgba(0,0,0,0.8)";
  if(len < 5) {
    c.restore();
    return;
  }
  draw(0, -len, len*0.8, angle-15, branchWidth*0.8);
  draw(0, -len, len*0.8, angle+15, branchWidth*0.8);
  c.restore();
}
draw(400, 600, 120, 0);
 