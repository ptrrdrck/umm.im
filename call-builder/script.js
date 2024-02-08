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

const createOptionElement = (option) => {
  const element = document.createElement("option");
  element.value = option.id;
  element.textContent = option.name;
  return element;
};

const createSceneItemElement = (text) => {
  const element = document.createElement("span");
  element.textContent = text;
  /*element.classList.add("scene-item");*/
  return element;
};

const loadOptions = (selector, variable) => {
  variable.forEach((item) => {
    const option = createOptionElement(item);
    selector.appendChild(option);
  });
};

const getSelectedOption = (selector) => {
  return selector.options[selector.selectedIndex].text;
};

const handleSelectorChange = (selector, selectButton) => {
  const selectedOption = getSelectedOption(selector);
  selectButton.classList.toggle(
    "changed-select-button",
    selectedOption !== "Random"
  );
};

const getRandomOption = (arr) => {
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
};

const getOptionIndex = (selector, optionName) => {
  const options = Array.from(selector.options);
  return options.findIndex((opt) => opt.label == optionName);
};

const getRandomAge = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  if (randomValue === 0) {
    const months = Math.floor(Math.random() * 11) + 1;
    return months ? (months === 1 ? "1 month" : `${months} months`) : months;
  }
  return randomValue;
};

function getRandomTime(selectedTime) {
  const timeRanges = {
    Morning: { start: 6, end: 12 },
    Afternoon: { start: 12, end: 16 },
    Evening: { start: 16, end: 21 },
  };
  const { start, end } = timeRanges[selectedTime];
  const randomHour = Math.floor(Math.random() * (end - start) + start);
  const randomMinutes = Math.floor(Math.random() * 60);
  const formattedTime = `${String(randomHour).padStart(2, "0")}:${String(
    randomMinutes
  ).padStart(2, "0")}`;
  return formattedTime;
}

