const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    
    // Screen.setBackgroundColor(this.cursor.row, this.cursor.col, 'black');
    // Screen.setTextColor(this.cursor.row, this.cursor.col, 'red');

    
    // Replace this with real commands

  
    Screen.addCommand('d', 'moves cursor right', this.cursor.right.bind(this.cursor));
    
    Screen.addCommand('a', 'moves cursor left', this.cursor.left.bind(this.cursor));
    
    Screen.addCommand('w', 'moves cursor up', this.cursor.up.bind(this.cursor));
    
    Screen.addCommand('s', 'moves cursor down', this.cursor.down.bind(this.cursor));
   
    Screen.addCommand('space','place move', TTT.turn.bind(this));
    
    Screen.render();
    Screen.printCommands();
  }

  
static turn() {
  Screen.render();
  Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
  
  this.playerTurn == "O" ? this.playerTurn = "X" : this.playerTurn = "O";

  const winner = TTT.checkWin(Screen.grid);

 
  if (!winner) {
    Screen.render();
  } else {
    TTT.endGame(winner);
  }
}


  static rotateGrid(grid) {
    let newGrid = [];
    for (const col in grid) {
      let rotated = grid.map(row => row[col]);
      newGrid.push(rotated);
    }
    return newGrid;
  }
  static checkWin(grid) {
   const copy = TTT.rotateGrid(grid);

   let choices = ["X","O"];

   for (const player in choices) {
    for (const row in grid) {
      if (grid[row].every(el => el == choices[player])) {
        return choices[player];
      }
    }
   

   for (const col in copy) {
    if (copy[col].every(el => el == choices[player])) {
      return choices[player];
    }
   }
    if((grid[0][0] == choices[player]) &&
    (grid[0][0] == grid[1][1]) &&
    (grid[1][1] == grid[2][2]))
    return choices[player];
   else if (
    (grid[0][2] == choices[player]) &&
    (grid[0][0] == grid[1][1]) &&
    (grid[1][1] == grid[2][0])
   )  return choices[player];
  }
  if (grid.every(row => row.every(el => el != ' '))) return "T";
  
    else return false;
  
  }
  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}
 

const grid =[['X','X','X'],
[' ',' ',' '],
[' ',' ',' ']];
console.log(TTT.checkWin(grid));


module.exports = TTT;
