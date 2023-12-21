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
const seasonSelector = document.getElementById("season-selector");
const timeSelector = document.getElementById("time-selector");
const originSelector = document.getElementById("origin-selector");
const locationSelector = document.getElementById("location-selector");
const surfSelector = document.getElementById("surf-selector");
const periodSelector = document.getElementById("period-selector");
const directionSelector = document.getElementById("direction-selector");
const patientsSelector = document.getElementById("patients-selector");
const ageSelector = document.getElementById("age-selector");
const sexSelector = document.getElementById("sex-selector");
const natureSelector = document.getElementById("nature-selector");

var season = [
  { name: "Random", id: 1 },
  { name: "Winter", id: 2, weight: 25 },
  { name: "Spring", id: 3, weight: 25 },
  { name: "Summer", id: 4, weight: 25 },
  { name: "Fall", id: 5, weight: 25 },
];

var time = [
  { name: "Random", id: 1 },
  { name: "Morning", id: 2, weight: 25 },
  { name: "Afternoon", id: 3, weight: 50 },
  { name: "Evening", id: 4, weight: 25 },
];

var orig = [
  { name: "Random", id: 1 },
  { name: "Observed", id: 2, weight: 40 },
  { name: "Reported", id: 3, weight: 50 },
  { name: "911 Call", id: 4, weight: 10 },
];

var loc = [
  { name: "Random", id: 1 },
  { name: "Beach", id: 2, weight: 35 },
  { name: "Water", id: 3, weight: 30 },
  { name: "Jetty", id: 4, weight: 30 },
  { name: "Boardwalk", id: 5, weight: 5 },
];

var surf = [
  { name: "Surf", id: 1 },
  { name: "1-2 ft", id: 2, weight: 25 },
  { name: "3-5 ft", id: 3, weight: 50 },
  { name: "6-9 ft", id: 4, weight: 15 },
  { name: "10-14 ft", id: 5, weight: 5 },
  { name: "15 ft +", id: 6, weight: 5 },
];

var period = [
  { name: "Period", id: 1 },
  { name: "3-8 sec", id: 2, weight: 10 },
  { name: "9-14 sec", id: 3, weight: 30 },
  { name: "15-20 sec", id: 4, weight: 40 },
  { name: "21 sec +", id: 5, weight: 20 },
];

var direction = [
  { name: "Direction", id: 1 },
  { name: "N", id: 2, weight: 5 },
  { name: "NW", id: 3, weight: 25 },
  { name: "W", id: 4, weight: 25 },
  { name: "SW", id: 5, weight: 30 },
  { name: "S", id: 6, weight: 15 },
];

var patients = [
  { name: "Random", id: 1 },
  { name: "1", id: 2, weight: 84 },
  { name: "2", id: 3, weight: 12 },
  { name: "3", id: 4, weight: 2 },
  { name: "4", id: 5, weight: 1 },
  { name: "5", id: 6, weight: 1 },
];

var age = [
  { name: "Random", id: 1 },
  { name: "0-9", id: 2, weight: 20 },
  { name: "10-19", id: 3, weight: 20 },
  { name: "20-29", id: 4, weight: 20 },
  { name: "30-49", id: 5, weight: 20 },
  { name: "50+", id: 6, weight: 20 },
];

var sex = [
  { name: "Random", id: 1 },
  { name: "Male", id: 2, weight: 50 },
  { name: "Female", id: 3, weight: 50 },
];

var nature = [
  { name: "Random", id: 1 },
  { name: "Medical", id: 2, weight: 50 },
  { name: "Trauma", id: 3, weight: 50 },
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

orig.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  originSelector.appendChild(option);
});

originSelector.onchange = function () {
  var originSelectButton = document.getElementById("origin-select-button");
  var selectedOrigin =
    originSelector.options[originSelector.selectedIndex].text;
  if (selectedOrigin != "Random") {
    originSelectButton.classList.add("changed-select-button");
  } else {
    originSelectButton.classList.remove("changed-select-button");
  }
};

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

patients.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  patientsSelector.appendChild(option);
});

