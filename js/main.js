const canvas = document.getElementById('canvasId');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.5;
//

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background/background.png'
})
const shop = new Sprite({
    position: {
        x: 700,
        y: 225
    },
    imageSrc: './img/decorations/shop_anim.png',
    scale: 2,
    frame: 6
})
//
const player = new Fighter({
position: {
    x: 0, 
    y: 0
},
velocity: {
    x: 0, 
    y: 1
},
offset: {
    x: 0,
    y: 0
},
imageSrc: './img/hero/Idle.png',
frame: 10,
})
//
const enemy = new Fighter({
    position: {
        x: 200,
        y: 200
    },
    velocity: {
        x: 0, 
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50, 
        y: 0
    } 
    
})
//
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

countTimer()
//
function animate(){
   
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.heigt)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()



player.velocity.x = 0
enemy.velocity.x = 0
// movement player
if(keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -1
} else if(keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 1
} 
// movement enemy
if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
enemy.velocity.x =1
} else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
enemy.velocity.x = - 1
}

// detect for collision 
if( recCollision({
    rec1: player,
    rec2: enemy
}) && player.attacking){
    player.attacking = false
    enemy.health -= 20
    document.querySelector('.enemyHpMain').style.width = enemy.health + '%'
}
if( recCollision({
    rec1: enemy,
    rec2: player
}) && enemy.attacking){
    enemy.attacking = false
    player.health -= 20
    document.querySelector('.playerHpMain').style.width = player.health + '%'
}

// condition winner by HP
if(enemy.health <= 0 || player.health <= 0 ){
    winner({player, enemy, timerId})
}

//  if(player.position.x > canvas.width - 50){
//     player.velocity.x = 0
//  }
}


animate()

//
window.addEventListener('keydown', (e)=>{
switch(e.key){
case 'd': 
keys.d.pressed = true
player.lastKey = 'd'
break
case 'a': 
keys.a.pressed = true
player.lastKey ='a'
break
case 'w': 
keys.w.pressed = true
player.velocity.y = -10
player.lastKey ='w'
break
case ' ':
    player.attack()
    break;
case 'ArrowRight': 
keys.ArrowRight.pressed = true
enemy.lastKey = 'ArrowRight'
break
case 'ArrowLeft': 
keys.ArrowLeft.pressed = true
enemy.lastKey = 'ArrowLeft'
break
case 'ArrowUp': 
keys.ArrowUp.pressed = true
enemy.velocity.y = -10
enemy.lastKey = 'ArrowUp'
break
case 'ArrowDown':
    enemy.attacking = true
}
})
window.addEventListener('keyup', (e)=>{
switch(e.key){
case 'd': 
keys.d.pressed = false
break
case 'a': 
keys.a.pressed = false
break
case 'w': 
keys.w.pressed = false
player.lastKey ='w'
break
case 'ArrowRight': 
keys.ArrowRight.pressed = false
break
case 'ArrowLeft': 
keys.ArrowLeft.pressed = false
break
case 'ArrowUp': 
keys.ArrowUp.pressed = false
enemy.lastKey = 'ArrowUp'
break
}
})