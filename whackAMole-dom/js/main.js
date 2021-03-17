//alert('whack');

let clickers = 50;
let clicks = 0;
let time = 20;
let i = 0;
let lost = false;
let startTime = Date.now();
document.querySelector('#remain').innerHTML = clicks +"/"+ clickers;
document.querySelector('#count').innerHTML = time;

document.getElementById('start').addEventListener("click", function() {
    //Start game
    
    //Clear button
    document.getElementById('start').remove();
    document.getElementById('title').remove();
    //Add moles
    for (i; i < clickers; i++){
        if (lost == false){
            task(i);
        }
    }
    
    let x = setInterval(function() {
        if (time <= 0){
            i = 0;
            alert('You lose!');
            clearInterval(x);
            lost = true;
        } else{
            time--; 
            document.querySelector('#count').innerHTML = time;
        }
    },1000);
});

function task(i){
    setTimeout(function() { 
      addClicker();
    }, 300 * i);
}

//position element in Dom
function sync(dom, pos){
    dom.style.left = `${pos.x}px`;
    dom.style.top = `${pos.y}px`;
}

//Creates a new mole and assigns a screen position randomly
function addClicker(){
    const pos = {
      x:Math.random() *500,
      y:Math.random() *300
    };
    
    
    const img = new Image();
    img.src = "images/mole.gif";
    img.style.position = "absolute";
    img.addEventListener("click", removeClicker, false);
    
    document.getElementById('board').appendChild(img);
    document.getElementById('mouse').play();
    sync(img, pos);
}

function removeClicker(e){
    e.target.parentNode.removeChild(e.target);
    document.getElementById('agh').play();
    clickers--;
    clicks++;
    checkGameOver();
}

function checkGameOver(){
    document.querySelector('#remain').innerHTML = clickers+' to go';
    if (clickers === 0 && lost == false){
        const taken = Math.round((Date.now() - startTime)/1000);
        alert(`De-moled in ${taken} seconds`);
    } else if (lost == true){
        alert(`Lost mole game`);
    }
}