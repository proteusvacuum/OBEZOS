Quintus.GameFunctions = function(Q){

  Q.addScore = function(amount){
    Q.state.inc("score", amount);
    Q.addText("Score!");
  };

  Q.addText = function (label, timeout) {
    var text = new Q.UI.Text({
      label: label,
      x: Q.width / 2,
      y: (Q.height / 2) + 33
    });
    
    text.add("tween");

    setTimeout(function(){
      text.destroy();
    }, timeout || 1000 );

    Q.stage(1).insert(text);

    text.animate({y:text.p.y-200});
  };
  
};