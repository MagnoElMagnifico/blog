// Returns a random integer in the range [start, end)
function random(start, end) {
    return Math.floor((Math.random() * (end - start) + start));
}

// Returns a random bool
function random_bool() {
    return random(0, 2) == 0;
}

// Config values
// -------------
const clearColor = "#00000007";
const possibleFontColor = ["#f00", "#0f0"];
const fontSize = 20;

const marginLeft = 50;
const marginRight = 100;
const ident = fontSize * 4;

let firstChar;
let lastChar;

// UTF-16BE
switch(random(0, 3)) {
    case 0: firstChar = 48;    lastChar = 112;   break; // Normal
    case 1: firstChar = 12032; lastChar = 12245; break; // Japanese
    case 2: firstChar = 913;   lastChar = 1023;  break; // Greek
    default: console.error("Unreachable");
}

let fontColor = [possibleFontColor[random(0, possibleFontColor.length)]];
if (random_bool()) {
    fontColor.push(possibleFontColor[random(0, possibleFontColor.length)]);
}
if (random_bool()) {
    fontColor.push(possibleFontColor[random(0, possibleFontColor.length)]);
}

(() => {
    const canvas = document.getElementById("matrix-animation");
    const ctx = canvas.getContext("2d");

    addEventListener("resize", resize);
    function resize() {
        // Update the canvas exactly as the CSS
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (window.innerHeight < 400) {
            canvas.height = 400;
        }
        // Render a background to avoid seeing the background of the page
        // and not the canvas one
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    let lastTime = 0;
    function loop(currentTime) {
        const deltaTime = currentTime - lastTime;
        const fps = 1000 / deltaTime;

        const desiredFPS = Math.floor(Math.random() * 20);
        const desiredDelta = 1000 / desiredFPS;

        // Fade out effect with a color with alpha
        ctx.fillStyle = clearColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Don't render or update until the desired delta has passed
        if (desiredDelta <= deltaTime) {
            render();
            lastTime = currentTime;
        }

        requestAnimationFrame(loop);
    }

    // TODO: Use different patterns, etc
    let counter = -10;
    let identlevel = 0;
    function render() {
        switch (random(0, 10)) {
            case 1: case 2: if (identlevel < 3) identlevel++; break;
            case 8: case 9: if (identlevel > 0) identlevel--; break;
            default: break;
        }

        const totalCols = Math.floor((canvas.width - marginLeft - marginRight - ident*identlevel) / fontSize);
        const totalRows = Math.floor(canvas.height / fontSize);

        const currentRow = ++counter % totalRows+1;
        const colsOffset = random(0, totalCols);

        for (let i = 0; i <= colsOffset; i++) {
            const randomChar = String.fromCharCode(random(firstChar, lastChar));

            ctx.fillStyle = fontColor[random(0, fontColor.length)];
            ctx.font = `${fontSize}px Consolas`;
            ctx.fillText(randomChar, i*fontSize+marginLeft+ident*identlevel, currentRow*fontSize);
        }
    }

    resize();
    loop();
})();
