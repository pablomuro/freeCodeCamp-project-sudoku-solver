const chai = require('chai');
const assert = chai.assert;

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
const SudokuSolver = require('../controllers/sudoku-solver.js');
const sudokuSolver = new SudokuSolver()

suite('UnitTests', () => {
  suite('Sudoku Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      let errorMessage = null
      try {
        sudokuSolver.build(puzzleString)
      } catch (error) {
        errorMessage = error.message
      }
      assert.isNull(errorMessage)

      done();
    });
    test('Logic handles a puzzle string with invalid characters(not 1 - 9 or.)', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      let errorMessage = null
      try {
        sudokuSolver.build(puzzleString.replace('9', 'A'))
      } catch (error) {
        errorMessage = error.message
      }
      assert.isNotNull(errorMessage)
      assert.equal(errorMessage, 'Invalid characters in puzzle')

      done();
    });
    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
      let puzzleString = '.1.43'
      let errorMessage = null
      try {
        sudokuSolver.build(puzzleString)
      } catch (error) {
        errorMessage = error.message
      }
      assert.isNotNull(errorMessage)
      assert.equal(errorMessage, 'Expected puzzle to be 81 characters long')

      done();
    });
    test('Logic handles a valid row placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkRowPlacement(0, 3)
      assert.isTrue(placement)
      done();
    });
    test('Logic handles an invalid row placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkRowPlacement(0, 1)
      assert.isFalse(placement)
      done();
    });
    test('Logic handles a valid column placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkColPlacement(0, 9)
      assert.isTrue(placement)
      done();
    });
    test('Logic handles an invalid column placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkColPlacement(0, 1)
      assert.isFalse(placement)
      done();
    });
    test('Logic handles a valid region(3x3 grid) placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkRegionPlacement(0, 0, 9)
      assert.isTrue(placement)
      done();
    });
    test('Logic handles an invalid region(3x3 grid) placement', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      sudokuSolver.build(puzzleString)
      let placement = sudokuSolver.checkRegionPlacement(0, 0, 1)
      assert.isFalse(placement)
      done();
    });
    test('Valid puzzle strings pass the solver', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      let solutionString = puzzlesAndSolutions[0][1]
      let errorMessage = null
      let solution
      try {
        sudokuSolver.build(puzzleString)
        solution = sudokuSolver.solve()
        if (!solution) throw new Error('Puzzle cannot be solved')
      } catch (error) {
        errorMessage = error.message
      }
      assert.equal(solution, solutionString)
      assert.isNull(errorMessage)

      done();
    });
    test('Invalid puzzle strings fail the solver', function (done) {
      let puzzleString = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      let errorMessage = null
      let solution
      try {
        sudokuSolver.build(puzzleString)
        solution = sudokuSolver.solve()
        if (!solution) throw new Error('Puzzle cannot be solved')
      } catch (error) {
        errorMessage = error.message
      }
      assert.isNotNull(errorMessage)
      assert.equal(errorMessage, 'Puzzle cannot be solved')
      done();
    });
    test('Solver returns the the expected solution for an incomplete puzzzle', function (done) {
      let puzzleString = puzzlesAndSolutions[0][0]
      let solutionString = puzzlesAndSolutions[0][1]
      let errorMessage = null
      let solution
      try {
        sudokuSolver.build(puzzleString)
        solution = sudokuSolver.solve()
        if (!solution) throw new Error('Puzzle cannot be solved')
      } catch (error) {
        errorMessage = error.message
      }
      assert.equal(solution, solutionString)
      assert.isNull(errorMessage)

      done();
    });
  })
});
