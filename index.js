const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl')
const startGame= document.getElementById('StartGame')
const modalEl= document.getElementById('modalEl')
const bigScoreEl= document.getElementById('bigScoreEl')

canvas.width= innerWidth
canvas.height = innerHeight

function init() {
   tower = new Tower (x, y, 20, 'blue' )
   cannonballss = []
   arrowss =[]
   apples =[]
   score = 0
   scoreEl.innerHTML = score
   bigScoreEl.innerHTML = score
   
};

const superman = {
  x: 840,
  y: 265,
  width: 45,
  height: 45,
};

const supermanImg = new Image();
supermanImg.src = 'VLNuANR.png';

const drawEverything = () => {
  context.drawImage(supermanImg, superman.x, superman.y, superman.width, superman.height);}

class Player{
  constructor( x, y, radius,color ){
    this.x = x
    this.y = y
    this.radius= radius
    this.color = color 
  }
  draw(){
    context.beginPath()
    context.arc(this.x, this.y
      ,this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color 
    context.fill()
  }
}

const player = new Player (300, 300, 20,'green' )
player.draw()


class Tower {
  constructor( x, y, radius, color,){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  
  draw() {
    context.beginPath()
    context.arc(this.x, this.y
      ,this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color 
    context.fill()
  }
}
class Cannonballs {
  constructor(x, y, radius, color, velocity){ 
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = velocity}

  draw() {
    context.beginPath()
    context.arc(this.x, this.y
      ,this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color 
    context.fill()}
  
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

class arrows {
  constructor(x, y, radius, color, velocity){ 
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = velocity}

  draw() {
    context.beginPath()
    context.arc(this.x, this.y
      ,this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color 
    context.fill()}
  
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

class apple {
  constructor(x, y, radius, color, velocity){ 
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = velocity}

  draw() {
    context.beginPath()
    context.arc(this.x, this.y
      ,this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color 
    context.fill()}
  
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}


const x = canvas.width /2
const y = canvas.height /2

let tower = new Tower (x, y, 50, 'blue' )

let cannonballss = []

let arrowss =[]

let apples = []


function showArrows (){
  setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10
    
    let x 
    let y 

    if (Math.random() <0.5){ 
     x = Math.random() <0.5 ? 0 - radius : canvas.width + radius
     y = Math.random() * canvas.height
    }
    else{
      x = Math.random() * canvas.width
      y = Math.random() <0.5 ? 0 - radius : canvas.height + radius
    }
    const color = 'yellow'
    const angle = Math.atan2(
      canvas.height/2-y,
      canvas.width/2-x
    )
    const velocity = {
      x : Math.cos(angle),
      y : Math.sin(angle)
    }

    arrowss.push (new arrows (x, y, radius, color, velocity))
  },10000)
}

function showApples (){
  setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10
    
    let x 
    let y 

    if (Math.random() <0.5){ 
     x = Math.random() <0.5 ? 0 - radius : canvas.width + radius
     y = Math.random() * canvas.height
    }
    else{
      x = Math.random() * canvas.width
      y = Math.random() <0.5 ? 0 - radius : canvas.height + radius
    }
    const color = 'pink'
    const angle = Math.atan2(
      canvas.height/2-y,
      canvas.width/2-x
    )
    const velocity = {
      x : Math.cos(angle),
      y : Math.sin(angle)
    }

    apples.push (new apple (x, y, radius, color, velocity))
  },10000)
}

let animationId 
let score = 0
function animate(){
  animationId = requestAnimationFrame(animate)
  context.fillStyle = 'RGB(0,0,0,0.1)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  tower.draw()
  player.draw()
  drawEverything()

  cannonballss.forEach((cannonballs, Index) => {
    cannonballs.update()
    if (cannonballs.x + cannonballs.radius < 0 ||
       cannonballs.x - cannonballs.radius > canvas.width ||
       cannonballs.y + cannonballs.radius < 0||
       cannonballs.y - cannonballs.radius > canvas.height
       ){
      setTimeout(() =>{
      
        cannonballss.splice(Index, 1)
      }, 0)
    }
   })

   apples.forEach((apple, appleIndex)=>{
     apple.update()
     const dist = Math.hypot(player.x - apple.x, player.y - apple.y)
     if (dist - player.radius - apple.radius <1){
      {
        score += 20
        scoreEl.innerHTML= score
        setTimeout(() =>{
          apples.splice(appleIndex, 1)
          cannonballss.splice(cannonballsIndex, 1)
        }, 0)
        
      }
     }
   })

  arrowss.forEach((arrows, index) => {
    arrows.update()
    const dist = Math.hypot(tower.x - arrows.x , tower.y - arrows.y )

    if (dist - arrows.radius - tower.radius < 1 ){ cancelAnimationFrame(animationId)
      modalEl.style.display = 'flex'
      score += 0
      bigScoreEl.innerHTML= score
    }

    cannonballss.forEach((cannonballs, cannonballsIndex) => {
      const dist = Math.hypot(cannonballs.x - arrows.x , cannonballs.y - arrows.y )
      if (dist - arrows.radius - cannonballs.radius < 1 )
      {
        score += 10
        scoreEl.innerHTML= score
        setTimeout(() =>{
          arrowss.splice(index, 1)
          cannonballss.splice(cannonballsIndex, 1)
        }, 0)
        
      }
    }) 
    arrowss.forEach((arrows, index) =>{
      arrows.update()
      const dist = Math.hypot(player.x - arrows.x , player.y - arrows.y)

      if (dist - arrows.radius- player.radius <1){cancelAnimationFrame(animationId)
        modalEl.style.display = 'flex'
      score += 0
      bigScoreEl.innerHTML= score
      }
      
    })
     cannonballss.forEach((cannonballs, cannonballsIndex ) =>{
       cannonballs.update()
       const dist = Math.hypot(player.x - cannonballs.x, player.y - cannonballs.y)

       if(dist -player.radius - cannonballs.radius <1){
        cancelAnimationFrame(animationId)
        modalEl.style.display = 'flex'
      score += 0
      bigScoreEl.innerHTML= score
       }
     })
    
  })
}


addEventListener(
  'click', (event) =>
  { 
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2)

    const velocity = {
      x : Math.cos(angle),
      y : Math.sin(angle)
    }

    cannonballss.push(new Cannonballs(canvas.width/2, canvas.height/2, 5, 'red', velocity))
  }
)
addEventListener('keydown', event => {
  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
      if (player.x >= 10) player.x -= 20;
      break;
    case 'ArrowRight':
    case 'KeyD':
      if (player.x <= (canvas.width - 20)) player.x += 20;
      break;
    case 'ArrowUp':
    case 'KeyW':
      player.y -= 20;
      break;
    case 'ArrowDown':
    case 'KeyS':
      player.y += 20;
      break;
    default:
      console.log('You can use only arrows and ASDW!');
  }
});
startGame.addEventListener('click',()=>{
  init()
  animate()
  showArrows ()
  showApples ()
  modalEl.style.display = 'none'
})