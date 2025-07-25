function sum(array) {
  if (array.length === 0) {
    return 0
  }
  if (array.length === 1) {
    return array[0]
  }

  let prevInclude = array[0]
  let prevExclude = 0

  for (let i = 1; i < array.length; i++) {
    const currentNum = array[i]
    const currentInclude = currentNum + prevExclude
    const currentExclude = Math.max(prevInclude, prevExclude)

    prevInclude = currentInclude
    prevExclude = currentExclude
  }

  return Math.max(prevInclude, prevExclude)
}

const array = [9, 1, 1, 5, 2, 5];


console.log(sum(array))