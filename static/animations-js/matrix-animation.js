const desiredFPS = 20;

const clearColor = "#0001"; // "#21212130";
const fontColor = "#f00d";
const fontSize = 30;

const firstChar = 913;
const lastChar = 1023;

(() => {
const canvas = document.getElementById("matrix-animation");
const ctx = canvas.getContext("2d");

addEventListener("resize", resize);
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
}

let lastTime = 0;
function loop(currentTime) {
    const deltaTime = currentTime - lastTime;
    const fps = 1000 / deltaTime;

    const desiredDelta = 1000 / desiredFPS;

    if (desiredDelta <= deltaTime) {
        render();
        lastTime = currentTime;
    }

    requestAnimationFrame(loop);
}

const numberChars = lastChar - firstChar;
let counter = 0;
function render() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const totalCols = Math.floor(canvas.width / fontSize);
    const totalRows = Math.floor(canvas.height / fontSize);

    const currentRow = ++counter % totalRows;
    const colsOffset = Math.floor(Math.random() * totalCols);

    for (let i = 0; i <= totalCols; i++) {
        const randomChar = String.fromCharCode(Math.random() * numberChars + firstChar);

        ctx.fillStyle = fontColor;
        ctx.font = `${fontSize}px Consolas`;
        // TODO: Improve the performance by avoiding rendering chars out of the view port
        // TODO: Use different colors, rhythms, patterns, etc
        ctx.fillText(randomChar, (i-colsOffset)*fontSize, (currentRow+1)*fontSize);
    }
}
resize();
loop();
})();
