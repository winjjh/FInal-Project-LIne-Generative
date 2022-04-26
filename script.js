const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function randomColor() {
  return Math.floor(Math.random() * 361);
}

let hue = randomColor();

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue > 360 ? hue = 0 : hue++; //hue값 늘리기
  if (ctx.lineWidth > 100 || ctx.lineWidth < 10) {
    direction = !direction;
  }
  if (direction) { //ture면 점점 굵어지게
    ctx.lineWidth++;
  } else { //flase면 점점 가늘어지게
    ctx.lineWidth--;
  }
  console.log(ctx.lineWidth);
}
canvas.addEventListener("mousemove", draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);