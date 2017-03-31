// start slingin' some d3 here.
var gameBoard = d3.select('.board').append('svg')
                  .attr('width', '700px')
                  .attr('height', '450px')
                  .style('background-color', 'violet');

var makeEnemy = function() {
  var array = [];
  for (var i = 0; i <= 30; i++) {
    array.push(i);
  }

  return array.map((n) => {
    return {id: n, x: Math.random() * 100, y: Math.random() * 100};
  });
};

var axes = {x: d3.scale.linear().domain([0, 100]).range([0, 700]),
            y: d3.scale.linear().domain([0, 100]).range([0, 450])
};

var update = function(data) {
  // debugger;

  var enemies = d3.select('svg').selectAll('circle')
                            .data(data, function(d) {
                              console.log(d.id);
                              return d.id;
                            });

  enemies.enter().append('circle')
          .attr('class', 'enemy')
          .attr('cx', (d) => axes.x(d.x))
          .attr('cy', (d) => axes.y(d.y))
          .attr('r', 10);
};
var asteroids = makeEnemy();
console.log(gameBoard);
update(asteroids);





