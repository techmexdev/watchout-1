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
                              return d.id;
                            });


  enemies.enter().append('circle')
          .attr('class', 'enemy')
          .attr('r', 10);
  
  enemies.transition()
          .duration(900)
          .attr('cx', (d) => axes.x(d.x))
          .attr('cy', (d) => axes.y(d.y));
  
  enemies.exit().remove();
};
var player = function() {
  var array = [{id: 'player', x: 50, y: 50}];

  var shape = d3.select('svg').selectAll('rect')
                .data(array, function(d) {
                  return d.id;
                });

  shape.enter().append('rect')
        .attr('x', (d) => axes.x(50))
        .attr('y', (d) => axes.y(50))
        .attr('fill', 'red')
        .attr('width', '15')
        .attr('height', '15')
        .attr('stroke', 'blue')
        .attr('stroke-width', '2')
        .attr('transform', 'matrix(1 0 0 1 0 0)')
        .attr('onmousedown', 'selectElement(evt)');
};

// transform="translate(50,80)" 

player();
var asteroids = makeEnemy();
update(asteroids);

setInterval(function() {
  var ast = makeEnemy();
  update(ast);
}, 1000);

/// player polygon
  /*shape.enter().append('polygon')
        .attr('points', '35,7.5  37.9,16.1 46.9,16.1 39.7,21.5, 42.3,30.1 35,25 27.7,30.1 30.3,21.5, 23.1,16.1 32.1,16.1')
        .attr('fill', 'red')
        // .attr('cx', (d) => axes.x(d.x))
        // .attr('cy', (d) => axes.y(d.y))
        .attr('stroke', 'blue')
        .attr('stroke-width', '2')
        .attr('transform' , 'matrix(1 0 0 1 0 0)');*/