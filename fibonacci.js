function generateFibonacci(n) {
	  if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
	    throw new Error("Input must be a non-negative integer.")
	  }

	  if (n === 0 || n === 1) {
	    return [0]
	  }

  	const fibSequence = [0, 1]

 	 let a = 0
 	 let b = 1

	let nextFib = 0

	  do {
	    	nextFib = a + b;

			if(nextFib >= n) {
				break
			}

	    	fibSequence.push(nextFib)

		    a = b
	    	b = nextFib
	  }  while (nextFib < n)

  	return fibSequence
}


console.log(generateFibonacci(5)) 