class SudokuSolver {
  puzzleString = null

  validate() {
    const notValidCharacters = /[^1-9\.]/i
    if (notValidCharacters.test(this.puzzleString)) {
      return 'Invalid characters in puzzle'
    }
    if (this.puzzleString.length != 81) {
      return 'Expected puzzle to be 81 characters long'
    }

    return null
  }

  checkRowPlacement(row, column, value) {

  }

  checkColPlacement(row, column, value) {

  }

  checkRegionPlacement(row, column, value) {

  }

  solve() {

  }

  build(puzzleString) {
    this.puzzleString = puzzleString
  }
}

module.exports = SudokuSolver;