patientsSelector.onchange = function () {
  var patientsSelectButton = document.getElementById("patients-select-button");
  var selectedPatients =
    patientsSelector.options[patientsSelector.selectedIndex].value;
  if (selectedPatients != 1) {
    patientsSelectButton.classList.add("changed-select-button");
  } else {
    patientsSelectButton.classList.remove("changed-select-button");
  }
  /*
  if (selectedPatients >= 3 && age.length == 6) {
    mixedAge = { name: "Mixed", id: 7, weight: 20 };
    age.push(mixedAge);
    var option = document.createElement("option");
    option.id = "mixed-age";
    option.value = mixedAge.id;
    option.textContent = mixedAge.name;
    ageSelector.appendChild(option);
  }
  if (selectedPatients <= 2 && age.length == 7) {
    age.pop(age[6]);
    let mixOption = document.getElementById("mixed-age");
    ageSelector.removeChild(mixOption);
  }
  if (selectedPatients >= 3 && sex.length == 3) {
    mixedSex = { name: "Mixed", id: 4, weight: 50 };
    sex.push(mixedSex);
    var option = document.createElement("option");
    option.id = "mixed-sex";
    option.value = mixedSex.id;
    option.textContent = mixedSex.name;
    sexSelector.appendChild(option);
  }
  if (selectedPatients <= 2 && sex.length == 4) {
    sex.pop(sex[3]);
    let mixOption = document.getElementById("mixed-sex");
    sexSelector.removeChild(mixOption);
  }
  if (selectedPatients >= 3 && nature.length == 3) {
    mixedNature = { name: "Mixed", id: 4, weight: 25 };
    nature.push(mixedNature);
    var option = document.createElement("option");
    option.id = "mixed-nature";
    option.value = mixedNature.id;
    option.textContent = mixedNature.name;
    natureSelector.appendChild(option);
  }
  if (selectedPatients <= 2 && nature.length == 4) {
    nature.pop(nature[3]);
    let mixOption = document.getElementById("mixed-nature");
    natureSelector.removeChild(mixOption);
  }
  */
};

age.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  ageSelector.appendChild(option);
});

ageSelector.onchange = function () {
  var ageSelectButton = document.getElementById("age-select-button");
  var selectedAge = ageSelector.options[ageSelector.selectedIndex].text;
  if (selectedAge != "Random") {
    ageSelectButton.classList.add("changed-select-button");
  } else {
    ageSelectButton.classList.remove("changed-select-button");
  }
};

sex.forEach(function (item) {
  var option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.name;
  sexSelector.appendChild(option);
});

sexSelector.onchange = function () {
  var sexSelectButton = document.getElementById("sex-select-button");
  var selectedSex = sexSelector.options[sexSelector.selectedIndex].text;
  if (selectedSex != "Random") {
    sexSelectButton.classList.add("changed-select-button");
  } else {
    sexSelectButton.classList.remove("changed-select-button");
  }
};

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

function getRandomOption(arr) {
  var i;
  let options = arr.slice(1);
  var weights = [options[0].weight];
  for (i = 1; i < options.length; i++)
    weights[i] = options[i].weight + weights[i - 1];
  var random = Math.random() * weights[weights.length - 1];
  for (i = 0; i < weights.length; i++) if (weights[i] > random) break;
  return options[i].name;
}

let sceneData = [
  {
    sceneSelector: seasonSelector,
    sceneVariable: season,
    sceneSelected: seasonSelector.options[seasonSelector.selectedIndex].text,
  },
  {
    sceneSelector: timeSelector,
    sceneVariable: time,
    sceneSelected: timeSelector.options[timeSelector.selectedIndex].text,
  },
  {
    sceneSelector: originSelector,
    sceneVariable: orig,
    sceneSelected: originSelector.options[originSelector.selectedIndex].text,
  },
  {
    sceneSelector: locationSelector,
    sceneVariable: loc,
    sceneSelected:
      locationSelector.options[locationSelector.selectedIndex].text,
  },
];

let conditionsData = [
  {
    sceneSelector: surfSelector,
    sceneVariable: surf,
    sceneSelected: surfSelector.options[surfSelector.selectedIndex].text,
  },
  {
    sceneSelector: periodSelector,
    sceneVariable: period,
    sceneSelected: periodSelector.options[periodSelector.selectedIndex].text,
  },
  {
    sceneSelector: directionSelector,
    sceneVariable: direction,
    sceneSelected:
      directionSelector.options[directionSelector.selectedIndex].text,
  },
];

let patientCountData = [
  {
    sceneSelector: patientsSelector,
    sceneVariable: patients,
    sceneSelected:
      patientsSelector.options[patientsSelector.selectedIndex].text,
  },
];

