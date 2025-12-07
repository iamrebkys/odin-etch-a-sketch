const container = document.querySelector('.grid-container');

function grid(size) {
    container.innerHTML = ''; // Clear previous grid if any

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        // dynamically calculate width based on grid size
        square.style.flex = `0 0 calc(100% / ${size})`;

        square.dataset.step = 0; // Initialize step counter

        container.appendChild(square);
    }
}

function ensureBaseColor(square) {
    if(!square.dataset.baseR) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        square.dataset.baseR = r;
        square.dataset.baseG = g;
        square.dataset.baseB = b;
    }
    
}

function shadeSquare(square) {
    ensureBaseColor(square);

    let step = parseInt(square.dataset.step, 10);
    if (step >= 10) return; // Max shading reached

    step += 1; // +10% darker
    square.dataset.step = step;

    const baseR = parseInt(square.dataset.baseR, 10);
    const baseG = parseInt(square.dataset.baseG, 10);
    const baseB = parseInt(square.dataset.baseB, 10);

    // factor goes 0.9, 0.8, ..., 0.1, 0 (to black)
    const factor = (10 - step) / 10;

    const r = Math.floor(baseR * factor);
    const g = Math.floor(baseG * factor);
    const b = Math.floor(baseB * factor);
    
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function inputGridSize() {
    const input = document.querySelector("input");
    const sizeValue = parseInt(input.value, 10);

    if (isNaN(sizeValue) || sizeValue < 1 || sizeValue > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    grid(sizeValue);
}



// One listener for all current & future squares (event delegation)
container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('grid-square')) {
        shadeSquare(event.target);
    }
});


// Handle grid size form submission
const gridButton = document.querySelector("button");
gridButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    inputGridSize();
});

// Initialize default grid
grid(16); 