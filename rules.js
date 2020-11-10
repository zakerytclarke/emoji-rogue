var ruleTxt=`
🔥🟢
=
🔥🔥
|
🟤🔥
;
🟢
🔥
=
🔥
🔥
|
🟤
🔥
;
🟢🔥
=
🔥🔥
|
🔥🟤
;
🔥
🟢
=
🔥
🔥
|
🔥
🟤
;
🔥
=
🟤
|
🔥
|
🔥
;
🔥🧟
=
🔥🔥
|
🔥🧟
;
🔥😨
=
🔥☠️
;
🔥😕
=
🔥😨
;
🔥😐
=
🔥😕
;
🔥😀
=
🔥😐
;
😨🧟
=
☠️🧟
;
😐🧟
=
😨🧟
;
😀🧟
=
😐🧟
;
🧟😨
=
🧟☠️
;
🧟😐
=
🧟😨
;
🧟😀
=
🧟😐
;



😀🟤🧟
=
😀🧟🟤
;
😐🟤🧟
=
😐🧟🟤
;
😨🟤🧟
=
😨🧟🟤
;
🧟🟤😀
=
🟤🧟😀
;
🧟🟤😐
=
🟤🧟😐
;
🧟🟤😨
=
🟤🧟😨
;
`;


// var ruleTxt=`
// 🔥🟢
// =
// 🔥🔥
// |
// 🟤🔥
// ;
// `;

var RULES=ruleTxt.split(";").map(x=>x.split("=").map(y=>y.split("|").map(z=>z.split("\n").filter(x=>x!="")))).map(function(x){//Collapse righthand side
  return [x[0][0],x[1]];
});
RULES.pop();

//Easier parsing
RULES=RULES.map(function(x){
  x[0]=x[0].map(function(y){
    return emojiStringToArray(y);
  })
  x[1]=x[1].map(function(y){
    y=y.map(function(z){
      return emojiStringToArray(z);
    })
    return y;
  })

  return x;
})

//console.log(RULES);

var NEWWORLD;


function iterate(){
  NEWWORLD=JSON.parse(JSON.stringify(WORLD));//Copy Array
  //For every Rule
  RULES.map(function(x){
    for(var i=0;i<WORLD.length;i++){
      for(var j=0;j<WORLD[i].length;j++){
        if(checkRule(x,i,j)){//Found Match, replace
          //Pick a random replacement;
          var rnd=x[1][Math.floor(Math.random()*x[1].length)];
          replaceWorld(rnd,i,j);
        }
      }
    }
  })

  WORLD=JSON.parse(JSON.stringify(NEWWORLD));//Replace


  // RULES.map(function(x){
  //   var match=x[0];
  //   var repl=x[1];
  //   //console.log(match);
  //   for(var i=0;i<WORLD.length;i++){
  //     var index=WORLD[i].indexOf(match[0]);
  //     var patterns=[];
  //     var strs=[];
  //     for(var j=0;j<match.length;j++){//For all lines of pattern
  //       patterns.push(match[j]);
  //       strs.push(WORLD[i+j]);
  //       var replaceIts=getIndices(patterns,strs);
  //     //  console.log(replaceIts);
  //     }
  //
  //     // if(index!=-1){//Found Match
  //     //   var rnd=Math.floor(Math.random()*repl.length);
  //     //   WORLD[i]=WORLD[i].replace(match,repl[rnd]);
  //     // }
  //   }
  // })
}

function replaceWorld(pattern,i,j){
  var dimX=pattern[0].length;
  var dimY=pattern.length;
  console.log(pattern,dimX,dimY);
  for(var a=0;a<dimX;a++){
    for(var b=0;b<dimY;b++){
      NEWWORLD[i+a][j+b]=pattern[b][a];
    }
  }
}

function getIndices(patterns,strs){
  console.log(strs,patterns)
  var out=[];
  var temps=[];
  for(var i=0;i<patterns.length;i++){//Find all matching indices
    var temp=[];
    var offset=0;
    while(strs[i].indexOf(patterns[i],offset)!=-1){
      var to=strs[i].indexOf(patterns[i],offset);
      temp.push(to);
      offset=to+1;
    }
    temps.push(temp)
  }

  if(temps.length==1){
    return temps;
  }

  for(var i=0;i<temps[0].length;i++){//Check all indices in first
    var bool=true;
    for(var j=0;j<temps.length;j++){//Check all others
      if(!temps[j].includes(temps[0][i])){
        bool=false;
      }
    }
    if(bool){
      out.push(temps[0][i]);
    }
  }

  return out;
}



function checkRule(rule,i,j){
  var match=rule[0];
  var dimX=rule[0][0].length;
  var dimY=rule[0].length;
  var extract=[];
  for(var a=0;a<dimY;a++){
    var temp=[];
    for(var b=0;b<dimX;b++){
      var tile=WORLD[i+b][j+a];
      if(!tile){
        return false;
      }
      temp.push(tile);
    }
    extract.push(temp);
  }
  if(checkArr(match,extract)){
    return true;
  }else{
    return false;
  }



}
function checkArr(a1,a2){
    return JSON.stringify(a1)==JSON.stringify(a2);
    if(a1.length!=a2.length){
      return false;
    }
    for(var i=0;i<a1.length;i++){
      if(typeof a1[i] == "object"){
        if(typeof a2[i] == "object"){
          if(checkArr(a1[i],a2[i])==false){
            return false;
          }
        }else{
          return false;
        }
      }else{
        if(a1!=a2){
          return false;
        }
      }
    }
    return true;
}
