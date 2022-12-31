// Config values
// -------------
const backColor = "#000";
const clearColor = "#00000007";
const fontColor = ["#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff"];

const fontFamily = "Fira Code";
const fontSize = 20;
const fontSpacing = 15;

const marginLeft = 50;
const marginRight = 100;
const ident = fontSpacing * 4;
const maxIdentLevel = 4;

const linesPerSecond = 60;

let firstChar;
let lastChar;

// Select characters. UTF-16BE codes
switch(0) {//switch(random(0, 3)) {
    case 0: firstChar = 48;    lastChar = 112;   break; // Normal
    case 1: firstChar = 12032; lastChar = 12245; break; // Japanese
    case 2: firstChar = 913;   lastChar = 1023;  break; // Greek
    default: console.error("Unreachable");
}

(() => {
// Returns a random integer in the range [start, end)
function random(start, end) {
    return Math.floor((Math.random() * (end - start) + start));
}

// Returns a random bool
function random_bool() {
    return random(0, 2) == 0;
}

const canvas = document.getElementById("animation");
const ctx = canvas.getContext("2d");

let counter = 0;
let identLevel = 0;
function renderLine() {
    const totalChars = Math.floor((canvas.width - marginLeft - marginRight - ident*identLevel) / fontSize);
    const totalLines = Math.floor(canvas.height / fontSize);
    const currentLine = ++counter % totalLines+1;
    const lineChars = random(0, totalChars);

    switch (random(0, 10)) {
        case 1: case 2: if (identLevel < maxIdentLevel) identLevel++; break;
        case 8: case 9: if (identLevel > 0)             identLevel--; break;
        default: break;
    }

    let currentFontColor = 0;
    for (let i = 0; i <= lineChars; i++) {
        switch (random(0, 10)) {
            case 1: case 2: currentFontColor++; break;
            case 8: case 9: currentFontColor--; break;
            default: break;
        }

        const randomChar = String.fromCharCode(random(firstChar, lastChar));
        ctx.fillStyle = fontColor[currentFontColor % fontColor.length];
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillText(randomChar, i*fontSpacing + marginLeft + ident*identLevel, currentLine*fontSize);
    }
}

let lastTime = 0;
function loop(currentTime) {
    const deltaTime = currentTime - lastTime;
    const fps = 1000 / deltaTime;
    const desiredDelta = 1000 / linesPerSecond;

    // Fade out effect with a color with alpha
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Don't render or update until the desired delta has passed
    if (desiredDelta <= deltaTime) {
        renderLine();
        lastTime = currentTime;
    }

    requestAnimationFrame(loop);
}

function resize() {
    // Update the canvas exactly as the CSS
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight < 400 ? 400 : window.innerHeight;

    // Render a background to avoid seeing the background of the page
    // and not the canvas one
    ctx.fillStyle = backColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

addEventListener("resize", resize);
resize();
loop();
})();
