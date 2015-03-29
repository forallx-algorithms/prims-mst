/*
 * Prim's algorithm calculates a minimum spanning tree in O(m*n) time
 * http://en.wikipedia.org/wiki/Prim's_algorithm
 *
 * @author Evgeniy Kuznetsov
 * @date 29.03.2015
 */

// section: Helpers

// Calculates a nodes of the given graph
// @param {Graph} g
// @return {Array.<Integer>}
function calcVertices(g) {
  var acc = {};

  for(var ei in g) {
    var cur = g[ei];
    acc[cur[0]] = true;
    acc[cur[1]] = true;
  }

  return Object.keys(acc).map(
    function(e){ return parseInt(e); }
  )
}

// Calculates sum of the weights of the given graph
// @param {Graph} g
// @return {Integer}
function calcWeightsSum(g) {
  return g.map(
    function(e){ return e[2]; }
  ).reduce(
    function(sum, e){ return sum + e; }, 0
  );
}


// section: Prim's mst algorithm

// Prim's mst algorithm
// @param {Graph} g
// @return {Graph}
function primsMst(g) {

  // Edges in a spanning tree
  var x = {};
  x[g[0][0]] = true;

  // Vertices in a spanning tree
  var t = [];

  var nodes = calcVertices(g);

  while(Object.keys(x).length != nodes.length) {
    // Search all vertices where one point in x and another not in x
    //  and calculate a min edge
    var minEdge = undefined;
    for(var ei in g) {
      var curEdge = g[ei];

      // Is any endpoint of the edge in x (XOR)
      if( !x[curEdge[0]] != !x[curEdge[1]] ) {

        if(minEdge) {
          minEdge = (minEdge[2] > curEdge[2]) ? curEdge : minEdge;
        } else {
          minEdge = curEdge;
        }

      }

    }

    // Add min edge to T
    t.push(minEdge);

    // Add min edge vertex to x
    x[minEdge[0]] = true;
    x[minEdge[1]] = true;
  }

  return t;
}


// section: Tests

var sampleGraph = [
  [1,2,1],
  [1,3,4],
  [1,4,3],
  [2,4,2],
  [3,4,5]
];

console.log("Case 1:", calcVertices(sampleGraph).length == 4, calcVertices(sampleGraph));

console.log("Case 2:", primsMst(sampleGraph).toString() ==  [ [ 1, 2, 1 ], [ 2, 4, 2 ], [ 1, 3, 4 ]].toString(), primsMst(sampleGraph));

console.log("Case 3:", calcWeightsSum(sampleGraph) == 15, calcWeightsSum(sampleGraph));

