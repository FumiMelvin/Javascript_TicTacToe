const boxElements = document.querySelectorAll("[data-box]");

let xTurn;
const X_CLASS = "x";
const O_CLASS = "o";

const winningMessageElement = document.querySelector("[data-result]");

const restartBtn = document.getElementById("newGame");

restartBtn.addEventListener("click", newGame);

function newGame() {
  boxElements.forEach((box) => {
    box.classList.remove(X_CLASS);
    box.classList.remove(O_CLASS);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
}

const winning_Condition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxElements.forEach((box) => {
  box.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const box = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  fillBox(box, currentClass);

  if (checkForWin(currentClass)) {
    console.log(`winner is ${currentClass}`);

    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    changeTurn();
  }
}

function fillBox(box, currrentClass) {
  box.classList.add(currrentClass);
}

function changeTurn() {
  xTurn = !xTurn;
}

function checkForWin(currentClass) {
  return winning_Condition.some((condition) => {
    return condition.every((index) => {
      return boxElements[index].classList.contains(currentClass);
    });
  });
}

function endgame(draw) {
  if (draw) {
    winningMessageElement.innerHTML = "Draw!";
  } else {
    winningMessageElement.innerHTML = `${xTurn ? "X's" : "O's"} Wins!`;
  }
}

function isDraw() {
  return [...boxElements].every((box) => {
    return box.classList.contains(X_CLASS) || box.classList.contains(O_CLASS);
  });
}
