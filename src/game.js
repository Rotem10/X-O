let state = {
  playing: false,
  player: "X",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const tdRow = (td) => parseInt(td.getAttribute("attr-row"));
const tdCol = (td) => parseInt(td.getAttribute("attr-col"));

function startGame(s) {
  return {
    ...s,
    playing: true,
    player: "X",
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
}

function endGame(s) {
  return { ...s, playing: false };
}

function updateBoard(s, td) {
  const row = tdRow(td);
  const col = tdCol(td);
  if (!s.board[row][col]) {
    s.board[row][col] = s.player;
  }
  return s;
}

function updatePlayer(s) {
  return (s.player = s.player === "X" ? "O" : "X");
}

function checkWin(s) {
  for (let i = 0; i < 3; i++) {
    if (
      (s.board[i][0] && s.board[i][1] && s.board[i][2]) ||
      (s.board[0][i] && s.board[1][i] && s.board[2][i])
    ) {
      if (
        (s.board[i][0] === s.board[i][1] && s.board[i][1] === s.board[i][2]) ||
        (s.board[0][i] === s.board[1][i] && s.board[1][i] === s.board[2][i])
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (
    (s.board[0][0] && s.board[1][1] && s.board[2][2]) ||
    (s.board[0][2] && s.board[1][1] && s.board[2][0])
  ) {
    if (
      (s.board[0][0] === s.board[1][1] && s.board[1][1] === s.board[2][2]) ||
      (s.board[0][2] === s.board[1][1] && s.board[1][1] === s.board[2][0])
    ) {
      return true;
    } else {
      return false;
    }
  }
}
function fullBoard(s) {
  let fullBoard = true;
  s.board.forEach((row) => {
    row.forEach((t) => {
      if (!t) {
        fullBoard = false;
      }
    });
  });
  return fullBoard;
}

function render(s) {
  start().style.display = s.playing ? "none" : "inline-block";
  end().style.display = s.playing ? "inline-block" : "none";
}

function renderBoard(s) {
  boardTds().forEach((td) => {
    const row = tdRow(td);
    const col = tdCol(td);
    td.innerHTML = s.board[row][col];
  });
}

const start = () => document.querySelector(".start");
start().addEventListener("click", () => {
  state = startGame(state);
  render(state);
  renderBoard(state);
});

const end = () => document.querySelector(".end");
end().addEventListener("click", () => {
  state = endGame(state);
  render(state);
});

const boardTds = () => document.querySelectorAll("td");
boardTds().forEach((td) =>
  td.addEventListener("click", () => {
    if (state.playing) {
      state = updateBoard(state, td);
      if (checkWin(state)) {
        console.log(`${state.player} is the winner`);
      }
      updatePlayer(state);
      renderBoard(state);
      if (fullBoard(state)) {
        console.log("Game Over");
        state = endGame();
        render(state);
      }
    } else {
      console.log("click start");
    }
    if (checkWin(state)) {
      state = endGame();
      render(state);
    }
  })
);

document.addEventListener("DOMContentLoaded", () => render(state));
