// collision
function recCollision({rec1, rec2}){
    return (    rec1.attackRec.position.x + rec1.attackRec.width >= rec2.position.x &&
        rec1.attackRec.position.x <= rec2.position.x + rec2.width &&
        rec1.attackRec.position.y + rec1.attackRec.height >= rec2.position.y &&
        rec1.attackRec.position.y <= rec2.position.y + rec2.height )
}
// condition winner
function winner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('.textInCenterGame').style.display = 'flex'
    if(player.health === enemy.health){
    document.querySelector('.textInCenterGame').innerHTML = 'Tie' 
}  else if(player.health > enemy.health){
    document.querySelector('.textInCenterGame').innerHTML = 'Win player'
}   else{
    document.querySelector('.textInCenterGame').innerHTML = 'Win enemy'  
}
}



// timer
let store = 60
let timerId;
function countTimer(){
timerId = setTimeout(countTimer, 1000)
if(store > 0){
    store--
    document.querySelector('.timer').innerHTML = store
}

if(store === 0 ){
    winner({player, enemy, timerId})
}
}