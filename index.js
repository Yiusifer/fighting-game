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
c.fillRect(0, 0,canvas.width, canvas.height);

let gravity = 0.2;

class Sprite {
  // Every class needs a constructor, is triggered everytime an instance of class is called
  // Creating property within a class constructor, must be prefaced with 'this'
  // Passing it in as an object will not require a specific parameter order when creating an instance
  // Velocity has x and y (2 dimensional, left/right & up/down )
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  // Arbitrarily named, can be named whatever
  draw() {
    // Color must be defined BEFORE marking its position
    c.fillStyle = 'honeydew'
    c.fillRect(this.position.x, this.position.y, 50, this.height );
  }

  // Updates sprites position
  update() {
    this.draw();
    // Update vertical position
    this.position.y += this.velocity.y;
    // y co-ordinates on canvas start at top. The canvas height ends at the bottom
    // if sprites are off canvas
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      // if sprites are still on canvas
    } else {
      this.velocity.y += gravity;
    }
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
    y: 0
  }
});

const enemy  = new Sprite({
  position: {
    x: 500,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  }
});

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
}

animate();

// Add event listener to move sprites
window.addEventListener('keydown', (event) => {

  if (event.key === 'd') {
    player.position.x += 10;
  }

  if (event.key === 'a') {
    player.position.x -= 10;
  }

  if (event.key === 'ArrowRight') {
    enemy.position.x += 10;
  }

  if (event.key === 'ArrowLeft') {
    enemy.position.x -= 10;
  }


})