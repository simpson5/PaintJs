const canvas = document.getElementById("jsCanvas");
//context 캔버스를 컨트롤함
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

//pixel nodifier 브라우져에게 캔버스의 사이즈를 알려준다.
canvas.width=500;
canvas.height = 600;

ctx.strokeStyle = "#black";
ctx.fillStyle = "#black"
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x =event.offsetX;
    const y =event.offsetY;
    if(!painting){
        //console.log("creating path in",x ,y);
        //path는 선 - path을 만들면 마우스의 x,y 좌표로 path를 옮긴다.
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        //console.log("creating line in",x ,y);
        //path 이전의 위치에서 지금 위치까지 선을 만든다.
        //한 픽셀 씩 만든다.
        ctx.lineTo(x,y);
        //위에서 만든 선에 획을 귿는다.
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
   const color = event.target.style.backgroundColor;
   console.log(color);
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}

function handlRangeChange(event){
    const value = event.target.value;
    ctx.lineWidth = value;
}

//괄호 안의 event의 이유는?
function switchMode(){
    //const text = event.target.innerText;
    if(filling == true){
        filling = false;
        mode.innerText="Fill";
    }
    else{
        filling = true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling==true){
        ctx.fillRect(0, 0, 500, 600);
    }
}

//if가 정의 되면 실행
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
}

//object로부터 array를 만든다.
if(colors){
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))
}

if(range){
 range.addEventListener("input",handlRangeChange);   
}

if(mode){
    mode.addEventListener("click",switchMode);
}