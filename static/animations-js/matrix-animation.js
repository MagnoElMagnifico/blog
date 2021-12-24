// Config values
// -------------
const clearColor = "#00000007";
const fontColor = ["#0f0"];//["#f00", "#0f0"];
const fontSize = 20;

const marginLeft = 50;
const marginRight = 100;
const ident = fontSize * 4;

// UTF-16BE - Normal - Japanese - Greek
const firstChar = 48;// 12032; // 913;
const lastChar = 112;// 12245;  // 1023;
const numberChars = lastChar - firstChar;

(() => {
    const canvas = document.getElementById("matrix-animation");
    const ctx = canvas.getContext("2d");

    let counter = 0;
    let lastTime = 0;

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
    let identlevel = 0;
    function render() {
        const random = Math.random();

        if (identlevel < 3 && random > 0.8)
        identlevel++;
        if (identlevel > 0 && random < 0.2)
        identlevel--;

        const totalCols = Math.floor((canvas.width - marginLeft - marginRight - ident*identlevel) / fontSize);
        const totalRows = Math.floor(canvas.height / fontSize);

        const currentRow = ++counter % totalRows+1;
        const colsOffset = Math.floor(Math.random() * totalCols);

        for (let i = 0; i <= colsOffset; i++) {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * numberChars + firstChar));

            ctx.fillStyle = fontColor[Math.floor(Math.random() * fontColor.length)];
            ctx.font = `${fontSize}px Consolas`;
            ctx.fillText(randomChar, i*fontSize+marginLeft+ident*identlevel, currentRow*fontSize);
        }
    }

    resize();
    loop();
})();
