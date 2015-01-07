Quintus.GameSprites = function(Q){
  
  Q.Sprite.extend("Player", OBEZOS.sprites.player);
  Q.animations("postman", OBEZOS.sprites.player.animations);

  Q.Sprite.extend("OBEZOS", OBEZOS.sprites.OBEZOS);

  Q.Sprite.extend("Drone", OBEZOS.sprites.drone);
  Q.animations("drone", OBEZOS.sprites.drone.animations);

  Q.Sprite.extend("Box", OBEZOS.sprites.box);
  Q.animations("box", OBEZOS.sprites.box.animations);
  
  Q.Sprite.extend("Bullet", OBEZOS.sprites.bullet);
  
};