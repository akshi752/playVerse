let boxes=document.querySelectorAll(".box");
let gameOn=false;
const board1 =[
  [0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 8, 0, 0, 0, 7, 0, 9, 0],
  [6, 0, 2, 0, 0, 0, 5, 0, 0],
  [0, 7, 0, 0, 6, 0, 0, 0, 0],
  [0, 0, 0, 9, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 4, 0],
  [0, 0, 5, 0, 0, 0, 6, 0, 3],
  [0, 9, 0, 4, 0, 0, 0, 7, 0],
  [0, 0, 6, 0, 0, 0, 0, 0, 0]
];


const board2 = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0]
];

const board3 = [
  [0, 2, 0, 6, 0, 8, 0, 0, 0],
  [5, 8, 0, 0, 0, 9, 7, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [3, 7, 0, 0, 0, 0, 5, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 8, 0, 0, 0, 0, 1, 3],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 9, 8, 0, 0, 0, 3, 6],
  [0, 0, 0, 3, 0, 6, 0, 9, 0]
];

let arr=[board1,board2,board3];


let playbtn = document.querySelector("#playbtn");

 

function isSafe( board, row,  col, val){
        for(let i=0;i<9;i++){
            if(board[row][i]==val)return false;
        }
        for(let i=0;i<9;i++){
            if(board[i][col]==val)return false;
        }
        let srow=(Math.floor(row/3))*3;
        let scol=(Math.floor(col/3))*3;
        for(let i=srow;i<=srow+2;i++){
            for(let j=scol;j<=scol+2;j++){
                if(board[i][j]==val)return false;
            }
        }
        return true;
    }
    function solve( board ,  row, col){
        if(col==9){
            row++;col=0;
        }
        if(row==9){
           
            return true;
        }
        if(board[row][col]!=0){
            return solve(board,row,col+1);
        }
        for(let i=1;i<=9;i++){
            if(isSafe(board,row,col,i)){
                board[row][col]=i;
                if(solve(board, row,col+1))return true;
                board[row][col]=0;
            }
        }
        return false;
    }

let ansboard;
let currboard;
playbtn.disabled=false;
playbtn.addEventListener("click",()=>{
    ansbtn.disabled=false;
    let i=0;
    let j=0;
    gameOn=true;
    
    if(currboard==undefined){
     currboard =arr[Math.floor(Math.random()*arr.length)];
    }
    else{
        let presentboard;
        do{
            presentboard=arr[Math.floor(Math.random()*arr.length)];
        }while(presentboard===currboard);
        currboard=presentboard;
    }
     
    // solve(currboard,0,0);
    ansboard = currboard.map(row => [...row]);
    solve(ansboard, 0, 0);
    

    boxes.forEach((box)=>{
        if(box.innerText!=="")box.innerText="";
        if(j===9){
            i++;j=0;
        }
        if(currboard[i][j]!==0)
        box.innerText=currboard[i][j];
        else box.innerText="";
        j++;
    })   
    
        
})

    boxes.forEach((box,idx)=>{
        if(box.innerText===""){
        box.addEventListener(("click"), ()=>{
         
            let num = prompt("Enter a number.");
            let i=Math.floor(idx/9);
            let j=(idx%9);
            if (parseInt(num) === ansboard[i][j]) {
                box.innerText = num;
            }
            
        })
    }
})





let ansbtn=document.querySelector("#ans");
ansbtn.disabled=true;

