render();
iterate();
setInterval(function(x){
  iterate();
  render();
},1000)
