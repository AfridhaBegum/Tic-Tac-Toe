const cells =document.querySelectorAll('.cell')
const titleheader = document.querySelector('#titleheader')
const xplayerdispplay= document.querySelector('#xplayer')
const oplayerdisplay = document.querySelector('#oplayer')
const restartbtn= document.querySelector('#restartbtn')

let player='X'
let isPauseGame=false
let isGameStart=false

const inputCell= ['','','',
                  '','','',
                  '','','']
const winCondition = [
    [0,1,2] , [3,4,5], [6,7,8],
    [0,3,6] , [1,4,7], [2,5,8],
    [0,4,8] , [2,4,6]
]

cells.forEach((cell,index) => {
    cell.addEventListener('click' , () => tapCell(cell,index))
})

function tapCell(cell,index){
    if(cell.textContent == '' && !isPauseGame)
    {
        isGameStart=true
        updateCell(cell,index)

        if (!checkWinner()){
            changePlayer()
            randomPick()
        }
    }
}

function updateCell(cell,index){
    cell.textContent = player
    inputCell[index] =player
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick(){
    isPauseGame=true

    setTimeout(() => {
        let randomIndex
        do{
            randomIndex = Math.floor(Math.random() * inputCell.length)
        }while(
            inputCell[randomIndex] !=''
        )
        updateCell(cells[randomIndex],randomIndex,player)

        if (!checkWinner()){
            changePlayer()
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    },1000)
}

function checkWinner(){
    for (const [a,b,c] of winCondition){
        if (inputCell[a] == player && 
            inputCell[b] == player &&
            inputCell[c] == player
        ){
            declareWinner ([a,b,c])
            return true
        }
    }
    if (inputCell.every(cell => cell != '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices){
    titleheader.textContent = `${player} Win!!`
    isPauseGame=true

    winningIndices.forEach((index) =>
        cells[index].style.background ='#2A2343')
    restartbtn.style.visibility = 'visible'
}

function declareDraw(){
    titleheader.textContent= 'Draw!'
    isPauseGame=true
    restartbtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
    if (!isGameStart){
        player=selectedPlayer
        if (player =='X'){
            xplayerdispplay.classList.add('player-active')
            oplayerdisplay.classList.remove ('player-active')
        }
        else{
            xplayerdispplay.classList.remove('player-active')
            oplayerdisplay.classList.add('player-active')
        }
    }
}

restartbtn.addEventListener('click',() => {
    restartbtn.style.visibility = 'hidden'
    inputCell.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background =''
    })
    isPauseGame=false
    isGameStart=false
    titleheader.textContent = 'choose'
})