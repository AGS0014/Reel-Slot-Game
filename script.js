//List of symbols to be used in the game
const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉'];
let spins = 1;
let totalWin = 0;

//yha symbols naam ke array mein hum fruits ko store kar rahe hain jo reel pe dikhayi denge. 
//spins variable track karta hai kitni baar game chalayi gayi hai, aur totalWin track karta hai total winnings ko.

document.addEventListener('DOMContentLoaded', () => {                     
    const gameBoard = document.getElementById('game-board');               
    const spinButton = document.getElementById('spin-button');             
    const playAgainButton = document.getElementById('play-again-button');  
    const result = document.getElementById('result');                      
    const totalWinDisplay = document.getElementById('total-win');          
    
    //function to create the initial board

CreateBoard() ka kaam hai game board ko initialize karna, yaani ki jab bhi page load ho ya hum game
 reset karen, toh naya 3x3 grid banaye. Yeh function har baar grid ke har ek cell ko random symbol assign karta hai	
 
    function CreateBoard() 
    {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) { 
            const cell = document.createElement('div'); 
            cell.classList.add('cell');
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]; 
            cell.textContent = randomSymbol; 
            gameBoard.appendChild(cell);
        }
    }

    //function to spin the reels and update the symbols
    //Math.floor(Math.random())

    function spinReels() {
		
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]; //Har cell ke liye hum ek random symbol choose kar rahe hain
            cell.textContent = randomSymbol; //Jo random symbol humne upar select kiya, usse hum cell ke text content mein assign kar rahe hain.
        });
        // Calling the function to check the win
        checkWin();
    }

    // function to check if there are any wining combination
	// checkWin() ka kaam hai har spin ke baad dekhna ki koi winning combination bana hai ya nahi
    function checkWin() {
        const cells = document.querySelectorAll('.cell');
        let win = false; // ye ek flag variable le lete hai 
		

        // Check rows and columns for matching symbols
        for (let i = 0; i < 3; i++) { //Yeh loop 3 baar chalega kyunki hum grid ke 3 rows aur 3 columns ko check kar rahe hain.
            const row = [cells[i * 3], cells[i * 3 + 1], cells[i * 3 + 2]]; // suno ye important logic 
			//Yeh line har row ko define kar rahi hai. i * 3 ka matlab hai row ke pehle cell ka index. Example:
            //Jab i = 0 ho, toh yeh row select karega: cells[0], cells[1], cells[2] (pehli row).
            //Jab i = 1 ho, toh yeh row select karega: cells[3], cells[4], cells[5] (dusri row).
            const column = [cells[i], cells[i + 3], cells[i + 6]];
			

          //Yeh line har column ko define kar rahi hai. Example:
          //Jab i = 0 ho, toh yeh column select karega: cells[0], cells[3], cells[6] (pehla column).
          //Jab i = 1 ho, toh yeh column select karega: cells[1], cells[4], cells[7] (dusra column).

            if (checkMatch(row) || checkMatch(column)) { // yha row aur dono ko check kr rhe h 
                win = true;
                break;
            }
        }

        if (win) {
            result.textContent = 'You won 10 Rs and 1 free game!';
            totalWin += 10;
            spins++;
        } else {
            result.textContent = 'No win this time. Game over.';
            spinButton.disabled = true;
            playAgainButton.disabled = false;
        }

        totalWinDisplay.textContent = `Total Win: ${totalWin} Rs`;
    }


    // Helper function check all symnol in row and col are match
      function checkMatch(cells) 
      {
        return cells.every(cell => cell.textContent === cells[0].textContent);
      }

     //Event listner for spin button
     spinButton.addEventListener('click', spinReels);
 
     //Event listnert for the play again button 
     playAgainButton.addEventListener('click', () => {
        spins =1;
        totalWin = 0;
        spinButton.disabled = false;
        playAgainButton.disabled = true;
        result.textContent = '';
        totalWinDisplay.textContent = '';
        CreateBoard();
     });

     // create the initialgame board when page load
     CreateBoard();
});