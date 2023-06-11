/* this will use an object to do the dice game */



// first we set our object
const diceGame = {
  //global variables
  _player1Roll: 0,
  _player2Roll: 0,
  _p1Money: 50,
  _p2Money: 50,
  _currentPot: 0,
  _originalPricePerRound: 10, // maybe set this up later to properly double the price
  _pricePerRound: 10,
  _p1RoundWins: 0,
  _p2RoundWins: 0,
  _totalRounds: 0,
  _rounds: 1000,
  // we roll one dice
  roll () {
    return Math.ceil(Math.random()*6);
  },
  //we add two dice rolls 
  roll2 (){
    return diceGame.roll() + diceGame.roll();
  },
  // we gain the ability to set and get player1roll
  set player1Roll (roll) {
    this._player1Roll = roll;
  },
  get player1Roll () {
    return this._player1Roll;
  },
  //we gain the ability to set and get player2roll
  set player2Roll (roll) {
    this._player2Roll = roll;
  },
  get player2Roll () {
    return this._player2Roll;
  },
  //sets p1 money 
  set p1Money (amount) {
    this._p1Money = amount;
  },
  // sets p2 money
  set p2Money (amount) {
    this._p2Money = amount;
  },
  // increase total Rounds counter
  totalRoundsIncrease () {
    this._totalRounds ++;
    if (this._totalRounds === this._rounds) {
      console.log(`We are doubling the round cost`);
      this._pricePerRound *= 2;
      this._rounds += 1000;

    }
  },
  // gets _totalRounds
  get totalRounds () {
    return this._totalRounds;
  },
  // set starting money for both players 
  startingMoneys() {
    amount = parseInt(prompt(`How Much Money Should Each Player Start Out With?`));
    this.p1Money = amount;
    this.p2Money = amount;
  },

  //we now are able to assign both players a new value
  playerRolls() {
    diceGame.player1Roll = this.roll2();
    this.player2Roll = this.roll2();
  },
  // function to compare p1 vs p2 
  compare (player1, player2) {
    this.totalRoundsIncrease();
    if (player1 > player2){
      return  this.winner('player1');      
    } else if (player2 > player1) {
      return this.winner('player2');
    } else {
      return this.winner('Tie');
    };
  },

  // increases p1 win counter
  p1Count () {
    this._p1RoundWins ++;
  },

  //increases p2 win counter
  p2Count () {
    this._p2RoundWins ++;
  },

  //resets win counters
  countReset () {
    this._p1RoundWins = 0;
    this._p2RoundWins = 0;
  },
  // shows total wins for each player 
  showCount () {
    console.log(`Player 1 has won a total of ${this._p1RoundWins} times, and Player 2 has won a total of ${this._p2RoundWins} times. A total of ${this.totalRounds} rounds were played. The Price Per Round at the end is ${this._pricePerRound}`);
  },
  // function to show the winner
  winner (name) {
    if (name === 'player1'){
      console.log(`Player 1 Wins!`);
      this.winBet('player1');
      this.p1Count();
      this.showMoneys();
    } else if (name === 'player2') {
        console.log(`Player 2 Wins!`);
        this.winBet('player2');
        this.p2Count();
        this.showMoneys();
    } else {
      console.log(`Its A Tie! Rolling Again... `);
      this.run();
    };
  },
  // this function will change setPricePerRound automagically for us. 
  setThePrice () {
    amount = parseInt(prompt('How much Should every round cost?'));
    this.pricePerRound = amount;
    console.log(`The new price is ${amount}`);

  },
  set pricePerRound (amount) {
    
    this._pricePerRound = amount ;
  },
  get pricePerRound () {
    return this._pricePerRound;
  },
  bet (amount) {
    this._currentPot += this.pricePerRound;
    this._p1Money -= this.pricePerRound;
    this._currentPot += this.pricePerRound;
    this._p2Money -= this.pricePerRound;
  },
  winBet (name) {
    if (name === 'player1') {
      this._p1Money += this._currentPot;
      this._currentPot -= this._currentPot;
    } else if (name === 'player2') {
        this._p2Money += this._currentPot;
        this._currentPot -= this._currentPot;
    } else {
      console.log('Problem with winBet');
    }
  },
  // this will display both players Totals
  showMoneys () {
    console.log(`Player 1 has ${this._p1Money}, and player 2 has ${this._p2Money}.`);
  },
  playToZero () {
    this.setThePrice();
    this.startingMoneys();
    do {
      this.run();
      if (this._p1Money <= 0 || this._p2Money <= 0) {
        this.showCount();
        
      }
    } while (this._p1Money > 0 && this._p2Money > 0);
  },

  //.  -----This is where we run ----
  run () {
    this.bet(this._pricePerRound);
    this.playerRolls();
    this.compare(this._player1Roll, this._player2Roll);
  }

};
// simplify the comands
const run = () => diceGame.run();

const setPrice = () => diceGame.setThePrice();

const getPrice = () => diceGame.pricePerRound;

const runTaZero = () => diceGame.playToZero();


//we run 
//run();
runTaZero();

// Testing 
