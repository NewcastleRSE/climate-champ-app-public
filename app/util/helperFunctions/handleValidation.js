const handleValidation = (
  value,
  upperBound,
  lowerBound,
  setInvalidAnswer,
  setAnswer2
) => {

  let integerValue = Number(value);
  // This checks if the user input is a double, text or anything invalid
  // Valid answer can only be a positive integer between 0 and 600 inclusive.
  if (!isNaN(integerValue) && Number.isInteger(integerValue)) {
    // Ensures an empty value can be input.
    if (value === '') {
      setAnswer2(value)
      setInvalidAnswer(false)
      return
    }

    const parsedValue = parseInt(value, 10)
    if (
        (isNaN(parsedValue) && value !== '') ||
        0 ||
        parsedValue > upperBound ||
        parsedValue < lowerBound
    ) {
      setInvalidAnswer(true)
    } else {
      setAnswer2(value)
      setInvalidAnswer(false)
    }
  } else {
    setAnswer2(value)
    setInvalidAnswer(true)
  }
}

export default handleValidation

// Original code
// var userInput = "00021,32"; // Replace this with the user's input as a string
// var integerResult = Number(userInput);
// console.log(integerResult)
//
// if (!isNaN(integerResult) && Number.isInteger(integerResult)) {
//   // Conversion was successful and the value is an integer.
//   console.log("Integer value: " + integerResult);
// } else {
//   console.log("Invalid input. Please enter a valid integer.");
// }
