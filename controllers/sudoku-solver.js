class SudokuSolver {
  constructor() {
    this.puzzleString = null;
    this.board = []
  }

  static validateCharacters(string) {
    const notValidCharacters = /[^1-9\.]/i
    if (notValidCharacters.test(string)) {
      throw new Error('Invalid characters in puzzle')
    }
  }
  validatePuzzleString(puzzleString) {
    SudokuSolver.validateCharacters(puzzleString)
    if (puzzleString.length != 81) {
      throw new Error('Expected puzzle to be 81 characters long')
    }
  }

  validateCoordinateAndValue(coordinate, value) {
    const validCoordinations = /^[A-I][1-9]$/
    const notValidValue = /[^1-9]/
    if (!validCoordinations.test(coordinate)) {
      throw new Error('Invalid coordinate')
    }
    if (notValidValue.test(value)) {
      throw new Error('Invalid value')
    }
  }

  checkRowPlacement(row, value) {
    const puzzleRow = this.board[row]
    for (let index in puzzleRow) {
      if (puzzleRow[index] == value) {
        return false
      }
    }

    return true
  }

  checkColPlacement(column, value) {
    for (let index = 0; index < 9; index++) {
      if (this.board[index][column] == value) {
        return false
      }
    }

    return true
  }

  checkRegionPlacement(row, column, value) {
    let regionRow = parseInt(row / 3) * 3
    let regionColumn = parseInt(column / 3) * 3
    for (let row = regionRow; row < regionRow + 3; row++) {
      for (let col = regionColumn; col < regionColumn + 3; col++) {
        if (this.board[row][col] == value) {
          return false
        }
      }
    }

    return true
  }

  checkCoordinatePlacement(coordinate, value) {
    this.validateCoordinateAndValue(coordinate, value)

    const result = {
      valid: true,
      conflict: []
    }

    let [row, col] = coordinate.split('')
    row = row.charCodeAt(0) - 65
    col = Number(col) - 1

    if (!this.checkRowPlacement(row, value)) {
      result.valid = false
      result.conflict.push('row')
    }
    if (!this.checkColPlacement(col, value)) {
      result.valid = false
      result.conflict.push('column')
    }
    if (!this.checkRegionPlacement(row, col, value)) {
      result.valid = false
      result.conflict.push('region')
    }

    if (result.valid) {
      delete result.conflict
    }

    return result

  }

  checkPlacement(row, column, value) {
    if (this.checkRowPlacement(row, value)
      && this.checkColPlacement(column, value)
      && this.checkRegionPlacement(row, column, value)) {
      return true
    }

    return false
  }

  getSolution() {
    const solutionArray = this.board.flat(9)
    const solutionString = solutionArray.join('')
    return solutionString
  }

  solve(row = 0, col = 0) {
    if (col === 9) {
      col = 0
      row++
    }

    if (row === 9) {
      return this.getSolution()
    }

    if (this.board[row][col] != '.') {
      return this.solve(row, col + 1)
    }

    for (let i = 1; i < 10; i++) {
      let value = i.toString()
      if (this.checkPlacement(row, col, value)) {
        this.board[row][col] = value
        const testSolve = this.solve(row, col + 1)
        if (testSolve != false) {
          return testSolve
        } else {
          this.board[row][col] = '.'
        }
      }
    }

    return false
  }

  build(puzzleString) {
    this.validatePuzzleString(puzzleString)

    this.puzzleString = puzzleString
    this.board = []

    const puzzleArray = Array.from(this.puzzleString)
    for (let i = 0; i < 9; i++) {
      const characters = puzzleArray.splice(0, 9)
      this.board.push(characters)
    }
  }
}

module.exports = SudokuSolver;

