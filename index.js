const canvas = document.querySelector('canvas');

// Drawing our sprites and shapes on screen
// Canvas context
const c = canvas.getContext('2d')

// Resizing our canvas using Javascript, also doable in CSS (units are in pixels)
// 1024 x 576 pixels is a good size to fit on most screens
canvas.width = 1024;
canvas.height = 576;

// Select canvas context, use canvas API
// .fillRect() has four arguments: x-position, y-position, reactangle's width
c.fillStyle = 'salmon'
c.fillRect(0, 0, canvas.width, canvas.height);

let gravity = 0.5;

class Sprite {
  // Every class needs a constructor, is triggered everytime an instance of class is called
  // Creating property within a class constructor, must be prefaced with 'this'
  // Passing it in as an object will not require a specific parameter order when creating an instance
  // Velocity has x and y (2 dimensional, left/right & up/down )
  constructor({ position, velocity, color }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.color = color;
    this.attackBox = {
      // Attack box follows the sprite's location
      position: this.position,
      width: 100,
      height: 50
    };
    // Allows for more accurate movement tracking (i.e. if d is held down, then a is held while d is still held down)
    this.lastKeyPressed = "";

    this.isAttacking = false;
  }

  // Arbitrarily named, can be named whatever
  draw() {
    // Color must be defined BEFORE marking its position
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Draw attack box
    c.fillStyle = 'purple'
    c.fillRect(this.position.x, this.position.y, this.attackBox.width, this.attackBox.height)
  }

  // Updates sprites position
  update() {
    this.draw();
    // Update vertical position
    this.position.y += this.velocity.y;
    // Update horizontal position
    this.position.x += this.velocity.x;
    // y co-ordinates on canvas start at top. The canvas height ends at the bottom
    // if sprites are off canvas
    if (this.position.y + this.height >= canvas.height) {
      this.velocity.y = 0;
    }
    // if sprites are still on canvas
    if (this.position.y + this.height < canvas.height) {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }
}
// New instance of Spirte class, starting position is 0, 0
// Velocity is default at 0, 0. Means character will not move by default
const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  color: 'green'
});

const enemy = new Sprite({
  position: {
    x: 500,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  color: 'yellow'
});

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
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
};

// Adding gravity
// Creating an infinite loop to animate frame by frame
function animate() {

  window.requestAnimationFrame(animate);
  c.fillStyle = 'salmon'
  // Prevents 'paint' effect
  c.fillRect(0, 0, canvas.width, canvas.height);
  // Draw is already called in update
  player.update();
  enemy.update();
  // Stops sprites from moving if key is released
  player.velocity.x = 0;
  enemy.velocity.x = 0;


  if (keys.a.pressed === true && player.lastKeyPressed === 'a') {
    player.velocity.x = -10;
  }
  if (keys.d.pressed === true && player.lastKeyPressed === 'd') {
    player.velocity.x = 10;
  }
  if (keys.ArrowLeft.pressed === true && enemy.lastKeyPressed === 'ArrowLeft') {
    enemy.velocity.x = -10;
  }
  if (keys.ArrowRight.pressed === true && enemy.lastKeyPressed === 'ArrowRight') {
    enemy.velocity.x = 10;
  }

  // Detect for collision
  if (
    // x-axis check
    (player.attackBox.position.x + player.attackBox.width) >= enemy.position.x &&
    player.position.x < enemy.position.x + enemy.width &&
    // y-axis
    player.position.y === enemy.position.y &&
    player.isAttacking
  ) {
    console.log('Player has hit enemy')
  }
}

animate();


// Add event listener to move sprites
window.addEventListener('keydown', (event) => {

  if (event.key === 'a') {
    keys.a.pressed = true;
    player.lastKeyPressed = 'a';
  }

  if (event.key === 'd') {
    keys.d.pressed = true;
    player.lastKeyPressed = 'd';
  }

  if (event.key === 'w' && player.position.y >= 0) {
    keys.w.pressed = true;
    player.lastKeyPressed = 'w';
    player.velocity.y = -20;
  }

  if (event.key === ' ') {
    player.attack();
  }

  if (event.key === 'ArrowRight') {
    keys.ArrowRight.pressed = true;
    enemy.lastKeyPressed = 'ArrowRight';
  }

  if (event.key === 'ArrowLeft') {
    keys.ArrowLeft.pressed = true;
    enemy.lastKeyPressed = 'ArrowLeft';
  }

  if (event.key === 'ArrowUp') {
    keys.ArrowUp.pressed = true;
    enemy.lastKeyPressed = 'ArrowUp';
    enemy.velocity.y = -20
  }

  if (event.key === '/') {
    enemy.attack();
  }
})

window.addEventListener('keyup', (event) => {

  if (event.key === 'd') {
    keys.d.pressed = false
  }
  if (event.key === 'a') {
    keys.a.pressed = false
  }
  if (event.key === 'w') {
    keys.ArrowLeft.pressed = false
  }
  if (event.key === 'ArrowRight') {
    keys.ArrowRight.pressed = false
  }
  if (event.key === 'ArrowLeft') {
    keys.ArrowLeft.pressed = false
  }
  if (event.key === 'ArrowUp') {
    keys.ArrowLeft.pressed = false
  }
})