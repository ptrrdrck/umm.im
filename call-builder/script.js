/**
 * Call Builder (c) Peter Rodrick
 */

/**
 * Current year display
 */
document.getElementById("year").textContent = new Date().getFullYear();

/**
 * Option loading
 */

/**
 * SEASON
 */
const seasonSelector = document.getElementById("season-selector");

var season = [
  { name: "Random", id: 1 },
  { name: "Winter", id: 2 },
  { name: "Spring", id: 3 },
  { name: "Summer", id: 4 },
  { name: "Fall", id: 5 },
];

season.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  seasonSelector.appendChild(option);
});

seasonSelector.onchange = function () {
  var seasonSelectButton = document.getElementById("season-select-button");
  var selectedSeason =
    seasonSelector.options[seasonSelector.selectedIndex].text;
  if (selectedSeason != "Random") {
    seasonSelectButton.classList.add("changed-select-button");
  } else {
    seasonSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * TIME
 */
const timeSelector = document.getElementById("time-selector");

var time = [
  { name: "Random", id: 1 },
  { name: "Morning", id: 2 },
  { name: "Afternoon", id: 3 },
  { name: "Evening", id: 4 },
];

time.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  timeSelector.appendChild(option);
});

timeSelector.onchange = function () {
  var timeSelectButton = document.getElementById("time-select-button");
  var selectedTime = timeSelector.options[timeSelector.selectedIndex].text;
  if (selectedTime != "Random") {
    timeSelectButton.classList.add("changed-select-button");
  } else {
    timeSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * ORIGIN
 */
const originSelector = document.getElementById("origin-selector");

var origin = [
  { name: "Random", id: 1 },
  { name: "Observed", id: 2 },
  { name: "Reported", id: 3 },
  { name: "911 Call", id: 4 },
];

origin.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  originSelector.appendChild(option);
});

originSelector.onchange = function () {
  var originSelectButton = document.getElementById("origin-select-button");
  var selectedTime = originSelector.options[originSelector.selectedIndex].text;
  if (selectedTime != "Random") {
    originSelectButton.classList.add("changed-select-button");
  } else {
    originSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * LOCATION
 */
const locationSelector = document.getElementById("location-selector");

var loc = [
  { name: "Random", id: 1 },
  { name: "Beach", id: 2 },
  { name: "Water", id: 3 },
  { name: "Jetty", id: 4 },
  { name: "Boardwalk", id: 5 },
];

loc.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  locationSelector.appendChild(option);
});

locationSelector.onchange = function () {
  var locationSelectButton = document.getElementById("location-select-button");
  var selectedLocation =
    locationSelector.options[locationSelector.selectedIndex].text;
  if (selectedLocation != "Random") {
    locationSelectButton.classList.add("changed-select-button");
  } else {
    locationSelectButton.classList.remove("changed-select-button");
  }
  if (selectedLocation == "Water" || selectedLocation == "Jetty") {
    document.getElementById("conditions").classList.remove("hide");
  } else {
    document.getElementById("conditions").classList.add("hide");
  }
};

/**
 * CONDITIONS
 */
/**
 * SURF
 */
const surfSelector = document.getElementById("surf-selector");

var surf = [
  { name: "Surf", id: 1 },
  { name: "1-2 ft", id: 2 },
  { name: "3-5 ft", id: 3 },
  { name: "6-9 ft", id: 4 },
  { name: "10-14 ft", id: 5 },
  { name: "15 ft +", id: 6 },
];

surf.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  surfSelector.appendChild(option);
});

surfSelector.onchange = function () {
  var surfSelectButton = document.getElementById("surf-select-button");
  var selectedSurf = surfSelector.options[surfSelector.selectedIndex].text;
  if (selectedSurf != "Surf") {
    surfSelectButton.classList.add("changed-select-button");
  } else {
    surfSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * PERIOD
 */
const periodSelector = document.getElementById("period-selector");

var period = [
  { name: "Period", id: 1 },
  { name: "3-8 sec", id: 2 },
  { name: "9-14 sec", id: 3 },
  { name: "15-20 sec", id: 4 },
  { name: "21 sec +", id: 5 },
];

period.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  periodSelector.appendChild(option);
});

periodSelector.onchange = function () {
  var periodSelectButton = document.getElementById("period-select-button");
  var selectedPeriod =
    periodSelector.options[periodSelector.selectedIndex].text;
  if (selectedPeriod != "Period") {
    periodSelectButton.classList.add("changed-select-button");
  } else {
    periodSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * DIRECTION
 */
const directionSelector = document.getElementById("direction-selector");

var direction = [
  { name: "Direction", id: 1 },
  { name: "N", id: 2 },
  { name: "NW", id: 3 },
  { name: "W", id: 4 },
  { name: "SW", id: 5 },
  { name: "S", id: 6 },
];

direction.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  directionSelector.appendChild(option);
});

directionSelector.onchange = function () {
  var directionSelectButton = document.getElementById(
    "direction-select-button"
  );
  var selectedDirection =
    directionSelector.options[directionSelector.selectedIndex].text;
  if (selectedDirection != "Direction") {
    directionSelectButton.classList.add("changed-select-button");
  } else {
    directionSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * PATIENTS
 */
const patientsSelector = document.getElementById("patients-selector");

var patients = [
  { name: "Random", id: 1 },
  { name: "1", id: 2 },
  { name: "2", id: 3 },
  { name: "3", id: 4 },
  { name: "4", id: 5 },
  { name: "5 or more", id: 6 },
];

patients.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  patientsSelector.appendChild(option);
});

patientsSelector.onchange = function () {
  var patientsSelectButton = document.getElementById("patients-select-button");
  var selectedPatients =
    patientsSelector.options[patientsSelector.selectedIndex].text;
  if (selectedPatients != "Random") {
    patientsSelectButton.classList.add("changed-select-button");
  } else {
    patientsSelectButton.classList.remove("changed-select-button");
  }
  mixedNature = { name: "Mixed", id: 4 };
  console.log(patientsSelector.options[patientsSelector.selectedIndex].value);
  if (patientsSelector.options[patientsSelector.selectedIndex].value >= 3) {
    nature.push(mixedNature);
    console.log(nature);
    nature.forEach(function (item) {
      var option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      natureSelector.appendChild(option);
    });
  } else {
    nature.push(mixedNature);
  }
};

/**
 * NATURE
 */
const natureSelector = document.getElementById("nature-selector");

var nature = [
  { name: "Random", id: 1 },
  { name: "Medical", id: 2 },
  { name: "Trauma", id: 3 },
];

nature.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  natureSelector.appendChild(option);
});

natureSelector.onchange = function () {
  var natureSelectButton = document.getElementById("nature-select-button");
  var selectedNature =
    natureSelector.options[natureSelector.selectedIndex].text;
  if (selectedNature != "Random") {
    natureSelectButton.classList.add("changed-select-button");
  } else {
    natureSelectButton.classList.remove("changed-select-button");
  }
};

/**
 * Call generating
 */
const buildSceneButton = document.getElementById("build-scene-button");