let patientsData = [
  {
    sceneSelector: ageSelector,
    sceneVariable: age,
    sceneSelected: ageSelector.options[ageSelector.selectedIndex].text,
  },
  {
    sceneSelector: sexSelector,
    sceneVariable: sex,
    sceneSelected: sexSelector.options[sexSelector.selectedIndex].text,
  },
  {
    sceneSelector: natureSelector,
    sceneVariable: nature,
    sceneSelected: natureSelector.options[natureSelector.selectedIndex].text,
  },
];

const builtScenePlaceholder = document.getElementById(
  "built-scene-placeholder"
);

function buildScene() {
  document.getElementById("built-scene").remove();
  const root = document.createElement("DIV");
  root.setAttribute("id", "built-scene");
  builtScenePlaceholder.appendChild(root);
  sceneData.forEach((item) => {
    if (
      ["Random", "Surf", "Period", "Direction"].includes(
        item.sceneSelector.options[item.sceneSelector.selectedIndex].text
      )
    ) {
      item.sceneSelected = getRandomOption(item.sceneVariable);
      let sceneItem = document.createElement("span");
      sceneItem.textContent = item.sceneSelected;
      sceneItem.classList.add("scene-item");
      document.getElementById("built-scene").appendChild(sceneItem);
    } else {
      item.sceneSelected =
        item.sceneSelector.options[item.sceneSelector.selectedIndex].text;
      let sceneItem = document.createElement("span");
      sceneItem.textContent = item.sceneSelected;
      sceneItem.classList.add("scene-item");
      document.getElementById("built-scene").appendChild(sceneItem);
    }
  });
  if (
    sceneData[3].sceneSelected == "Water" ||
    sceneData[3].sceneSelected == "Jetty"
  ) {
    conditionsData.forEach((item) => {
      if (
        ["Random", "Surf", "Period", "Direction"].includes(
          item.sceneSelector.options[item.sceneSelector.selectedIndex].text
        )
      ) {
        item.sceneSelected = getRandomOption(item.sceneVariable);
        let sceneItem = document.createElement("span");
        sceneItem.textContent = item.sceneSelected;
        sceneItem.classList.add("scene-item");
        document.getElementById("built-scene").appendChild(sceneItem);
      } else {
        item.sceneSelected =
          item.sceneSelector.options[item.sceneSelector.selectedIndex].text;
        let sceneItem = document.createElement("span");
        sceneItem.textContent = item.sceneSelected;
        sceneItem.classList.add("scene-item");
        document.getElementById("built-scene").appendChild(sceneItem);
      }
    });
  }
  patientCountData.forEach((item) => {
    if (
      ["Random"].includes(
        item.sceneSelector.options[item.sceneSelector.selectedIndex].text
      )
    ) {
      item.sceneSelected = getRandomOption(item.sceneVariable);
    } else {
      item.sceneSelected =
        item.sceneSelector.options[item.sceneSelector.selectedIndex].text;
    }
  });
}

const builtPatientsPlaceholder = document.getElementById(
  "built-patients-placeholder"
);

function buildPatients(number) {
  document.getElementById("patients-container").remove();
  const root = document.createElement("DIV");
  root.setAttribute("id", "patients-container");
  builtPatientsPlaceholder.appendChild(root);
  for (let i = 0; i < number; i++) {
    var patient = document.createElement("DIV");
    patient.setAttribute("id", `patient-${i + 1}`);
    patient.setAttribute("class", "patient");
    root.appendChild(patient);
    patientsData.forEach((item) => {
      if (
        ["Random"].includes(
          item.sceneSelector.options[item.sceneSelector.selectedIndex].text
        )
      ) {
        item.sceneSelected = getRandomOption(item.sceneVariable);
        let patientItem = document.createElement("span");
        patientItem.textContent = item.sceneSelected;
        patientItem.classList.add("scene-item");
        patient.appendChild(patientItem);
      } else {
        item.sceneSelected =
          item.sceneSelector.options[item.sceneSelector.selectedIndex].text;
        let patientItem = document.createElement("span");
        patientItem.textContent = item.sceneSelected;
        patientItem.classList.add("scene-item");
        patient.appendChild(patientItem);
      }
    });
  }
}

buildSceneButton.addEventListener("click", () => {
  buildScene();
  buildPatients(patientCountData[0].sceneSelected);
});
