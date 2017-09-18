let LANG = {
  reset: 'Already choose public cards, click reset button to reset',
  hand: 'Please choose 2 hand cards!',
  pub: 'Please choose 0~4 public public cards',
  player: 'Player',
  hc: 'Hand cards',
  pc: 'Public cards',
  more: 'Please select 2 or more players!',
  de: '\'s'
}
const RANDOMTIMES = 10000
const SUITS = ['spade', 'heart', 'club', 'diamond']
const VALUES = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const allCards = arrayMultiply(SUITS, VALUES)
let playerCount = 0
let handCards = []
let publicCards = []
let winRecords = []
let winRates = []

// use var instead of let, because of a bug in safari:
// let someID = document.getElementById('someID') will throw an error
var chosen = id('chosen')
var info = id('info')
var handButton = id('chooseHandCards')
var pubButton = id('public')
var calcButton = id('calc')
var resetButton = id('reset')
var pokers = document.querySelectorAll('.container .poker')

handButton.addEventListener('click', function () {
  let selectedPokers = document.querySelectorAll('.container .selected')
  if (selectedPokers.length !== 2) {
    // alert('Please choose 2 hand cards!')
    alert(LANG.hand)
  } else {
    let s = '<div class="cards">'
    let hc = []
    for (let i = 0; i < selectedPokers.length; i++) {
      hc.push(selectedPokers[i].id.split('_'))
      selectedPokers[i].classList.remove('selected')
      s += selectedPokers[i].outerHTML
    }
    handCards.push(hc)
    s += '<span> ' + LANG.player + ' ' +
    (playerCount + 1) + ' ' + LANG.de +
    LANG.hc + '</span><hr /></div>'
    playerCount += 1
    chosen.innerHTML += s
  }
})

pubButton.addEventListener('click', function () {
  let selectedPokers = document.querySelectorAll('.container .selected')
  let slen = selectedPokers.length
  if (publicCards.length) {
    // alert('Already choose public cards, click reset button to reset')
    alert(LANG.reset)
  } else if (slen >= 5) {
    // alert('Please choose 0~4 public public cards')
    alert(LANG.pub)
  } else {
    if (slen === 0) return;
    let s = '<div class="cards">'
    for (let i = 0; i < slen; i++) {
      publicCards.push(selectedPokers[i].id.split('_'))
      selectedPokers[i].classList.remove('selected')
      s += selectedPokers[i].outerHTML
    }
    s += '<span> ' + LANG.pc + '</span><hr /></div>'
    chosen.innerHTML += s
  }
})

calcButton.addEventListener('click', function () {
  if (handCards.length < 2) {
    // alert('Please select 2 or more players!')
    alert(LANG.more)
  } else {
    calcButton.disabled = 'true'
    setTimeout(function () {
      calculate()
      showResult()
    }, 100)
  }
})

resetButton.addEventListener('click', function () {
  winRecords = [0, 0, 0]
  playerCount = 0
  handCards = []
  publicCards = []
  chosen.innerHTML = ''
  info.innerHTML = ''
  let scards = document.getElementsByClassName('selected')
  scards = Array.prototype.slice.call(scards)
  for (let i = 0; i < scards.length; i++) {
    scards[i].classList.remove('selected')
  }
})

window.onload = function () {
  for (let i = 0; i < pokers.length; i++) {
    pokers[i].onclick = triggerSelected(i)
  }
}

function triggerSelected (i) {
  return function () {
    pokers[i].classList.toggle('selected')
  }
}

function showResult () {
  let s = ''
  for (let i = 0; i < winRecords.length; i++) {
    s += '<tr><td>' + (i + 1) + '</td><td>' +
    toPercent(winRates[i]) + '</td></tr>'
  }
  info.innerHTML = s
  calcButton.disabled = ''
}

function calculate () {
  winRecords = Array(handCards.length).fill(0)
  let allSelectedCards = []

  for (let i = 0; i < handCards.length; i++) {
    for (let j = 0; j < handCards[i].length; j++) {
      allSelectedCards.push(handCards[i][j])
    }
  }

  allSelectedCards = allSelectedCards.concat(publicCards)
  let leftCards = arrayWithout(myConcat(allCards), myConcat(allSelectedCards))
  let short = 5 - publicCards.length
  let possibilities = combNumber(leftCards.length, short)
  // console.log(leftCards.length, short, possibilities)

  if (possibilities < RANDOMTIMES) {
    let indexes = Array(leftCards.length).fill(0).map((v, i) => i)
    let combs = combination(indexes, short)
    for (let i = 0; i < combs.length; i++) {
      let addedCards = [].concat(publicCards)
      combs[i].forEach(v => addedCards.push(leftCards[v].split('_')))
      let winners = whoWin(addedCards, handCards)
      winners.forEach(v => winRecords[v]++)
    }
    winRates = winRecords.map(v => (v / possibilities).toPrecision(4))
  } else {
    for (let count = 0; count < RANDOMTIMES; count++) {
      let randomPickedCards = []
      let publicCardsCopy = publicCards.slice(0)
      let randomPickedNums = randomPick(leftCards.length, 5 - publicCards.length)

      for (let i = 0; i < randomPickedNums.length; i++) {
        randomPickedCards.push(leftCards[randomPickedNums[i]])
      }
      for (let i = 0; i < randomPickedCards.length; i++) {
        publicCardsCopy.push(randomPickedCards[i].split('_'))
      }

      let winners = whoWin(publicCardsCopy, handCards)
      for (let i = 0; i < winners.length; i++) {
        winRecords[winners[i]]++
      }
    }
    winRates = winRecords.map(v => v / RANDOMTIMES)
  }
}

// 输入5张公共牌和所有玩家手牌，输出胜利的玩家(们)的index数组
function whoWin (publicCards, handCards) {
  let combs = combination([0, 1, 2, 3, 4, 5, 6], 5)
  let maxes = Array(handCards.length).fill(0)
  for (let i = 0; i < handCards.length; i++) {
    let sevenCards = publicCards.concat(handCards[i])
    for (let j = 0; j < combs.length; j++) {
      let fiveCards = []
      for (let k = 0; k < combs[j].length; k++) {
        fiveCards.push(sevenCards[combs[j][k]])
      }
      let cardsValue = getCardsValue(fiveCards)
      if (maxes[i] < cardsValue) {
        maxes[i] = cardsValue
      }
    }
  }
  let result = []
  let max = Math.max.apply(null, maxes)
  maxes.map(function (x, i) {
    if (x === max) {
      result.push(i)
    }
  })
  return result
}
