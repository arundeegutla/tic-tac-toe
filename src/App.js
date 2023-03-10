import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    setPlayer('X');
  }, []);
  

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      

      if (!winner) {
        // if it's computer's turn, choose a random empty square
        const emptySquares = newBoard.reduce(
          (accumulator, currentValue, index) => {
            if (currentValue === null)
              accumulator.push(index);

            return accumulator;
          },
          []
        );
        const computerMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        
        newBoard[computerMove] = 'O';
        setBoard(newBoard);
        checkWinner(newBoard);
        setPlayer('X');
        
      }
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[b] && board[c] && board[a] === board[b] && board[a] === board[c] && !winner) {
        setWinner(board[a]); // fix here: set the winner to player instead of nextPlayer
        break;
      }
    }
    if (board.every((square) => square !== null) && !winner) {
      setWinner('Draw');
    }
  };
  

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleSymbolSelect = (symbol) => {
    setPlayer(symbol);
  };

  const renderSymbolSelection = () => {
    return (
      <div>
        <p>Select your symbol:</p>
        <button className="symbol-button" onClick={() => handleSymbolSelect('X')}>
          X
        </button>
        <button className="symbol-button" onClick={() => handleSymbolSelect('O')}>
          O
        </button>
      </div>
    );
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  const renderStatus = () => {
    if (!player) {
      return renderSymbolSelection();
    } else if (winner) {
      return (
        <>
          <div className="status">
            Winner: {winner}
          </div>
          <div className="popup">
            <div className="popup-content">
              <p className="popup-title" >{winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} won!`}</p>
              <button className="popup-button" onClick={handlePlayAgain}>Play Again</button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {renderStatus()}
    </div>
  );
}

export default App;
