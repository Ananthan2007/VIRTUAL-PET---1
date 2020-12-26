var dog;
var database;
var foodS, foodStock;
var dogimg, happyDogimg;

function preload(){
                  
   dogimg = loadImage("images/dogImg.png");
   happyDogimg = loadImage("images/dogImg1.png");


}

function setup() {
  createCanvas(500, 500)
  database = firebase.database()
  foodStock = database.ref("Food");
  foodStock.on("value",readStock,writeStock);
  foodStock.set(20)

  dog = createSprite(250,350,10,60)
  dog.addImage(dogimg)
  dog.scale = 0.2;
}


function draw() {  
  background(46,139,87);
   fill(225)
   text("Note : Press UP_ARROW Key To Feed Drago Milk!",120,20)
   textSize(20)
   text("Food remaining : "+foodS,150,200)

   if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogimg)

   }

   if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimg)
   }
   drawSprites();

}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }else{
    x = x-1;
  }

 database.ref('/').update({
    Food : x
  })

}

function readStock(data){
  foodS = data.val();
}

