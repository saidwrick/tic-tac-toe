const gameBoard = (() => {
    let board = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']];

    const container = document.querySelector(".container");

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute('data-x', i);
            square.setAttribute('data-y', j);
            square.addEventListener('click', function(){
                playMove("X", square);
            })
            container.appendChild(square);
        }
    }

    function playMove (move, square) {
        if (square.innerHTML == ""){
            square.innerHTML = move;
            board[square.getAttribute('data-x')][square.getAttribute('data-y')] = move;
        }
    }

    const gameEnd = () => {
        if (rowsWin() || columnsWin() || diagonalWin()){
            console.log("true");
            return true;
        }
        else{
            console.log("false");
            return false;
        }
    }
    
    function rowsWin(){
        for (let i = 0; i < 3; i++){
            let j = 0;
            if (board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2]){
                return true;
            }
        }
    }

    function columnsWin(){
        for (let j = 0; j <3; j++){
            let i = 0;
            if (board[i][j] == board[i+1][j] && board[i][j] == board[i+2][j]){
                return true;
            }
        }
    }

    function diagonalWin(){
        if ((board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
            (board[2][0] == board[1][1] && board[2][0] == board[0][2]))
            return true;
    }
    
    // could also count 9 moves total

    const gameDraw = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (!(board[i][j] == "X" || board[i][j] == "O")){
                    return false;
                }
            }
        }
        return true;
    }

    return {gameEnd, gameDraw
    };
  })();