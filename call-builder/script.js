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

const selectButtons = {
  season: document.getElementById("season-select-button"),
  time: document.getElementById("time-select-button"),
  origin: document.getElementById("origin-select-button"),
  location: document.getElementById("location-select-button"),
  surf: document.getElementById("surf-select-button"),
  patients: document.getElementById("patients-select-button"),
  age: document.getElementById("age-select-button"),
  sex: document.getElementById("sex-select-button"),
  nature: document.getElementById("nature-select-button"),
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
    { name: "1", id: 2, weight: 93 },
    { name: "2", id: 3, weight: 4 },
    { name: "3", id: 4, weight: 1 },
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

function getOptionIndex(selector, optionName) {
  let options = Array.from(selector.options);
  return options.findIndex((opt) => opt.label == optionName);
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

loadOptions(selectors.season, options.season);

selectors.season.onchange = () => {
  handleSelectorChange(selectors.season, selectButtons.season);
};

loadOptions(selectors.time, options.time);

selectors.time.onchange = () => {
  handleSelectorChange(selectors.time, selectButtons.time);
};

loadOptions(selectors.origin, options.origin);

selectors.origin.onchange = () => {
  handleSelectorChange(selectors.origin, selectButtons.origin);
};

loadOptions(selectors.location, options.location);

selectors.location.onchange = () => {
  handleSelectorChange(selectors.location, selectButtons.location);
  let selectedLocation = getSelectedOption(selectors.location);
  if (selectedLocation === "Water" || selectedLocation === "Jetty") {
    document.getElementById("surf").classList.remove("hide");
  } else {
    document.getElementById("surf").classList.add("hide");
  }
};

loadOptions(selectors.surf, options.surf);

selectors.surf.onchange = () => {
  handleSelectorChange(selectors.surf, selectButtons.surf);
};

loadOptions(selectors.patients, options.patients);

selectors.patients.onchange = () => {
  handleSelectorChange(selectors.patients, selectButtons.patients);
};

loadOptions(selectors.age, options.age);

selectors.age.onchange = () => {
  handleSelectorChange(selectors.age, selectButtons.age);
};

loadOptions(selectors.sex, options.sex);

selectors.sex.onchange = () => {
  handleSelectorChange(selectors.sex, selectButtons.sex);
};

loadOptions(selectors.nature, options.nature);

selectors.nature.onchange = () => {
  handleSelectorChange(selectors.nature, selectButtons.nature);
};

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
  let selectedSeason = getSelectedOption(selectors.season);
  selectedSeason == "Random"
    ? (selectedSeason = getRandomOption(options.season))
    : (selectedSeason = selectedSeason);
  const seasonItem = createSceneItemElement(selectedSeason);
  root.appendChild(seasonItem);
  let selectedTime = getSelectedOption(selectors.time);
  selectedTime == "Random"
    ? (selectedTime = getRandomOption(options.time))
    : (selectedTime = selectedTime);
  const timeItem = createSceneItemElement(selectedTime);
  root.appendChild(timeItem);
  let selectedOrigin = getSelectedOption(selectors.origin);
  selectedOrigin == "Random"
    ? (selectedOrigin = getRandomOption(options.origin))
    : (selectedOrigin = selectedOrigin);
  const originItem = createSceneItemElement(selectedOrigin);
  root.appendChild(originItem);
  let selectedLocation = getSelectedOption(selectors.location);
  selectedLocation == "Random"
    ? (selectedLocation = getRandomOption(options.location))
    : (selectedLocation = selectedLocation);
  const locationItem = createSceneItemElement(selectedLocation);
  root.appendChild(locationItem);
  if (selectedLocation == "Water" || selectedLocation == "Jetty") {
    let selectedSurf = getSelectedOption(selectors.surf);
    selectedSurf == "Random"
      ? (selectedSurf = getRandomOption(options.surf))
      : (selectedSurf = selectedSurf);
    const surfItem = createSceneItemElement(selectedSurf);
    root.appendChild(surfItem);
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
    let selectedAge = getSelectedOption(selectors.age);
    selectedAge == "Random"
      ? (selectedAge = getRandomOption(options.age))
      : (selectedAge = selectedAge);
    let optionIndex = getOptionIndex(selectors.age, selectedAge);
    let randomAge = getRandomAge(
      options.age[optionIndex].min,
      options.age[optionIndex].max
    );
    const ageItem = createSceneItemElement(randomAge);
    patient.appendChild(ageItem);
    let selectedSex = getSelectedOption(selectors.sex);
    selectedSex == "Random"
      ? (selectedSex = getRandomOption(options.sex))
      : (selectedSex = selectedSex);
    const sexItem = createSceneItemElement(selectedSex);
    patient.appendChild(sexItem);
    let selectedNature = getSelectedOption(selectors.nature);
    selectedNature == "Random"
      ? (selectedNature = getRandomOption(options.nature))
      : (selectedNature = selectedNature);
    const natureItem = createSceneItemElement(selectedNature);
    patient.appendChild(natureItem);
  }
}

buildSceneButton.addEventListener("click", () => {
  buildScene();
  let selectedPatients = getSelectedOption(selectors.patients);
  selectedPatients == "Random"
    ? (selectedPatients = getRandomOption(options.patients))
    : (selectedPatients = selectedPatients);
  buildPatients(selectedPatients);
});
