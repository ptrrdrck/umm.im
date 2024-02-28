/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

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

  return dateTimeContainer;
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

  return originContainer;
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

  return locationContainer;
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

  const dateTimeContainer = buildDateTimeContainer();
  root.appendChild(dateTimeContainer);

  const originContainer = buildOriginContainer();
  root.appendChild(originContainer);

  const locationContainer = buildLocationContainer();
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

  const root = createDivElement("patients-container");
  builtPatientsPlaceholder.appendChild(root);

  for (let i = 0; i < number; i++) {
    let selectedAge = getSelectedOption(selectors.age);
    let selectedSex = getSelectedOption(selectors.sex);
    let selectedNature = getSelectedOption(selectors.nature);
    let patientCount = number;

    selectedAge =
      selectedAge === "Random" ? getRandomOption(options.age) : selectedAge;

    selectedSex =
      selectedSex === "Random" ? getRandomOption(options.sex) : selectedSex;

    selectedNature =
      selectedNature === "Random"
        ? getRandomOption(options.nature)
        : selectedNature;

    let callData = getChiefComplaint(selectedNature);

    buildPatientElements(
      i + 1,
      selectedAge,
      selectedSex,
      selectedNature,
      patientCount,
      callData
    );
  }
};

const buildPatientElements = (
  patientNumber,
  selectedAge,
  selectedSex,
  selectedNature,
  patientCount,
  callData
) => {
  const root = document.getElementById("patients-container");

  const patientTitle = buildPatientTitle(
    patientNumber,
    selectedAge,
    selectedSex,
    selectedNature
  );
  root.appendChild(patientTitle);

  const patient = createDivElement(`patient-${patientNumber}`, "patient");
  root.appendChild(patient);

  const patientTitleDOM = document.getElementById(
    `patient-${patientNumber}-title`
  );

  patientTitleDOM.addEventListener("click", () => {
    patient.classList.toggle("active");
  });

  const patientBody = createDivElement(null, "patient-body");
  patient.appendChild(patientBody);

  const patientSizeUp = buildSizeUp(patientCount, callData);
  patientBody.appendChild(patientSizeUp);

  const patientPrimarySurvey = buildPrimarySurvey(callData);
  patientBody.appendChild(patientPrimarySurvey);
};

const buildPatientTitle = (
  patientNumber,
  selectedAge,
  selectedSex,
  selectedNature
) => {
  const patientTitle = createDivElement(
    `patient-${patientNumber}-title`,
    "patient-title"
  );

  const patientNumberText = createTextElement(
    "span",
    `Patient ${patientNumber}`,
    "patient-number"
  );
  patientTitle.appendChild(patientNumberText);

  const patientHeader = createDivElement(null, "patient-header");

  const optionIndex = getOptionIndex(selectors.age, selectedAge);
  const randomAge = getRandomAge(
    options.age[optionIndex].min,
    options.age[optionIndex].max
  );
  const ageItem = createTextElement("span", randomAge, "age");
  patientHeader.appendChild(ageItem);

  const sexItem = createTextElement("span", selectedSex, "sex");
  patientHeader.appendChild(sexItem);

  const natureItem = createTextElement("span", `(${selectedNature})`, "nature");
  patientHeader.appendChild(natureItem);
  patientTitle.appendChild(patientHeader);

  patientTitle.addEventListener("click", () => {
    patientTitle.classList.toggle("active");
    ageItem.classList.toggle("active");
  });

  return patientTitle;
};

const buildSizeUp = (patientCount, callData) => {
  const sizeUpGroup = createDivElement(null, "patient-card-group");

  const sizeUpData = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpData);

  const sizeUpTitle = createDivElement(null, "card-title");
  const sizeUpTitleText = createTextElement("span", "Scene Size Up", null);
  sizeUpTitle.appendChild(sizeUpTitleText);
  sizeUpData.appendChild(sizeUpTitle);

  const sizeUpItem = createDivElement("patient-size-up", "assessment");

  const sizeUpLines = [
    `Scene Safety: Safe`,
    `${callData.natureMechanism}`,
    `Number of Patients: ${patientCount}`,
    `Additional EMS: ?`,
    `C-Spine Stabilization: ?`,
  ];
  sizeUpLines.forEach((line, index) => {
    const lineElement = createTextElement(
      "div",
      line,
      null,
      `size-up-line-${index + 1}`
    );
    sizeUpItem.appendChild(lineElement);
  });
  sizeUpData.appendChild(sizeUpItem);

  const sizeUpDataInfo = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpDataInfo);

  return sizeUpGroup;
};

const buildPrimarySurvey = (callData) => {
  const primaryGroup = createDivElement(null, "patient-card-group");

  const primaryData = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryData);

  const primarySurveyTitle = createDivElement(null, "card-title");
  const primarySurveyTitleText = createTextElement(
    "span",
    `Primary Survey / Resuscitation`
  );
  primarySurveyTitle.appendChild(primarySurveyTitleText);
  primaryData.appendChild(primarySurveyTitle);

  const primarySurveyItem = createDivElement(
    "patient-primary-survey",
    "assessment"
  );

  const primarySurveyLines = [
    `General Impression: ?`,
    `Responsiveness/LOC (AVPU): ${callData.responsiveness}`,
    `Chief Complaint: ${callData.chiefComplaint}`,
    `Apparent Life Threats: ?`,
    `Airway: ${callData.airway}`,
    `Breathing: ${callData.breathing}`,
    `Circulation: ${callData.circulation}`,
    `Patient Priority/Transport: ?`,
  ];
  primarySurveyLines.forEach((line, index) => {
    const lineElement = createTextElement(
      "div",
      line,
      null,
      `primary-line-${index + 1}`
    );
    primarySurveyItem.appendChild(lineElement);
  });
  primaryData.appendChild(primarySurveyItem);

  const primaryInfo = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryInfo);

  const vitalsItem = createDivElement(null, "assessment");
  primaryInfo.appendChild(vitalsItem);

  const randomGCS = getRandomGCS(callData.chiefComplaint);
  const gcsItem = createTextElement("span", null, "blood-pressure");
  gcsItem.innerHTML = `GCS: ${randomGCS.totalGCS} <br>E${randomGCS.eyeResponse.score} (${randomGCS.eyeResponse.meaning}) <br>V${randomGCS.verbalResponse.score} (${randomGCS.verbalResponse.meaning}) <br>M${randomGCS.motorResponse.score} (${randomGCS.motorResponse.meaning})`;
  vitalsItem.appendChild(gcsItem);

  const randomBloodPressure = getRandomBloodPressure(callData.bloodPressure);
  const bloodPressureItem = createTextElement(
    "span",
    `Blood Pressure: ${randomBloodPressure}`,
    "blood-pressure"
  );
  vitalsItem.appendChild(bloodPressureItem);

  const randomPulse = getRandomPulse(callData.pulse);
  const pulseItem = createTextElement(
    "span",
    `Pulse: ${randomPulse}`,
    "blood-pressure"
  );
  vitalsItem.appendChild(pulseItem);

  return primaryGroup;
};
