var worldTxt=`
🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤
🟤🟤🟤🟢🟢🟢🟢🟢🟢🟤
🟤🔥🟢🟢🟢🟢🟢😀🟤🟤
🟢🟢🟢🟢🟤🟤🟤🟤🟤🟤
`;
var WORLD=worldTxt.split("\n")//.map(x=>emojiStringToArray(x));
WORLD=WORLD.map(x=>emojiStringToArray(x));



function render(){
  document.getElementById("gameBoard").innerHTML="";
  for(var i=0;i<WORLD.length;i++){
    document.getElementById("gameBoard").innerHTML+=WORLD[i].join("");
    document.getElementById("gameBoard").innerHTML+="<br>"
  }
}





// function render(){
//   document.getElementById("gameBoard").innerHTML="";
//   for(var i=0;i<HEIGHT;i++){
//     for(var j=0;j<WIDTH;j++){
//       document.getElementById("gameBoard").innerHTML+=WORLD[i][j];
//     }
//     document.getElementById("gameBoard").innerHTML+="<br>";
//   }
// }


function emojiStringToArray(str) {
  if(!str||(typeof str!="string")||str.str==""){
    return [];
  }
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i=0; i<split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
};
