let selectedBox = null;
let currentPlayer = "black";
let gameActive = true; 

const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

function getPieceColor(piece) {
  if (whitePieces.includes(piece)) return "white";
  if (blackPieces.includes(piece)) return "black";
  return null;
}

function isKing(piece) {
  return piece === "♔" || piece === "♚";
}
function getPosition(box) {
  const index=Array.from(document.querySelectorAll(".box1, .box2")).indexOf(box);
  return {row:Math.floor(index/8),col:index%8};
}
function getBox(row, col) {
  return document.querySelectorAll(".box1, .box2")[row * 8 + col];
}
function isPathClear(from, to) {
  let dx = Math.sign(to.col - from.col);
  let dy = Math.sign(to.row - from.row);
  let r = from.row + dy,
    c = from.col + dx;
  while (r !== to.row || c !== to.col) {
    if (getBox(r, c).textContent.trim()) return false;
    r += dy;
    c += dx;
  }
  return true;
}


function isLegalMove(piece, from, to, targetPiece) {
  const color = getPieceColor(piece);
  if (!color) return false;
  const targetColor = getPieceColor(targetPiece);
  if (targetColor === color) return false;
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  switch (piece) {
    case "♙":
    case "♟": {
      const dir = color === "white" ? -1 : 1;
      const startRow = color === "white" ? 6 : 1;
      if (dx === 0 && !targetPiece) {
        if (dy === dir) return true;
        if (from.row === startRow && dy === 2 * dir && !getBox(from.row + dir, from.col).textContent.trim()) return true;
      }
      if (Math.abs(dx) === 1 && dy === dir && targetPiece && targetColor !== color) return true;
      return false;
    }
    case "♖":
    case "♜":
      return (dx === 0 || dy === 0) && isPathClear(from, to);
    case "♗":
    case "♝":
      return Math.abs(dx) === Math.abs(dy) && isPathClear(from, to);
    case "♕":
    case "♛":
      return ((dx === 0 || dy === 0) || Math.abs(dx) === Math.abs(dy)) && isPathClear(from, to);
    case "♘":
    case "♞":
      return (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
    case "♔":
    case "♚":
      return Math.max(Math.abs(dx), Math.abs(dy)) === 1;
  }
  return false;
}
function getLegalMoves(fromBox) {
  const from = getPosition(fromBox);
  const piece = fromBox.textContent.trim();
  const boxes = Array.from(document.querySelectorAll(".box1, .box2"));

  return boxes.filter(box => {
    const to = getPosition(box);
    if (from.row === to.row && from.col === to.col) return false; 
    const targetPiece = box.textContent.trim();
    return isLegalMove(piece, from, to, targetPiece);
  });
}
let hintBoxes = [];

function showHints(sourceBox) {
  hintBoxes = getLegalMoves(sourceBox);
  
  hintBoxes.forEach(b => b.classList.add("hint"));
}

function clearHints() {
  hintBoxes.forEach(b => b.classList.remove("hint"));
  hintBoxes = [];
}

let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
function updateTurnUI() {
  if (currentPlayer === "white") {
    player2.style.color = "green";
    player1.style.color = "black";
  } else {
    player1.style.color = "green";
    player2.style.color = "black";
  }
}
updateTurnUI();

function disableBoard() {
  document.querySelectorAll(".box1, .box2").forEach(b => (b.style.pointerEvents = "none"));
}


document.querySelectorAll(".box1, .box2").forEach(box => {
  box.addEventListener("click", () => {
    if (!gameActive) return;

    const piece = box.textContent.trim();
    const color = getPieceColor(piece);


    if (!selectedBox) {
      if (color === currentPlayer) {
        selectedBox = box;
        box.style.outline = "4px solid lime";
        showHints(box);             
      }
      return;
    }

   
    if (box === selectedBox) {
      selectedBox.style.outline = "none";
      selectedBox = null;
      clearHints(); 
      return;
    }

    const from = getPosition(selectedBox);
    const to = getPosition(box);
    const selectedPiece = selectedBox.textContent.trim();
    const targetPiece = box.textContent.trim();

    if (!isLegalMove(selectedPiece, from, to, targetPiece)) return;
  
    let voice = document.querySelector(".audioplayer");
    voice.play();
    clearHints();               



    
    if (isKing(targetPiece)) {
      box.textContent = selectedPiece;
      selectedBox.textContent = "";
      let x;
      if (currentPlayer === "white") x = "Player2";
      else x = "Player1";
      let winelement=document.createElement("h1");
      let p1=document.querySelector(".player1");
      let p2=document.querySelector(".player2");
      winelement.innerText="Congratulations! You won";
      winelement.style.color="blue";
      if(x==="Player1"){
        p1.append(winelement);
      }else{
        p2.append(winelement);
      }
      gameActive = false;
      disableBoard();
      return;
    }

    
    box.textContent = selectedPiece;
    selectedBox.textContent = "";
    selectedBox.style.outline = "none";
    selectedBox = null;

    if(targetPiece!==""){
      let blackarr=document.querySelector(".blackarr");
      let whitearr=document.querySelector(".whitearr");
      if(whitePieces.includes(targetPiece)){
        let item=document.createElement("p");
        item.textContent = targetPiece;
        whitearr.append(item);
      
      }
      else{
        let item=document.createElement("p");
        item.textContent= targetPiece;
        blackarr.append(item);
      }
    }
    

    if (currentPlayer === "white") {
      player2.style.color = "green";
      player1.style.color = "black";
      currentPlayer = "black";
    } else {
      player1.style.color = "green";
      player2.style.color = "black";
      currentPlayer = "white";
    }
    updateTurnUI();
    
    let t_box=[];
    t_box = getLegalMoves(box);
    t_box.forEach((boxs)=>{
    const t_piece = boxs.textContent;
    if(t_piece=='♔' || t_piece=='♚'){
      alert("Check");
    }
})
});
});
