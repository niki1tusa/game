class Sprite {
    constructor({position, imageSrc, scale = 1, frame = 1}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image() 
        this.image.src = imageSrc
        this.scale = scale
        this.frame = frame

    }
    draw(){
   ctx.drawImage(
            this.image, 
            this.currFrame * (this.image.width / this.frame),
            0,
            this.image.width / this.frame,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.frame) * this.scale,
            this.image.height * this.scale  

        ) 
    }
    update(){
        this.draw()
        
        // animate in slow motion 
        this.elapsFrame++
        if(this.elapsFrame % this.holdFrame === 0){
        if(this.currFrame < this.frame -1){
            this.currFrame++
        } else{
            this.currFrame = 0
        }}

    }
}


///
class Fighter extends Sprite{ 
    constructor({
        position, 
        velocity, 
        color = 'red', 
        offset, 
        imageSrc, 
        scale = 1, 
        frame = 1
    }){
super({
    position, 
    imageSrc, 
    scale, 
    frame
})
    
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey 
        this.attackRec = {
        position: {
               x: this.position.x,
               y: this.position.y
            },
        offset,
        width: 100,
        height: 50,
        }        
        this.color = color
        this.attacking
        this.health = 100
        this.currFrame = 0
        this.elapsFrame = 0
        this.holdFrame = 5


    }

    update(){
        this.draw()
        this.attackRec.position.x = this.position.x + this.attackRec.offset.x
        this.attackRec.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y        
        
        
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
         this.velocity.y = 0
        } 
        else {
            this.velocity.y += gravity
        }

    }
    attack(){
this.attacking = true;
setTimeout(() => {
    this.attacking = false
}, 100);
    }
}
