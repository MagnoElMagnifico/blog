// Config values
// -------------
const style = {
    background: {
        color: '#000',
        clear: '#00000007',
    },

    font: {
        family: 'Fira Code',
        size: 100,       // % relative to canvas
        lineHeight: 100, // % relative to fontSize
        mobileFactor: 3, // Scale in mobiles
    },

    indent: 4, // Number of chars, relative to fontSize
    linesPerSecond: 1000, // Limited by 60FPS of JS Canvas

    code: {
        text: 'abcdefghijklmnopqrstuvwxyz_',
        comment: '// ',

        listOpen: '[',
        listClose: ']',
        blockOpen: '{',
        blockClose: '}',
        string: '"',
        endl: ';',

        assign: ['=>', '=', '+=', '++=', ':='],
        symbols: ['+', '-', '*', '/', '...', '&&', '||', '%', '?', '==', '<', '>', '>=', '<='],
        keywords: ['let', 'if', 'for', 'while', 'class', 'return', 'function'],

        colors: {
            default:    '#fff', // white
            identifier: '#0ef', // blue
            fun_call:   '#a0f', // purple
            keyword:    '#f05', // red
            number:     '#f60', // orange
            string:     '#0f5', // green
            comment:    '#555', // grey
        }
    }
}

class Animation {
    constructor(style) {
        this.style = style;

        // Loop
        this.lastTime = 0;

        // Rendering
        this.canvas = document.getElementById("animation");
        this.ctx    = this.canvas.getContext("2d");
        this.lineCount = 0;
        this.indent = 0;
        this.cursor = 0;

        // Start animation
        addEventListener("resize", () => this.resize() );
        this.resize();
        this.loop();
    }

    resize() {
        // Update the canvas exactly as the CSS
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight < 400 ? 400 : window.innerHeight;

        // Update variables accordingly
        this.fontSize = this.canvas.width * this.style.font.size / 10_000;
        // Scale font size on mobile
        if (window.innerWidth < 800)
            this.fontSize *= this.style.font.mobileFactor;
        this.lineHeight = this.fontSize * this.style.font.lineHeight / 90;

        // Apply the font
        this.ctx.font = `${this.fontSize}px ${this.style.font.family}`;

        // Render a background to avoid seeing the background of the page
        // and not the canvas one
        this.ctx.fillStyle = this.style.background.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //////////////// RANDOM FUNCTIONS ////////////////
    // Returns a random integer in the range [start, end)
    random(start, end) {
        return Math.floor((Math.random() * (end - start) + start));
    }

    rdItem(list) {
        return list[this.random(0, list.length)];
    }

    rdStr(start, end) {
        let line = '';
        for (let i = 0; i < this.random(start, end+1); i++)
            line += this.rdItem(this.style.code.text);
        return line;
    }

    //////////////// RENDER FUNCTIONS ////////////////
    renderText(text, color) {
        const measure = this.ctx.measureText(text);
        const totalLines = Math.ceil(this.canvas.height / this.lineHeight);
        const currentLine = (this.lineCount % totalLines) + 1;

        const x = this.cursor + this.indent * this.fontSize;
        const y = currentLine * this.lineHeight;

        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
        this.cursor += measure.width;
    }

    // Renders an expression list with the separator given and the range
    // (start, end]
    renderList(separator, start, end) {
        this.renderExpression()
        for (let i = 0; i < this.random(start, end+1); i++) {
            this.renderText(separator, this.style.code.colors.default);
            this.renderExpression();
        }
    }

    // Types of expressions:
    //   0. integer
    //   1. float: integer.integer
    //   2. identifier
    //   3. 'identifier' or "identifier"
    //   4. [expression, [, expression ...] ]
    //   5. identifier[number]
    //   6. expression symbol expression
    //   7. [identifier.]identifier([expression])
    //   8. symbol (internal use only)
    // If undefined or other, choose randomly
    renderExpression(type, symbol) {
        const code = this.style.code;
        switch (type) {
            case 0: this.renderText(String(this.random(-99, 100)), code.colors.number); return;
            case 1: this.renderText(String(this.random(-99, 100)) + '.' + String(this.random(0, 100)), code.colors.number); return;
            case 2: this.renderText(this.rdStr(4, 10), code.colors.identifier); return;
            case 3: this.renderText(code.string + this.rdStr(0, 12) + code.string, code.colors.string); return;

            case 4:
                this.renderText(code.listOpen, code.colors.default);
                this.renderList(', ', 0, 5);
                this.renderText(code.listClose, code.colors.default);
                return;

            case 5:
                this.renderExpression(2); // Indentifier
                this.renderText('[', code.colors.default);
                this.renderExpression(0); // Integer
                this.renderText(']', code.colors.default);
                return;

            case 6:
                this.renderExpression();
                this.cursor += this.fontSize / 2; // Space
                this.renderText(this.rdItem(code.symbols), code.colors.default);
                this.cursor += this.fontSize / 2; // Space
                this.renderExpression();
                return;

            case 7:
                if (this.random(0, 2)) {
                    this.renderExpression(2); // Identifier
                    this.renderText('.', code.colors.default);
                }
                this.renderText(this.rdStr(4, 10), code.colors.fun_call);
                this.renderText('(', code.colors.default);
                this.renderList(', ', 0, 3);
                this.renderText(')', code.colors.default);
                return;

            default: this.renderExpression(this.random(0, 8)); return;
        }
    }

    // Types of lines:
    //   0. comment identifier identifier ...
    //   1. [keyword] identifier assign expression;
    //   2. keyword (expression) { (add indent)
    //   3. } (end indent)
    renderLine() {
        const code = this.style.code;
        this.cursor = 0;

        switch (this.random(0, this.indent > 0 ? 4 : 3)) {

            case 0:
                let comment = '';
                for (let i = 0; i < this.random(0, 10); i++)
                    comment += ' ' + this.rdStr(3, 5);
                this.renderText(code.comment + comment, code.colors.comment);
                break;

            case 1:
                if (this.random(0, 2)) {
                    this.renderText(this.rdItem(code.keywords), code.colors.keyword);
                    this.cursor += this.fontSize / 2;
                } // Optional keyword
                this.renderExpression(2); // Identifier
                this.cursor += this.fontSize / 2;
                this.renderText(this.rdItem(code.assign), code.colors.default); // Assignment
                this.cursor += this.fontSize / 2;
                this.renderExpression(); // Expression
                this.renderText(code.endl, code.colors.default); // End line
                break;

            case 2:
                this.indent++;
                this.renderText(this.rdItem(code.keywords), code.colors.keyword); // Keyword
                this.cursor += this.fontSize / 2;
                this.renderText('(', code.colors.default);
                this.renderExpression();
                this.renderText(')', code.colors.default);
                this.renderText(' ' + code.blockOpen, code.colors.default); // {
                break;

            case 3:
                this.indent--;
                this.renderText(code.blockClose, code.colors.default);
                break;

            default: console.error('Unreachable');
        }

        this.lineCount++;
    }

    loop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        const desiredDelta = 1000 / this.style.linesPerSecond;

        // Fade out effect with a color with alpha
        this.ctx.fillStyle = this.style.background.clear;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Don't render or update until the desired delta has passed
        if (desiredDelta <= deltaTime) {
            this.renderLine();
            this.lastTime = currentTime;
        }

        window.requestAnimationFrame( (time) => this.loop(time) );
    }
}

new Animation(style);
