let board;
let score = 0;
let rows = 4;
let colums = 4;
high=localStorage.getItem("highScore") || 0;

window.onload =function() {
    setGame();
    updatehighscore(high);
}

function setGame(){
    board = [
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0]
    ]

    // board = [
    //     [2 ,2 ,2 ,2],
    //     [2 ,2 ,2 ,2],
    //     [4 ,4 ,8 ,8],
    //     [4 ,4 ,8 ,8]
    // ]



    for(let r = 0; r < rows ; r++ ){
        for(let c=0 ; c < colums ; c++ ){
            //<div id ="0-0"> <div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" +  c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<colums;c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }  
    let found =false;
    while(!found){
        //random r,c value
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*colums);

        if(board[r][c] == 0){
           board[r][c] = 2;
           let tile = document.getElementById(r.toString() + "-"+c.toString());
           tile.innerText=2;
           tile.classList.add("x2");
           found=true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";// we are making the text of tile empty
    tile.classList.value = "";// clearing the classlist of that div 
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num.toString();
        if(num <= 4096) {
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }
    } 
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    if(high<score){
        high=score;
    }
    updatehighscore(high);
})


function updatehighscore(high){
    localStorage.setItem("highScore",high);
    highscore.innerHTML = + high;
}
// create new Array copy of requested row and return the array without Ziros 
function filterZero(row){
    return row.filter(num => num != 0); 
}

//working fow slider
//step1: we remove zero, step2: we doulbe the 1st elemt if equal, step3: update 2nd lemnet to zero , step4: again filter zero from row, step5:add the zeroes again
function slide(row){
    //[0, 2, 2, 2];
  row = filterZero(row); //[2, 2, 2]

  //slide
  for( let i = 0;i<row.length-1;i++){
    //cheack every two
     if(row[i] == row[i+1]){
        row[i] *= 2;//increamenting first elemt by double 
        row[i+1] =0;//puting second elemt zero
        score += row[i];
     }// [2, 2, 2]=> [4, 0, 2]
  }

  row = filterZero(row);//[4, 2]

  //adding zeroes again 
  while(row.length<colums){
    row.push(0);
  }//[4, 2, 0, 0]
  return row;
}



function slideLeft(){
    for( let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r]=row;
        for( let c=0; c < colums;c++){
            let tile = document.getElementById(r.toString()+"-"+ c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for( let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r]=row;
        //for update rows and colums
        for( let c=0; c < colums;c++){
            let tile = document.getElementById(r.toString()+"-"+ c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for(let c = 0; c < colums; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = slide(row);
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
         
        for( let r=0; r < rows;r++){
            board[r][c]=row[r];
            let tile = document.getElementById(r.toString()+"-"+ c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}

function slideDown(){
    for(let c = 0; c < colums; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
         
        for( let r=0; r < rows;r++){
            board[r][c]=row[r];
            let tile = document.getElementById(r.toString()+"-"+ c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}