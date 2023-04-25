import "./App.css"
import React,{useState} from 'react';
import { Square } from "./Components/Square";
 function Board({ xIsNext, squares, onPlay }){
 
  function handelClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares=squares.slice();
    if(xIsNext){
    nextSquares[i]='X';
  }
  else{
    nextSquares[i]='O';
  }
  onPlay(nextSquares);
  }
  const reset=()=>{
    for(let i=0;i<9;i++){
      squares[i]="";
    }
  }

const winner=calculateWinner(squares);
let status;
if(winner){
  status="Winner: "+winner;
}
else{
  status='Next Player :'+(xIsNext?'X':'O');
}

  return (
    <div className="board">
      <div id="turn">Tic Tac Toe</div>
      <div className="status">{status}</div>
      
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handelClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handelClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handelClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handelClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handelClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handelClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handelClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handelClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handelClick(8)} />
    </div>
   
    </div>
  )
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(squares[a] && squares[a]===squares[b]  && squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}


export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
    
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      
        <ol>{moves}</ol>

      </div>
     
    
  );
}