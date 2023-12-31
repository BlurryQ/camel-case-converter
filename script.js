const allowedChars = [" ", "0", "1", "2", "3", "4", "5", "6", "7", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const resultDisplay = document.getElementById("result");

const input = document.getElementById("input")
input.addEventListener("change", () => {
  string = input.value
  displayResults(string)
})

function displayResults(string) {
  resultDisplay.textContent = ""
  string = getUseableString(string)
  results = removeCamelCase(string)
  results.forEach(string => {
    div = document.createElement("div")
    div.classList.add("result")
    resultDisplay.appendChild(div)
    div.textContent = string
  });
}

function getUseableString(string) {
  useableString = removeUnusableChars(string)
  seperatedCamels = useableString.split(" ")
  return seperatedCamels;
}

function removeUnusableChars(string) {
  splitString = string.split("")
  newSplitString = [];
  splitString.forEach(char => {
    if(allowedChars.includes(char)) {
      newSplitString.push(char)
    } else {
      newSplitString.push(" ")
    }
  })
  return newSplitString.join("");
}

function removeCamelCase(arr) {
  arr.forEach((string, index) => {
    splitString = string.split("");
    filteredString = splitString.filter(item => item.toUpperCase() === item);
    indexOfCapitals = []
    lastIndex = 0;
    filteredString.forEach(cap => {
      indexOfCapitals.push(splitString.indexOf(cap, lastIndex))
      lastIndex = indexOfCapitals.slice(-1)
    });
    indexOfCapitals.reverse()
    indexOfCapitals.forEach(index => {
      splitString.splice(index,0," ");
    });
    splitString[0] = splitString[0].toUpperCase();
    arr.splice(index, 1, splitString.join(""))
  });
  let checkedArr = IDCheck(arr);
  return checkedArr;
}

function IDCheck(arr) {
  arr.forEach((string, stringIndex) => {
    containsID = string.includes("I D")
    if(containsID) {
      let removedCamel = arr[stringIndex],
      splitRemovedCamel = removedCamel.split("");
      splitRemovedCamel.forEach((letter, letterIndex) => {
        const dIndex = letterIndex + 2
        if(letter === "I" && splitRemovedCamel[dIndex] === "D") {
          splitRemovedCamel.splice(letterIndex+1,1)
        }        
      })
      const newString = splitRemovedCamel.join("")
      arr.splice(stringIndex,1,newString)
    }

  })
  return arr;
}