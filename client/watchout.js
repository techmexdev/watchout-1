// start slingin' some d3 here.
var dragDrop = function (dragmove) {
  var drag = d3.behavior.drag()
                        .on('drag', dragmove);
  return drag;
};

var dragmove = function(d) {
  d.x += d3.event.dx;
  d.y += d3.event.dy;
  d3.select(this).attr('transform', 'translate(' + d.x + ', ' + d.y + ')');
};
var highSpan = d3.select('.highscore').selectAll('span');
var currentScore = d3.select('.current').selectAll('span');
var collisions = d3.select('.collisions').selectAll('span');
var previousCollision = false;
var collisionCount = 0;
var score = 0;
var highScore = 0;




var gameBoard = d3.select('.board').append('svg')
                  .attr('width', '700px')
                  .attr('height', '450px')
                  .style('background-color', 'violet');

var axes = {x: d3.scale.linear().domain([0, 100]).range([0, 700]),
            y: d3.scale.linear().domain([0, 100]).range([0, 450])
};

var player = function() {
  var array = [{id: 'player', x: 50, y: 50}];

  var shape = d3.select('svg').selectAll('rect')
                .data(array, function(d) {
                  return d.id;
                });

  shape.enter().append('rect')
        .attr('x', 350)
        .attr('y', 225)
        .attr('fill', 'red')
        .attr('width', '15')
        .attr('height', '15')
        .attr('stroke', 'blue')
        .attr('stroke-width', '2')
        .call(dragDrop(dragmove));

};

var enemies = d3.select('svg').selectAll('circle')
                          .data(d3.range(30));


enemies.enter().append('circle')
        .attr('class', 'enemy')
        .attr('r', 10)
        .attr('cx', (d) => axes.x(Math.random() * 100))
        .attr('cy', (d) => axes.y(Math.random() * 100));

enemies.exit().remove();

var update = function(asteroids) {
  asteroids.transition().duration(1500)
        .attr('cx', (d) => axes.x(Math.random() * 100))
        .attr('cy', (d) => axes.y(Math.random() * 100))
        // .tween('collision', collisionDetection)
        .each('end', function() {
          update(d3.select(this));
        });


};

update(enemies);

player();

var constantScores = function() {
  score += 1;
  if (score > highScore) {
    highScore = score;
    highSpan.text(highScore);
  }
  currentScore.text(score);
};

setInterval(constantScores, 1000);

var collisionDetection = function() {  
  var user = d3.select('rect');
  var collision = false;

  enemies.each(function() {
    thisCircle = d3.select(this);
    dx = thisCircle.attr('cx') - (user.attr('x'));
    dy = thisCircle.attr('cy') - (user.attr('y'));
    distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance < +thisCircle.attr('r') + 15) {
      collision = true;
    }
  });
  if (collision) {
    score = 0;
    if (previousCollision === collision) {
      console.log('collided');
      collisionCount += 1;
      collisions.text(collisionCount);
      currentScore.text('0');
    }
    previousCollision = collision;
  }
};

previousCollision = false;
// var timer = new Timer;

// d3.timer(collisionDetection);
setInterval(collisionDetection, 50);
