const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to check whether the relation is a function or not
const isFunction = (relation) => {
  // Iterate through the whole list of function
  for (let i = 0; i < relation.length; i++) {
    // This for loop iterates through the other relations
    for (let j = i + 1; j < relation.length; j++) {
      // Check if x value is related to other y values other than its own
      if (relation[i][0] === relation[j][0] && relation[i][1] !== relation[j][1]) {
        return false;
      }
    }
  }
  return true;
};

// Function to get the domain (x values)
const getDomain = (relation) => {
  // Return an ordered set that is derived from the x values from the list of relations
  return new Set(
    relation.map((point) => point[0]).sort((a, b) => a - b)
  )
};

// Function to get the range (y values)
const getRange = (relation) => {
  // Return an ordered set that is derived from the y values from the list of relations
  return new Set(
    relation.map((point) => point[1]).sort((a, b) => a - b)
  )
};

// Have a simple test function, provide a placeholder relation
const test = (relation = [[1, 2], [3, 4], [5, 6], [1, 7]]) => {
  console.log('Relation: ', relation)

  if (isFunction(relation)) {
    console.log('This relation is a function.');
    console.log('Domain:', getDomain(relation));
    console.log('Range:', getRange(relation));
  } else {
    console.log('This relation is not a function.');
  }
};

console.log("Examples of relations for testing:")
test(); // not a function
test([[5,2], [8,4], [2,2], [4,9], [9,1]]); // function
test([[7,2], [3,4], [3,2], [1,4], [2,2], [4,9], [9,1]]); // not a function

// Input relation, try: [[9,6], [4,5], [3,2]]
rl.question('Enter the relation to check: ', (input) => {
  const relation = JSON.parse(input)
  test(relation)
})
