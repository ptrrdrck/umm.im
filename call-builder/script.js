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
    { name: "Random" },
    { name: "Winter", weight: 25 },
    { name: "Spring", weight: 25 },
    { name: "Summer", weight: 25 },
    { name: "Fall", weight: 25 },
  ],
  time: [
    { name: "Random" },
    { name: "Morning", weight: 25 },
    { name: "Afternoon", weight: 50 },
    { name: "Evening", weight: 25 },
  ],
  origin: [
    { name: "Random" },
    { name: "Observed", weight: 40 },
    { name: "Reported", weight: 50 },
    { name: "911 Call", weight: 10 },
  ],
  location: [
    { name: "Random" },
    { name: "Beach", weight: 35 },
    { name: "Water", weight: 30 },
    { name: "Jetty", weight: 30 },
    { name: "Boardwalk", weight: 5 },
  ],
  surf: [
    { name: "Random" },
    { name: "1-2 ft", weight: 27 },
    { name: "3-5 ft", weight: 55 },
    { name: "6-9 ft", weight: 15 },
    { name: "10-14 ft", weight: 2 },
    { name: "15 ft +", weight: 1 },
  ],
  patients: [
    { name: "Random" },
    { name: "1", weight: 93 },
    { name: "2", weight: 4 },
    { name: "3", weight: 1 },
    { name: "4", weight: 1 },
    { name: "5", weight: 1 },
  ],
  age: [
    { name: "Random" },
    { name: "0-9", weight: 5, min: 0, max: 9 },
    { name: "10-19", weight: 25, min: 10, max: 19 },
    { name: "20-29", weight: 25, min: 20, max: 29 },
    { name: "30-49", weight: 25, min: 30, max: 49 },
    { name: "50+", weight: 20, min: 50, max: 79 },
  ],
  sex: [
    { name: "Random" },
    { name: "Male", weight: 50 },
    { name: "Female", weight: 50 },
  ],
  nature: [
    { name: "Random" },
    { name: "Medical", weight: 50 },
    { name: "Trauma", weight: 50 },
  ],
};

const createOptionElement = (option) => {
  const element = document.createElement("option");
  element.textContent = option.name;
  return element;
};

const createTextSpanElement = (text) => {
  const element = document.createElement("span");
  element.textContent = text;
  return element;
};

const createTextElement = (tag, text, className, id) => {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.classList.add(className);
  if (id) element.id = id;
  return element;
};

