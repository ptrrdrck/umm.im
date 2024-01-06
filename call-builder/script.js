/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const selectors = {
  season: document.getElementById("season-selector"),
  time: document.getElementById("time-selector"),
  origin: document.getElementById("origin-selector"),
  location: document.getElementById("location-selector"),
  surf: document.getElementById("surf-selector"),
  patients: document.getElementById("patients-selector"),
  age: document.getElementById("age-selector"),
  sex: document.getElementById("sex-selector"),
  nature: document.getElementById("nature-selector"),
};

const options = {
  season: [
    { name: "Random", id: 1 },
    { name: "Winter", id: 2, weight: 25 },
    { name: "Spring", id: 3, weight: 25 },
    { name: "Summer", id: 4, weight: 25 },
    { name: "Fall", id: 5, weight: 25 },
  ],
  time: [
    { name: "Random", id: 1 },
    { name: "Morning", id: 2, weight: 25 },
    { name: "Afternoon", id: 3, weight: 50 },
    { name: "Evening", id: 4, weight: 25 },
  ],
  origin: [
    { name: "Random", id: 1 },
    { name: "Observed", id: 2, weight: 40 },
    { name: "Reported", id: 3, weight: 50 },
    { name: "911 Call", id: 4, weight: 10 },
  ],
  location: [
    { name: "Random", id: 1 },
    { name: "Beach", id: 2, weight: 35 },
    { name: "Water", id: 3, weight: 30 },
    { name: "Jetty", id: 4, weight: 30 },
    { name: "Boardwalk", id: 5, weight: 5 },
  ],
  surf: [
    { name: "Random", id: 1 },
    { name: "1-2 ft", id: 2, weight: 27 },
    { name: "3-5 ft", id: 3, weight: 55 },
    { name: "6-9 ft", id: 4, weight: 15 },
    { name: "10-14 ft", id: 5, weight: 2 },
    { name: "15 ft +", id: 6, weight: 1 },
  ],
  patients: [
    { name: "Random", id: 1 },
    { name: "1", id: 2, weight: 84 },
    { name: "2", id: 3, weight: 12 },
    { name: "3", id: 4, weight: 2 },
    { name: "4", id: 5, weight: 1 },
    { name: "5", id: 6, weight: 1 },
  ],
  age: [
    { name: "Random", id: 1 },
    { name: "0-9", id: 2, weight: 5, min: 0, max: 9 },
    { name: "10-19", id: 3, weight: 25, min: 10, max: 19 },
    { name: "20-29", id: 4, weight: 25, min: 20, max: 29 },
    { name: "30-49", id: 5, weight: 25, min: 30, max: 49 },
    { name: "50+", id: 6, weight: 20, min: 50, max: 79 },
  ],
  sex: [
    { name: "Random", id: 1 },
    { name: "Male", id: 2, weight: 50 },
    { name: "Female", id: 3, weight: 50 },
  ],
  nature: [
    { name: "Random", id: 1 },
    { name: "Medical", id: 2, weight: 50 },
    { name: "Trauma", id: 3, weight: 50 },
  ],
};

function createOptionElement(option) {
  const element = document.createElement("option");
  element.value = option.id;
  element.textContent = option.name;
  return element;
}

function createSceneItemElement(text) {
  const element = document.createElement("span");
  element.textContent = text;
  element.classList.add("scene-item");
  return element;
}

function loadOptions(selector, variable) {
  variable.forEach((item) => {
    const option = createOptionElement(item);
    selector.appendChild(option);
  });
}

function handleSelectorChange(selector, selectButton) {
  const selectedOption = selector.options[selector.selectedIndex].text;
  if (selectedOption !== "Random") {
    selectButton.classList.add("changed-select-button");
  } else {
    selectButton.classList.remove("changed-select-button");
  }
}

function getSelectedOption(selector) {
  const selectedOption = selector.options[selector.selectedIndex].text;
  return selectedOption;
}

function getRandomOption(arr) {
  const options = arr.slice(1);
  const weights = [options[0].weight];
  for (let i = 1; i < options.length; i++) {
    weights[i] = options[i].weight + weights[i - 1];
  }
  const random = Math.random() * weights[weights.length - 1];
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      return options[i].name;
    }
  }
}

function getOptionIndex(selector, optionText) {
  let options = Array.from(selector.options);
  return options.findIndex((opt) => opt.label == optionText);
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let sceneData = [
  {
    sceneSelector: selectors.season,
    sceneVariable: "season",
    selectButton: document.getElementById("season-select-button"),
  },
  {
    sceneSelector: selectors.time,
    sceneVariable: "time",
    selectButton: document.getElementById("time-select-button"),
  },
  {
    sceneSelector: selectors.origin,
    sceneVariable: "origin",
    selectButton: document.getElementById("origin-select-button"),
  },
];

sceneData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
  };
});

let locationData = [
  {
    sceneSelector: selectors.location,
    sceneVariable: "location",
    selectButton: document.getElementById("location-select-button"),
  },
];

