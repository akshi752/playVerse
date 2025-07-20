  console.log("Welcome to Tic-Tac-Toe")
let turnmusic=new Audio("click.mp3")
let gameover=new Audio("gameOver.mp3")
gameover.preload='auto'
let turn="X"
let isgameover=false;
const changeturn=()=>
{
    return turn ==="X"?"O":"X"
}
const checkwin=()=>
{
    let boxtexts=document.getElementsByClassName('boxtext')
    let wins=[
      [0,1,2,0,5,0],
    [3,4,5,0,15,0],
    [6,7,8,0,25,0],
    [0,3,6,-9.5,15,90],
    [1,4,7,0.5,15,90],
    [2,5,8,10.75,15,90],
    [0,4,8,0.5,14.8,45],
    [2,4,6,0.5,14.8,-45] 
    ];
        wins.forEach(e=>
        {
            if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !==""))
            {
                 gameover.play();
                document.querySelector('.info').innerText=boxtexts[e[0]].innerText +" Won"
                isgameover=true;
                 document.querySelector(".line").style.transform=translate(`${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg`)
                 document.querySelector(".line").style.width="29vw"
                
            }
        }
        )
}
const checkDraw = () => {
    let boxtexts = document.getElementsByClassName('boxtext')
    let filled = Array.from(boxtexts).every(box => box.innerText !== "")
    if(filled && !isgameover) {
        gameover.play();
        document.querySelector('.info').innerText = "It's a Draw!"
        isgameover = true
        
    }
}
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>
{
let boxtext=element.querySelector('.boxtext');
element.addEventListener('click',()=>
{
    if(boxtext.innerText==='')
    {
        boxtext.innerText=turn;
       turn= changeturn();
        turnmusic.play();
        checkwin();
        checkDraw();
        if(!isgameover)
        {
        document.getElementsByClassName("info")[0].innerText="Turn of "+turn;
        }
    }
})
})
reset.addEventListener('click',()=>
{
    let boxtexxt=document.querySelectorAll('.boxtext');
    Array.from(boxtexxt).forEach(element=>
    {
        element.innerText=""
    }
    );
    turn="X";
    isgameover=false
    document.querySelector(".line").style.width="0vw"
    document.getElementsByClassName("info")[0].innerText="Turn of "+turn;
    document.querySelector('.image').getElementsByTagName('img')[0].style.width="0px";
})

