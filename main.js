// helper
const $ = (e) => {
  if (e.charAt(0) == "#") {
    // There is an id
    return document.querySelector(e);
  }
  return document.querySelectorAll(e); // There is an class
};

// Variables
const viewer = $("#viewer"), // Calculator screen
  equals = $("#equals"), // equal button
  nums = $(".num"), // lists of button number
  ops = $(".ops"); // lists of operators
let theNum = "",
  oldNum = "",
  resultNum = "",
  operator;

// get value from number button
// const setNum = () => {
//   if (resultNum) {
//     theNum = this.getAttribute("class");
//     resultNum = "";
//   } else {
//     theNum += this.getAttribute("data-num");
//     alert(theNum);
//   }

//   viewer.innerHTML = theNum;
// };

// get value from data-num then display it to #viewer
let setNum = function () {
  if (resultNum) {
    // If a result was displayed, reset number
    theNum = this.getAttribute("data-num");
    resultNum = "";
  } else {
    // Otherwise, add digit to previous number (this is a string!)
    theNum += this.getAttribute("data-num");
  }

  viewer.innerHTML = theNum; // Display current number
};

// get operator when clicked. Pass number to oldNum and save operator
let moveNum = function () {
  oldNum = theNum;
  theNum = "";
  operator = this.getAttribute("data-ops");

  equals.setAttribute("data-result", ""); // reset result in attr
};

// when equals is clicked. Calculate result
let processNum = function () {
  // convert str to int
  oldNum = parseFloat(oldNum);
  theNum = parseFloat(theNum);

  // check operation
  switch (operator) {
    case "plus":
      resultNum = oldNum + theNum;
      break;
    case "minus":
      resultNum = oldNum - theNum;
      break;
    case "times":
      resultNum = oldNum * theNum;
      break;
    case "divided by":
      resultNum = oldNum / theNum;
      break;
    default:
      resultNum = theNum;
  }

  // If NaN or infinity result
  if (!isFinite(resultNum)) {
    if (isNaN(resultNum)) {
      // if result not a number
      resultNum = "You broke it!";
    } else {
      // if result infinity
      resultNum = "The result is infinity";
      $("#calculator").classList.add("broken"); // break calculator
      $("#reset").classList.add("show");
    }
  }

  // display the result
  viewer.innerHTML = resultNum;
  equals.setAttribute("data-result", resultNum);

  // reset oldNum, keep result
  oldNum = 0;
  theNum = resultNum;
};

// clear button
const clearAll = function () {
  oldNum = "";
  theNum = "";
  viewer.innerHTML = "0";
  equals.setAttribute("data-result", resultNum);
};

// Click Event //

// button number
for (let i = 0, l = nums.length; i < l; i++) {
  nums[i].onclick = setNum;
}

// operator button
for (let i = 0, l = ops.length; i < l; i++) {
  ops[i].onclick = moveNum;
}

// equal button
equals.onclick = processNum;

// click event to clear button
$("#clear").onclick = clearAll;

// reset button
$("#reset").onclick = () => {
  window.location = window.location;
};
