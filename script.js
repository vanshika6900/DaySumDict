// Example data
const inputDict = {
  "2020-01-01": 4,
  "2020-01-02": 4,
  "2020-01-03": 6,
  "2020-01-04": 8,
  "2020-01-05": 2,
  "2020-01-06": -6,
  "2020-01-07": 2,
  "2020-01-08": -2,
};

// Function to convert the input dictionary
function convertDictToDaySum(inputDict) {
  let outputDict = {};
  let sortedKeys = Object.keys(inputDict).sort();

  for (let i = 0; i < sortedKeys.length; i++) {
    let key = sortedKeys[i];
    let date = new Date(key);
    let day = date.toLocaleString("en-US", { weekday: "short" });

    if (!(day in outputDict)) {
      outputDict[day] = inputDict[key];
    } else {
      outputDict[day] += inputDict[key];
    }
  }

  // Check for missing days and calculate mean
  let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let missingDays = daysOfWeek.filter((day) => !(day in outputDict));

  for (let i = 0; i < missingDays.length; i++) {
    let day = missingDays[i];
    let index = daysOfWeek.indexOf(day);
    let prevDay = daysOfWeek[index - 1];
    let nextDay = daysOfWeek[(index + 1) % 7];
    let meanValue = Math.floor((outputDict[prevDay] + outputDict[nextDay]) / 2);
    outputDict[day] = meanValue;
  }

  return outputDict;
}

// Call the function and update the DOM
const outputDict = convertDictToDaySum(inputDict);
document.getElementById("mon-value").textContent = outputDict.Mon;
document.getElementById("tue-value").textContent = outputDict.Tue;
document.getElementById("wed-value").textContent = outputDict.Wed;
document.getElementById("thu-value").textContent = outputDict.Thu;
document.getElementById("fri-value").textContent = outputDict.Fri;
document.getElementById("sat-value").textContent = outputDict.Sat;
document.getElementById("sun-value").textContent = outputDict.Sun;
