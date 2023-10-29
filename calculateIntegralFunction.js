const readline = require('readline');
const math = require('mathjs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Parse the user input
const parseFunctionInput = (input) => {
  // Remove any whitespace
  input = input.trim();

  // Check if the input is valid
  if (!input || input.length === 0) {
    throw new Error('Invalid input');
  }

  // Try to parse the input as a math expression
  const expression = math.parse(input);

  // Check if the expression is valid
  if (!expression) {
    throw new Error('Invalid expression');
  }

  return expression;
};

// Function to parse limits to float
const parseLimits = (lower = 0, upper = 1) => {
  if (lower >= upper) return { lower: 0.0, upper: 1.0 }
  return { lower: parseFloat(lower), upper: parseFloat(upper) }
}

// Calculate the indefinite integral of a function using Simpson's rule
const integrate = (functionExpression, lowerLimit, upperLimit) => {
  // Check if the function expression is valid
  if (!functionExpression) {
    throw new Error('Invalid function expression');
  }

  // Define the Simpson's rule integration function
  const simpson = (func, a, b, n) => {
    // Calculate the step size
    const h = (b - a) / n;

    // Calculate the integral using Simpson's rule
    let integral = func.evaluate({ x: a }) + func.evaluate({ x: b });
    for (let i = 0; i < n; i ++) {
      const x = a + i * h
      integral += (i % 2 === 0) ? 2 * func.evaluate({ x }) : 4 * func.evaluate({ x })
    }

    // Return the approximate integral value with rule of thirds
    return (h / 3) * integral;
  };

  // Calculate the indefinite integral
  const integral = simpson(functionExpression, lowerLimit, upperLimit, 100);

  return integral;
};

// Process integration function
const processIntegration = (input, lowerLimit, upperLimit) => {
  // Parse the user input
  const functionExpression = parseFunctionInput(input)
  const { lower, upper } = parseLimits(lowerLimit, upperLimit)

  // Calculate the integral
  const integral = integrate(functionExpression, lower, upper);

  // Print the result
  console.log('Integral:', integral);

  // Close the readline interface
  rl.close();
}

// Testing function
const test = () => {
  // Get the user input
  rl.question('Enter the function to integrate: ', (input) => {
    if (!input || input.trim() === "") return rl.close()

    rl.question('Enter limits? (y/N): ', (limitsInput) => {
      let lowerLimit = 0
      let upperLimit = 1

      // Check if user decided to enter custom limits
      if (limitsInput && (limitsInput.trim() === "y" || limitsInput.trim() === "Y")) {
        // Enter upper and lower limits
        rl.question('Enter lower limit (0 by default): ', (lower) => {
          lowerLimit = lower.trim().length > 0 ? lower.trim() : 0

          rl.question('Enter upper limit (1 by default): ', (upper) => {
            upperLimit = upper.trim().length > 0 ? upper.trim() : 1

            processIntegration(input, lowerLimit, upperLimit)
          });
        });
      } else {
        processIntegration(input, lowerLimit, upperLimit)
      }
    });
  });
};

test();