ansbtn.addEventListener("click",()=>{
    playbtn.disabled=true;
    let el=document.createElement("div");
    el.innerHTML=`<div class="box">${ansboard[0][0]}</div>
<div class="box">${ansboard[0][1]}</div>
<div class="box right">${ansboard[0][2]}</div>
<div class="box">${ansboard[0][3]}</div>
<div class="box">${ansboard[0][4]}</div>
<div class="box right">${ansboard[0][5]}</div>
<div class="box">${ansboard[0][6]}</div>
<div class="box">${ansboard[0][7]}</div>
<div class="box">${ansboard[0][8]}</div>

<div class="box">${ansboard[1][0]}</div>
<div class="box">${ansboard[1][1]}</div>
<div class="box right">${ansboard[1][2]}</div>
<div class="box">${ansboard[1][3]}</div>
<div class="box">${ansboard[1][4]}</div>
<div class="box right">${ansboard[1][5]}</div>
<div class="box">${ansboard[1][6]}</div>
<div class="box">${ansboard[1][7]}</div>
<div class="box">${ansboard[1][8]}</div>

<div class="box down">${ansboard[2][0]}</div>
<div class="box down">${ansboard[2][1]}</div>
<div class="box right down">${ansboard[2][2]}</div>
<div class="box down">${ansboard[2][3]}</div>
<div class="box down">${ansboard[2][4]}</div>
<div class="box right down">${ansboard[2][5]}</div>
<div class="box down">${ansboard[2][6]}</div>
<div class="box down">${ansboard[2][7]}</div>
<div class="box down">${ansboard[2][8]}</div>

<div class="box">${ansboard[3][0]}</div>
<div class="box">${ansboard[3][1]}</div>
<div class="box right">${ansboard[3][2]}</div>
<div class="box">${ansboard[3][3]}</div>
<div class="box">${ansboard[3][4]}</div>
<div class="box right">${ansboard[3][5]}</div>
<div class="box">${ansboard[3][6]}</div>
<div class="box">${ansboard[3][7]}</div>
<div class="box">${ansboard[3][8]}</div>

<div class="box">${ansboard[4][0]}</div>
<div class="box">${ansboard[4][1]}</div>
<div class="box right">${ansboard[4][2]}</div>
<div class="box">${ansboard[4][3]}</div>
<div class="box">${ansboard[4][4]}</div>
<div class="box right">${ansboard[4][5]}</div>
<div class="box">${ansboard[4][6]}</div>
<div class="box">${ansboard[4][7]}</div>
<div class="box">${ansboard[4][8]}</div>

<div class="box down">${ansboard[5][0]}</div>
<div class="box down">${ansboard[5][1]}</div>
<div class="box right down">${ansboard[5][2]}</div>
<div class="box down">${ansboard[5][3]}</div>
<div class="box down">${ansboard[5][4]}</div>
<div class="box right down">${ansboard[5][5]}</div>
<div class="box down">${ansboard[5][6]}</div>
<div class="box down">${ansboard[5][7]}</div>
<div class="box down">${ansboard[5][8]}</div>

<div class="box">${ansboard[6][0]}</div>
<div class="box">${ansboard[6][1]}</div>
<div class="box right">${ansboard[6][2]}</div>
<div class="box">${ansboard[6][3]}</div>
<div class="box">${ansboard[6][4]}</div>
<div class="box right">${ansboard[6][5]}</div>
<div class="box">${ansboard[6][6]}</div>
<div class="box">${ansboard[6][7]}</div>
<div class="box">${ansboard[6][8]}</div>

<div class="box">${ansboard[7][0]}</div>
<div class="box">${ansboard[7][1]}</div>
<div class="box right">${ansboard[7][2]}</div>
<div class="box">${ansboard[7][3]}</div>
<div class="box">${ansboard[7][4]}</div>
<div class="box right">${ansboard[7][5]}</div>
<div class="box">${ansboard[7][6]}</div>
<div class="box">${ansboard[7][7]}</div>
<div class="box">${ansboard[7][8]}</div>

<div class="box down">${ansboard[8][0]}</div>
<div class="box down">${ansboard[8][1]}</div>
<div class="box right down">${ansboard[8][2]}</div>
<div class="box down">${ansboard[8][3]}</div>
<div class="box down">${ansboard[8][4]}</div>
<div class="box right down">${ansboard[8][5]}</div>
<div class="box down">${ansboard[8][6]}</div>
<div class="box down">${ansboard[8][7]}</div>
<div class="box down">${ansboard[8][8]}</div>`

    el.classList.add("board","right","down","box");
    el.style.height="50%";
    el.style.width ="auto";
    el.style.aspectRatio="1/1";
    el.style.border="3px solid black";
    // el.style.border-right = "0.1px solid black";
    // el.style.border-left =  "3px solid black";
    let g_class=document.querySelector(".game");
    let el2=document.querySelector(".board");
    // el2.classList.add("hide");
    g_class.append(el);
    if(ansbtn.disabled===false){
        ansbtn.disabled=true;
    }
    
})
