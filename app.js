let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector('#reset')
let msgContainer = document.querySelector('.msg-container')
let newBtn = document.querySelector('#new-game')
let msg = document.querySelector('#msg')

let turnO = true; //to track which player's turn it is
let count = 0; //to call a game draw. There are 9 boxes. we count until it becomes 9. If at that point no one has won the game it is a draw.
const winningPatterns = [
    [0,1,2] , 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
];
//in a 3*3 these are the patterns that can decide a winner. we used 2D array to store them.

//to set every box value to empty in case of a game reset.
const resetValue = (box) => {
    box.innerText = ''
}

//to disable a box once we have already used it
const disableBox = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

//in case of reset or new game we need to enable the boxes again
const enableBox = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        resetValue(box)
    })
}

//resets game.
const resetGame = () => {
    turnO = true;
    msgContainer.classList.add('hide')
    enableBox();
}

//starts new game
const newGame = () => {
    resetGame();
}

//main function where we select boxes on base of turn and see if we have a winner or a draw
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO){
            box.innerText = 'O'
            box.classList.add('dark')
            box.classList.remove('red')
            turnO = false
        } else {
            box.innerText = 'X'
            box.classList.add('red')
            box.classList.remove('dark')
            turnO = true
        }
        count += 1;
        console.log(count)
        if(count === 9) {
            drawGame();
        }
        box.disabled = true;
        checkWinner();
    })
})

//winner msg on screen
const showWinner = (winner) => {
    msg.innerHTML = `Congratulation , winner is ${winner}`;
    msgContainer.classList.remove('hide')
    disableBox()
    count = 0;
}

/*checking the box values with winning patterns. we pick a single pattern from an array where each pattern is an array itself. 
Now through 'pattern' we get a single array, we can acces it like normal arrays using index values
in pos variable we get the values of each individual box. we compare to check 
1- non empty
2- if they are same */
const checkWinner = () => {
    for (let pattern of winningPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;  

            if(pos1 != "" && pos2 != "" && pos3 != ""){
                if(pos1 === pos2 && pos2 === pos3){
                    showWinner(pos1);
                }
            }
    }
}

//draw game msg
const drawGame = () => {
    msg.innerHTML = `That is a Draw. Try again.`;
    msgContainer.classList.remove('hide')
    disableBox()
    count = 0;
}

//reset button functionality
resetBtn.addEventListener('click' , () => {
    resetGame()
})

//new button functionality
newBtn.addEventListener('click', () => {
    newGame();
})