const createDivElement = (id, className) => {
  const div = document.createElement("div");
  if (id) div.setAttribute("id", id);
  if (className) div.classList.add(className);
  return div;
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

const getOptionIndex = (selector, optionName) => {
  const options = Array.from(selector.options);
  return options.findIndex((opt) => opt.label == optionName);
};

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

const buildDateTimeContainer = () => {
  const dateTimeContainer = createDivElement("scene-date-time");

  let selectedSeason = getSelectedOption(selectors.season);
  selectedSeason =
    selectedSeason === "Random"
      ? getRandomOption(options.season)
      : selectedSeason;

  let selectedTime = getSelectedOption(selectors.time);
  selectedTime =
    selectedTime === "Random" ? getRandomOption(options.time) : selectedTime;

  const randomDate = getRandomDate(selectedSeason);
  const randomTime = getRandomTime(selectedTime);

  const dateItem = createTextElement(
    "span",
    `${randomDate}, ${randomTime}`,
    "scene-info"
  );
  dateTimeContainer.appendChild(dateItem);

  const seasonItem = createTextElement(
    "span",
    `(${selectedSeason}, ${selectedTime})`,
    "scene-desc"
  );
  dateTimeContainer.appendChild(seasonItem);

  const root = document.getElementById("built-scene");
  root.appendChild(dateTimeContainer);
};

const buildOriginContainer = () => {
  const originContainer = createDivElement("scene-origin");

  let selectedOrigin = getSelectedOption(selectors.origin);
  selectedOrigin =
    selectedOrigin === "Random"
      ? getRandomOption(options.origin)
      : selectedOrigin;
  const originItem = createTextElement("span", selectedOrigin, "scene-info");
  originContainer.appendChild(originItem);

  const originDesc = createTextElement("span", "(Origin)", "scene-desc");
  originContainer.appendChild(originDesc);

  const root = document.getElementById("built-scene");
  root.appendChild(originContainer);
};

const buildLocationContainer = () => {
  const locationContainer = createDivElement("scene-location");

  let selectedLocation = getSelectedOption(selectors.location);
  selectedLocation =
    selectedLocation === "Random"
      ? getRandomOption(options.location)
      : selectedLocation;
  const locationItem = createTextElement(
    "span",
    selectedLocation,
    "scene-info"
  );
  locationContainer.appendChild(locationItem);

  if (selectedLocation === "Water" || selectedLocation === "Jetty") {
    let selectedSurf = getSelectedOption(selectors.surf);
    selectedSurf =
      selectedSurf === "Random" ? getRandomOption(options.surf) : selectedSurf;
    const surfItem = createTextElement(
      "span",
      `(Wave Height: ${selectedSurf})`,
      "scene-desc"
    );
    locationContainer.appendChild(surfItem);
  } else {
    const locationDesc = createTextElement("span", "(Location)", "scene-desc");
    locationContainer.appendChild(locationDesc);
  }

  const root = document.getElementById("built-scene");
  root.appendChild(locationContainer);
};

const builtScenePlaceholder = document.getElementById(
  "built-scene-placeholder"
);

const buildScene = () => {
  const builtScene = document.getElementById("built-scene");
  if (builtScene) {
    builtScene.remove();
  }
  const root = createDivElement("built-scene");
  builtScenePlaceholder.appendChild(root);

  buildDateTimeContainer();
  buildOriginContainer();
  buildLocationContainer();
};

const buildPatientTitleContainer = () => {};

const builtPatientsPlaceholder = document.getElementById(
  "built-patients-placeholder"
);

const buildPatients = (number) => {
  const patientsContainer = document.getElementById("patients-container");
  if (patientsContainer) {
    patientsContainer.remove();
  }
  const root = createDivElement("patients-container");
  builtPatientsPlaceholder.appendChild(root);

  for (let i = 0; i < number; i++) {
    let patientCount = number;
    const patientTitle = createDivElement(
      `patient-${i + 1}-title`,
      "patient-title"
    );
    const patientTitleText = createTextElement(
      "span",
      `Patient ${i + 1}`,
      "patient-number"
    );
    patientTitle.appendChild(patientTitleText);

    const patientHeader = createDivElement(null, "patient-header");

    let selectedAge = getSelectedOption(selectors.age);
    selectedAge =
      selectedAge === "Random" ? getRandomOption(options.age) : selectedAge;
    const optionIndex = getOptionIndex(selectors.age, selectedAge);
    const randomAge = getRandomAge(
      options.age[optionIndex].min,
      options.age[optionIndex].max
    );
    const ageItem = createTextElement("span", randomAge, "age");
    patientHeader.appendChild(ageItem);

    let selectedSex = getSelectedOption(selectors.sex);
    selectedSex =
      selectedSex === "Random" ? getRandomOption(options.sex) : selectedSex;
    const sexItem = createTextElement("span", selectedSex, "sex");
    patientHeader.appendChild(sexItem);

    let selectedNature = getSelectedOption(selectors.nature);
    selectedNature =
      selectedNature === "Random"
        ? getRandomOption(options.nature)
        : selectedNature;
    const natureItem = createTextElement(
      "span",
      `(${selectedNature})`,
      "nature"
    );
    patientHeader.appendChild(natureItem);
    patientTitle.appendChild(patientHeader);
    root.appendChild(patientTitle);

    patientTitle.addEventListener("click", () => {
      patientTitle.classList.toggle("active");
      patient.classList.toggle("active");
      ageItem.classList.toggle("active");
    });

    const patient = createDivElement(`patient-${i + 1}`, "patient");
    root.appendChild(patient);

    const patientBody = createDivElement(null, "patient-body");
    patient.appendChild(patientBody);

    const sizeUpGroup = createDivElement(null, "size-up-group");
    patientBody.appendChild(sizeUpGroup);

    const sizeUpTitle = createDivElement(null, "patient-sub-title");
    const sizeUpTitleText = createTextElement("span", "Scene Size Up", null);
    sizeUpTitle.appendChild(sizeUpTitleText);
    sizeUpGroup.appendChild(sizeUpTitle);

    const sizeUpItem = createDivElement("patient-size-up", "assessment");
    let chiefComplaint;
    let bloodPressure;
    let pulse;
    const medicalChief = getRandomChiefComplaint(medicalChiefComplaints);
    const traumaChief = getRandomChiefComplaint(traumaChiefComplaints);
    if (selectedNature === "Medical") {
      const assessmentLines = [
        `Scene Safety: Safe`,
        `Nature of Illness: ${medicalChief.nature}`,
        `Number of Patients: ${patientCount}`,
        `Additional EMS: Yes`,
        `C-Spine Stabilization: Yes`,
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = createTextElement(
          "div",
          line,
          null,
          `size-up-line-${index + 1}`
        );
        sizeUpItem.appendChild(lineElement);
      });
      chiefComplaint = medicalChief.complaint;
      bloodPressure = medicalChief.bloodPressure;
      pulse = medicalChief.pulse;
    } else if (selectedNature === "Trauma") {
      const assessmentLines = [
        `Scene Safety: Safe`,
        `Mechanism of Injury: ${traumaChief.mechanism}`,
        `Number of Patients: ${patientCount}`,
        `Additional EMS: Yes`,
        `C-Spine Stabilization: Yes`,
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = createTextElement(
          "div",
          line,
          null,
          `size-up-line-${index + 1}`
        );
        sizeUpItem.appendChild(lineElement);
      });
      chiefComplaint = traumaChief.complaint;
      bloodPressure = traumaChief.bloodPressure;
      pulse = traumaChief.pulse;
    }
    sizeUpGroup.appendChild(sizeUpItem);

    const vitalsItem = createDivElement(null, "assessment");

    const randomGCS = getRandomGCS(chiefComplaint);
    const gcsItem = createTextElement("span", null, "blood-pressure");
    gcsItem.innerHTML = `GCS: ${randomGCS.totalGCS} <br>E${randomGCS.eyeResponse.score} (${randomGCS.eyeResponse.meaning}) <br>V${randomGCS.verbalResponse.score} (${randomGCS.verbalResponse.meaning}) <br>M${randomGCS.motorResponse.score} (${randomGCS.motorResponse.meaning})`;
    vitalsItem.appendChild(gcsItem);

    const randomBloodPressure = getRandomBloodPressure(bloodPressure);
    const bloodPressureItem = createTextElement(
      "span",
      `Blood Pressure: ${randomBloodPressure}`,
      "blood-pressure"
    );
    vitalsItem.appendChild(bloodPressureItem);

    const randomPulse = getRandomPulse(pulse);
    const pulseItem = createTextElement(
      "span",
      `Pulse: ${randomPulse}`,
      "blood-pressure"
    );
    vitalsItem.appendChild(pulseItem);

    setDivContent(sizeUpTitle, sizeUpItem, vitalsItem);

    const primaryGroup = createDivElement(null, "size-up-group");
    patientBody.appendChild(primaryGroup);

    const primarySurveyTitle = createDivElement(null, "patient-sub-title");
    const primarySurveyTitleText = createTextElement(
      "span",
      `Primary Survey / Resuscitation`
    );
    primarySurveyTitle.appendChild(primarySurveyTitleText);
    primaryGroup.appendChild(primarySurveyTitle);

    const primarySurveyItem = createDivElement(
      "patient-primary-survey",
      "assessment"
    );
    if (selectedNature === "Medical") {
      const assessmentLines = [
        `General Impression: `,
        `Responsiveness/LOC (AVPU): ${medicalChief.responsiveness}`,
        `Chief Complaint: ${medicalChief.complaint}`,
        `Apparent Life Threats: `,
        `Airway: ${medicalChief.airway}`,
        `Breathing: ${medicalChief.breathing}`,
        `Circulation: ${medicalChief.circulation}`,
        `Patient Priority/Transport: `,
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = createTextElement(
          "div",
          line,
          null,
          `primary-line-${index + 1}`
        );
        primarySurveyItem.appendChild(lineElement);
      });
    } else if (selectedNature === "Trauma") {
      const assessmentLines = [
        `General Impression: `,
        `Responsiveness/LOC (AVPU): ${traumaChief.responsiveness}`,
        `Chief Complaint: ${traumaChief.complaint}`,
        `Apparent Life Threats: `,
        `Airway: ${traumaChief.airway}`,
        `Breathing: ${traumaChief.breathing}`,
        `Circulation: ${traumaChief.circulation}`,
        `Patient Priority/Transport: `,
      ];
      assessmentLines.forEach((line, index) => {
        const lineElement = createTextElement(
          "div",
          line,
          null,
          `primary-line-${index + 1}`
        );
        primarySurveyItem.appendChild(lineElement);
      });
    }
    primaryGroup.appendChild(primarySurveyItem);

    setDivContent(primarySurveyTitle, primarySurveyItem, vitalsItem);
  }
};

const buildSceneButton = document.getElementById("build-scene-button");

buildSceneButton.addEventListener("click", () => {
  buildScene();
  let selectedPatients = getSelectedOption(selectors.patients);
  selectedPatients =
    selectedPatients === "Random"
      ? getRandomOption(options.patients)
      : selectedPatients;
  buildPatients(selectedPatients);
});