locationData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
    let selectedLocation = getSelectedOption(selectors.location);
    if (selectedLocation === "Water" || selectedLocation === "Jetty") {
      document.getElementById("surf").classList.remove("hide");
    } else {
      document.getElementById("surf").classList.add("hide");
    }
  };
});

let conditionsData = [
  {
    sceneSelector: selectors.surf,
    sceneVariable: "surf",
    selectButton: document.getElementById("surf-select-button"),
  },
];

conditionsData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
  };
});

let patientCountData = [
  {
    sceneSelector: selectors.patients,
    sceneVariable: "patients",
    selectButton: document.getElementById("patients-select-button"),
  },
];

patientCountData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
  };
});

let ageData = [
  {
    sceneSelector: selectors.age,
    sceneVariable: "age",
    selectButton: document.getElementById("age-select-button"),
  },
];

ageData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
  };
});

let patientsData = [
  {
    sceneSelector: selectors.sex,
    sceneVariable: "sex",
    selectButton: document.getElementById("sex-select-button"),
  },
  {
    sceneSelector: selectors.nature,
    sceneVariable: "nature",
    selectButton: document.getElementById("nature-select-button"),
  },
];

patientsData.forEach((item) => {
  loadOptions(item.sceneSelector, options[item.sceneVariable]);
  item.sceneSelector.onchange = () => {
    handleSelectorChange(item.sceneSelector, item.selectButton);
  };
});

const buildSceneButton = document.getElementById("build-scene-button");
const builtScenePlaceholder = document.getElementById(
  "built-scene-placeholder"
);

function buildScene() {
  const builtScene = document.getElementById("built-scene");
  if (builtScene) {
    builtScene.remove();
  }
  const root = document.createElement("div");
  root.setAttribute("id", "built-scene");
  root.setAttribute("class", "fade-in");
  builtScenePlaceholder.appendChild(root);
  sceneData.forEach((item) => {
    let selectedOption = getSelectedOption(item.sceneSelector);
    selectedOption == "Random"
      ? (selectedOption = getRandomOption(options[item.sceneVariable]))
      : (selectedOption = selectedOption);
    const sceneItem = createSceneItemElement(selectedOption);
    root.appendChild(sceneItem);
  });
  let selectedLocation = getSelectedOption(selectors.location);
  locationData.forEach((item) => {
    selectedLocation == "Random"
      ? (selectedLocation = getRandomOption(options[item.sceneVariable]))
      : (selectedLocation = selectedLocation);
    const sceneItem = createSceneItemElement(selectedLocation);
    root.appendChild(sceneItem);
  });
  if (selectedLocation == "Water" || selectedLocation == "Jetty") {
    conditionsData.forEach((item) => {
      let selectedOption = getSelectedOption(item.sceneSelector);
      selectedOption == "Random"
        ? (selectedOption = getRandomOption(options[item.sceneVariable]))
        : (selectedOption = selectedOption);
      const sceneItem = createSceneItemElement(selectedOption);
      root.appendChild(sceneItem);
    });
  }
}

const builtPatientsPlaceholder = document.getElementById(
  "built-patients-placeholder"
);

function buildPatients(number) {
  const patientsContainer = document.getElementById("patients-container");
  if (patientsContainer) {
    patientsContainer.remove();
  }
  const root = document.createElement("div");
  root.setAttribute("id", "patients-container");
  builtPatientsPlaceholder.appendChild(root);
  for (let i = 0; i < number; i++) {
    const patient = document.createElement("div");
    patient.setAttribute("id", `patient-${i + 1}`);
    patient.setAttribute("class", "patient fade-in");
    root.appendChild(patient);
    ageData.forEach((item) => {
      let selectedOption = getSelectedOption(item.sceneSelector);
      selectedOption == "Random"
        ? (selectedOption = getRandomOption(options[item.sceneVariable]))
        : (selectedOption = selectedOption);
      let optionIndex = getOptionIndex(item.sceneSelector, selectedOption);
      let randomAge = getRandomAge(
        options.age[optionIndex].min,
        options.age[optionIndex].max
      );
      const sceneItem = createSceneItemElement(randomAge);
      patient.appendChild(sceneItem);
    });
    patientsData.forEach((item) => {
      let selectedOption = getSelectedOption(item.sceneSelector);
      selectedOption == "Random"
        ? (selectedOption = getRandomOption(options[item.sceneVariable]))
        : (selectedOption = selectedOption);
      const sceneItem = createSceneItemElement(selectedOption);
      patient.appendChild(sceneItem);
    });
  }
}

buildSceneButton.addEventListener("click", () => {
  buildScene();
  let selectedPatients = getSelectedOption(selectors.patients);
  patientCountData.forEach((item) => {
    selectedPatients == "Random"
      ? (selectedPatients = getRandomOption(options[item.sceneVariable]))
      : (selectedPatients = selectedPatients);
  });
  buildPatients(selectedPatients);
});
/*
selectors.age.onchange = () => {
  let ageMin = options.age[selectors.age.selectedIndex].min;
  let ageMax = options.age[selectors.age.selectedIndex].max;
  let test = randomIntFromInterval(ageMin, ageMax);
  console.log(test);
};
*/
