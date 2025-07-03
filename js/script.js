const boardEl = document.getElementById('board');
const diceBtn = document.getElementById('dice');
const currentPlayerEl = document.getElementById('currentPlayer');
const diceValueEl = document.getElementById('diceValue');

const players = ['red','green','yellow','blue'];
let currentPlayerIdx = 0;
let diceValue = 0;

// Create 15×15 board
const cells = Array.from({length: 225}, () => {
  const div = document.createElement('div');
  div.className = 'cell';
  boardEl.append(div);
  return div;
});

// Starting positions per color
const startIdx = { red:0, green:12, yellow:156, blue:168 };
const playersPos = {};
players.forEach(color => {
  playersPos[color] = Array.from({length:4}, (_,i) => startIdx[color] + i*15);
});

// Place tokens
players.forEach(color => {
  playersPos[color].forEach((pos, idx) => {
    const tok = document.createElement('div');
    tok.classList.add('token', color);
    tok.dataset.color = color;
    tok.dataset.idx = idx;
    cells[pos].append(tok);
    tok.addEventListener('click', moveToken);
  });
});

function rollDice() {
  diceValue = Math.floor(Math.random()*6) + 1;
  diceValueEl.textContent = diceValue;
  diceBtn.disabled = true;
}

function moveToken(e) {
  const tok = e.currentTarget;
  if (tok.dataset.color !== players[currentPlayerIdx] || !diceValue) return;

  const color = tok.dataset.color;
  const idx = +tok.dataset.idx;
  let pos = (playersPos[color][idx] + diceValue) % cells.length;

  cells[playersPos[color][idx]].removeChild(tok);
  cells[pos].append(tok);
  playersPos[color][idx] = pos;

  diceValue = 0;
  diceBtn.disabled = false;
  currentPlayerIdx = (currentPlayerIdx + 1) % players.length;
  currentPlayerEl.textContent =
    players[currentPlayerIdx][0].toUpperCase() + players[currentPlayerIdx].slice(1);
  diceValueEl.textContent = '-';
}

diceBtn.addEventListener('click', rollDice);
