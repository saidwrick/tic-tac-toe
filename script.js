const gameBoard = (() => {
    let board = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']];

    const container = document.querySelector(".container");
    
    const endBanner = document.querySelector(".end-banner");

    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener('click', function(){
        if (playGame.checkGameStart() == true){
            endBanner.style.visibility = "hidden";
            playGame.gameStart();
        }
    })

    const newBoard = () => {
        container.innerHTML = "";

        board = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']];

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                let square = document.createElement("div");
                square.classList.add("square");
                square.setAttribute('data-x', i);
                square.setAttribute('data-y', j);
                square.addEventListener('click', function(){

                    playMove(playGame.currentPlayer().getMove(), square);

                    if (gameWin() == true){
                        endBanner.innerHTML = (playGame.currentPlayer().getName() + " wins!");
                        endBanner.style.visibility = "visible";
                    }
                    else if (gameDraw() == true){
                        endBanner.innerHTML = ("Draw!");
                        endBanner.style.visibility = "visible";
                        playGame.getPlayers()[1].switchTurn();
                        playGame.getPlayers()[0].switchTurn();
                    }
                    else{
                        playGame.getPlayers()[1].switchTurn();
                        playGame.getPlayers()[0].switchTurn();
                    }
                })

                container.appendChild(square);
            }
        }
    }

    function playMove (move, square) {
        if (square.innerHTML == ""){
            square.innerHTML = move;
            board[square.getAttribute('data-x')][square.getAttribute('data-y')] = move;
        }
    }

    const gameWin = () => {
        if (rowsWin() || columnsWin() || diagonalWin()){
            return true;
        }
        else{
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

    return {gameWin, gameDraw, newBoard};
  })();

  const Player = (playerName, move, currentTurn) => {
    const getName = () => playerName;
    const getMove = () => move;
    const getCurrentTurn = () => {return currentTurn};
    const switchTurn = () => {
        currentTurn = currentTurn !== true;
    }
    return {getName, getMove, getCurrentTurn, switchTurn};
  }

const playGame = (() => {
    let players = [];
    const playerOneEnter = document.querySelector(".player-1-button");
    playerOneEnter.addEventListener('click',function(){
        if (playerOneEnter.previousElementSibling.value != ""){
            const playerOne = Player (playerOneEnter.previousElementSibling.value, "X", true)
            players.push(playerOne);
            playerOneEnter.parentElement.innerHTML = playerOne.getName() + " [" + playerOne.getMove()+"]";
            if (checkGameStart() == true){
                gameStart();
            }
        };
    })
    const playerTwoEnter = document.querySelector(".player-2-button");
    playerTwoEnter.addEventListener('click',function(){
        if (playerTwoEnter.previousElementSibling.value != ""){
            const playerTwo = Player (playerTwoEnter.previousElementSibling.value, "O", false)
            players.push(playerTwo);
            playerTwoEnter.parentElement.innerHTML = playerTwo.getName() + " [" + playerTwo.getMove()+"]";
            if (checkGameStart() == true){
                gameStart();
            }
        };
    })

    const checkGameStart = () =>{
        if(players.length > 1){
            return true;
        }
    }

    const gameStart = () => {
        gameBoard.newBoard();
    }

    const currentPlayer = () => {
        let current = "";
        players.forEach(e =>{
            if (e.getCurrentTurn()==true){
                current = e;
            }
        })
        return current;
    }

    const getPlayers = () => players;
    return{getPlayers, currentPlayer, checkGameStart, gameStart};

})();