function getRandomDate(selectedSeason) {
  const seasonMonths = {
    Winter: { start: 11, end: 2 },
    Spring: { start: 3, end: 5 },
    Summer: { start: 6, end: 8 },
    Fall: { start: 9, end: 10 },
  };

  const { start, end } = seasonMonths[selectedSeason];

  let randomMonth;
  if (selectedSeason === "Winter") {
    const winterMonths = [11, 12, 1, 2];
    randomMonth = winterMonths[Math.floor(Math.random() * winterMonths.length)];
  } else {
    randomMonth = getRandomAge(start, end);
  }

  const daysInMonth = new Date(2022, randomMonth, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

  return `${randomMonth}/${randomDay}`;
}

loadOptions(selectors.season, options.season);
selectors.season.addEventListener("change", () => {
  handleSelectorChange(selectors.season, selectButtons.season);
});

loadOptions(selectors.time, options.time);
selectors.time.addEventListener("change", () => {
  handleSelectorChange(selectors.time, selectButtons.time);
});

loadOptions(selectors.origin, options.origin);
selectors.origin.addEventListener("change", () => {
  handleSelectorChange(selectors.origin, selectButtons.origin);
});

loadOptions(selectors.location, options.location);
selectors.location.addEventListener("change", () => {
  handleSelectorChange(selectors.location, selectButtons.location);
  const selectedLocation = getSelectedOption(selectors.location);
  document
    .getElementById("surf")
    .classList.toggle(
      "hide",
      !(selectedLocation === "Water" || selectedLocation === "Jetty")
    );
});

loadOptions(selectors.surf, options.surf);
selectors.surf.addEventListener("change", () => {
  handleSelectorChange(selectors.surf, selectButtons.surf);
});

loadOptions(selectors.patients, options.patients);
selectors.patients.addEventListener("change", () => {
  handleSelectorChange(selectors.patients, selectButtons.patients);
});

loadOptions(selectors.age, options.age);
selectors.age.addEventListener("change", () => {
  handleSelectorChange(selectors.age, selectButtons.age);
});

loadOptions(selectors.sex, options.sex);
selectors.sex.addEventListener("change", () => {
  handleSelectorChange(selectors.sex, selectButtons.sex);
});

loadOptions(selectors.nature, options.nature);
selectors.nature.addEventListener("change", () => {
  handleSelectorChange(selectors.nature, selectButtons.nature);
});

const buildSceneButton = document.getElementById("build-scene-button");
const builtScenePlaceholder = document.getElementById(
  "built-scene-placeholder"
);

const buildScene = () => {
  const builtScene = document.getElementById("built-scene");
  if (builtScene) {
    builtScene.remove();
  }
  const root = document.createElement("div");
  root.setAttribute("id", "built-scene");
  root.classList.add("fade-in");
  builtScenePlaceholder.appendChild(root);

  const dateTimeContainer = document.createElement("div");
  dateTimeContainer.setAttribute("id", "scene-date-time");
  dateTimeContainer.classList.add("fade-in");
  let selectedSeason = getSelectedOption(selectors.season);
  selectedSeason =
    selectedSeason === "Random"
      ? getRandomOption(options.season)
      : selectedSeason;
  let selectedTime = getSelectedOption(selectors.time);
  selectedTime =
    selectedTime === "Random" ? getRandomOption(options.time) : selectedTime;
  let randomDate = getRandomDate(selectedSeason);
  let randomTime = getRandomTime(selectedTime);
  const dateItem = createSceneItemElement(`${randomDate}, ${randomTime}`);
  dateItem.classList.add("scene-info");
  dateTimeContainer.appendChild(dateItem);
  const seasonItem = createSceneItemElement(
    `(${selectedSeason}, ${selectedTime})`
  );
  seasonItem.classList.add("scene-desc");
  dateTimeContainer.appendChild(seasonItem);
  root.appendChild(dateTimeContainer);

  const originContainer = document.createElement("div");
  originContainer.setAttribute("id", "scene-origin");
  originContainer.classList.add("fade-in");
  let selectedOrigin = getSelectedOption(selectors.origin);
  selectedOrigin =
    selectedOrigin === "Random"
      ? getRandomOption(options.origin)
      : selectedOrigin;
  const originItem = createSceneItemElement(`${selectedOrigin}`);
  originItem.classList.add("scene-info");
  originContainer.appendChild(originItem);
  const originDesc = createSceneItemElement(`(Origin)`);
  originDesc.classList.add("scene-desc");
  originContainer.appendChild(originDesc);
  root.appendChild(originContainer);

  const locationContainer = document.createElement("div");
  locationContainer.setAttribute("id", "scene-location");
  locationContainer.classList.add("fade-in");
  let selectedLocation = getSelectedOption(selectors.location);
  selectedLocation =
    selectedLocation === "Random"
      ? getRandomOption(options.location)
      : selectedLocation;
  const locationItem = createSceneItemElement(`${selectedLocation}`);
  locationItem.classList.add("scene-info");
  locationContainer.appendChild(locationItem);
  if (selectedLocation === "Water" || selectedLocation === "Jetty") {
    let selectedSurf = getSelectedOption(selectors.surf);
    selectedSurf =
      selectedSurf === "Random" ? getRandomOption(options.surf) : selectedSurf;
    const surfItem = createSceneItemElement(`Wave Height: ${selectedSurf}`);
    surfItem.classList.add("scene-desc");
    locationContainer.appendChild(surfItem);
  } else {
    const locationDesc = createSceneItemElement(`(Location)`);
    locationDesc.classList.add("scene-desc");
    locationContainer.appendChild(locationDesc);
  }
  root.appendChild(locationContainer);
};

const builtPatientsPlaceholder = document.getElementById(
  "built-patients-placeholder"
);

const buildPatients = (number) => {
  const patientsContainer = document.getElementById("patients-container");
  if (patientsContainer) {
    patientsContainer.remove();
  }
  const root = document.createElement("div");
  root.setAttribute("id", "patients-container");
  builtPatientsPlaceholder.appendChild(root);
  for (let i = 0; i < number; i++) {
    const patientTitle = document.createElement("div");
    patientTitle.setAttribute("class", "patient-title fade-in");
    const patientTitleText = createSceneItemElement(`Patient ${i + 1}`);
    patientTitle.appendChild(patientTitleText);
    root.appendChild(patientTitle);
    const patient = document.createElement("div");
    patient.setAttribute("id", `patient-${i + 1}`);
    patient.setAttribute("class", "patient fade-in");
    root.appendChild(patient);

    const patientHeader = document.createElement("div");
    patientHeader.classList.add("patient-header", "fade-in");
    let selectedAge = getSelectedOption(selectors.age);
    selectedAge =
      selectedAge === "Random" ? getRandomOption(options.age) : selectedAge;
    const optionIndex = getOptionIndex(selectors.age, selectedAge);
    const randomAge = getRandomAge(
      options.age[optionIndex].min,
      options.age[optionIndex].max
    );
    const ageItem = createSceneItemElement(`${randomAge}`);
    ageItem.classList.add("age");
    patientHeader.appendChild(ageItem);
    let selectedSex = getSelectedOption(selectors.sex);
    selectedSex =
      selectedSex === "Random" ? getRandomOption(options.sex) : selectedSex;
    const sexItem = createSceneItemElement(`${selectedSex}`);
    sexItem.classList.add("sex");
    patientHeader.appendChild(sexItem);
    let selectedNature = getSelectedOption(selectors.nature);
    selectedNature =
      selectedNature === "Random"
        ? getRandomOption(options.nature)
        : selectedNature;
    const natureItem = createSceneItemElement(`(${selectedNature})`);
    natureItem.classList.add("nature");
    patientHeader.appendChild(natureItem);
    patient.appendChild(patientHeader);

    const assessmentItem = document.createElement("div");
    assessmentItem.classList.add("assessment");
    if (selectedNature === "Medical") {
      const medicalChief = getRandomChiefComplaint(medicalChiefComplaints);
      const assessmentLines = [
        "1. Scene Safety - Safe",
        `2. Nature of Illness - ${medicalChief.nature}`,
        `3. Check responsiveness - ${medicalChief.responsiveness}`,
        `4. Chief Complaint - ${medicalChief.complaint}`,
        `5. Airway - ${medicalChief.airway}`,
        `6. Breathing - ${medicalChief.breathing}`,
        `7. Circulation - ${medicalChief.circulation}`,
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        lineElement.setAttribute("id", `assessment-line-${index + 1}`);
        assessmentItem.appendChild(lineElement);
      });
    } else if (selectedNature === "Trauma") {
      const traumaChief = getRandomChiefComplaint(traumaChiefComplaints);
      const assessmentLines = [
        "1. Scene Safety - Safe\n",
        `2. Mechanism of Injury - ${traumaChief.mechanism}\n`,
        "3. Check responsiveness - Responsive\n",
        `4. Chief Complaint - ${traumaChief.complaint}\n`,
        "5. Airway - Clear\n",
        "6. Breathing - Normal\n",
        "7. Circulation - Pulse present\n",
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        lineElement.setAttribute("id", `assessment-line-${index + 1}`);
        assessmentItem.appendChild(lineElement);
      });
    }
    patient.appendChild(assessmentItem);
  }
};

buildSceneButton.addEventListener("click", () => {
  buildScene();
  let selectedPatients = getSelectedOption(selectors.patients);
  selectedPatients =
    selectedPatients === "Random"
      ? getRandomOption(options.patients)
      : selectedPatients;
  buildPatients(selectedPatients);
});
