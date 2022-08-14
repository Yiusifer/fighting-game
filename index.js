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

class Sprite {
  // Every class needs a constructor, is triggered everytime an instance of class is called
  // Creating property within a class constructor, must be prefaced with 'this'
  constructor(position) {
    this.position = position;
  }

  // Arbitrarily named, can be named whatever
  draw() {
    // Color must be defined BEFORE marking its position
    c.fillStyle = 'honeydew'
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }
}
// New instance of Spirte class, starting position is 0, 0
const player = new Sprite({
  x: 0,
  y: 0
});

const enemy = new Sprite({
  x: 900,
  y: 0
})
// Calling the draw method defined in Sprite
player.draw();
enemy.draw();

console.log(player)