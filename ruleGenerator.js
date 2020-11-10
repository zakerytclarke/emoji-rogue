var RULESTXT="";

RULESTXT+=new Rule(`🔥🟢\n🔥🟢`,`🔥🔥\n🔥🔥`).rotations().render();




function Rule(i,o,template){
  this.input=i;
  this.output=o;
  this.rotations=function(){

  }
  this.render()=function{
    return this.txt;
  }
}
