const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const eraseBtn = document.getElementById('erase');
const clearEl = document.getElementById('clear');
const ctx = canvas.getContext('2d');
let size = 10
let isPressed = false
let isEraserMode = false;
colorEl.value = 'blac'
let color = colorEl.value
let x
let y
canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})
document.addEventListener('mouseup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
})
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})
function drawCircle(x, y) {
    ctx.beginPath();
    if (isEraserMode) {
      ctx.clearRect(x - size, y - size, size * 2, size * 2);
    } else {
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }  
  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    if (isEraserMode) {
      ctx.clearRect(x2 - size, y2 - size, size * 2, size * 2);
    } else {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 2;
      ctx.stroke();
    }
  }  
function updateSizeOnScreen() {
  sizeEL.innerText = size
}
increaseBtn.addEventListener('click', () => {
  size += 5
  if (size > 50) {
    size = 50
  }
  updateSizeOnScreen()
})
decreaseBtn.addEventListener('click', () => {
  size -= 5
  if (size < 5) {
    size = 5
  }
  updateSizeOnScreen()
})
eraseBtn.addEventListener('click', () => {
    isEraserMode = !isEraserMode;
    eraseBtn.innerText = isEraserMode ? '✏️' : 'e';
  });  
colorEl.addEventListener('change', (e) => color = e.target.value)
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))