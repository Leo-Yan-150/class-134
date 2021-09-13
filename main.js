img = ""
zstatus = "";
object=[];
r = 0;
g = 0;
b = 0;

function preload(){
img = loadImage('dog_cat.jpg');
}

function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting objects...";
}

function draw(){
image(video, 0, 0, 380, 380);


if(zstatus != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for(c = 0; c < object.length; c++){
        document.getElementById("status").innerHTML = "Status: object identified";
        document.getElementById("numberofobjects").innerHTML = "The number of objected are: " + object.length;

        fill(r,g,b);
        percent = floor(object[c].confidence*100);
        text(object[c].label + " " + percent + "%", object[c].x + 15, object[c].y + 15);
        noFill();
        stroke(r,g,b);
        rect(object[c].x, object[c].y, object[c].width, object[c].height);
    }
}
}

function modelLoaded(){
console.log("model has been loaded");
zstatus = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object = results;
}