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

  const patientTitleInfo = createDivElement(null, "patient-title-info");

  const patientNumberText = createTextElement(
    "span",
    `Patient ${patientNumber}`,
    "patient-number"
  );
  patientTitleInfo.appendChild(patientNumberText);

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
  patientTitleInfo.appendChild(patientHeader);
  patientTitle.appendChild(patientTitleInfo);

  const patientTitleTools = createDivElement(null, "patient-title-info");

  const callTimer = createDivElement(null, "call-timer");
  const elapsedTime = createTextElement(
    "span",
    "00:00",
    "timer",
    `timer-${patientNumber}`
  );
  callTimer.appendChild(elapsedTime);
  patientTitleTools.appendChild(callTimer);
  patientTitle.appendChild(patientTitleTools);

  let timerInterval;
  let timerTime = { minutes: 0, seconds: 0 };

  patientTitle.addEventListener("click", () => {
    patientTitle.classList.toggle("active");
    ageItem.classList.toggle("active");

    if (patientTitle.classList.contains("active")) {
      timerInterval = startTimer(timerTime, patientNumber);
    } else {
      clearInterval(timerInterval);

      timerTime = {
        minutes: parseInt(elapsedTime.textContent.slice(0, 2)),
        seconds: parseInt(elapsedTime.textContent.slice(3)),
      };
    }
  });

  return patientTitle;
};

const buildSizeUp = (patientCount, callData) => {
  const sizeUpGroup = createDivElement(null, "patient-card-group");

  const sizeUpItem = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpItem);

  const sizeUpTitle = createDivElement(null, "card-title");
  const sizeUpTitleText = createTextElement("span", "Scene Size Up", null);
  sizeUpTitle.appendChild(sizeUpTitleText);
  sizeUpItem.appendChild(sizeUpTitle);

  const sizeUpData = createDivElement("patient-size-up", "assessment");

  const sizeUpLines = [
    { title: "Scene Safety", value: "Safe" },
    {
      title: `${callData.natureMechanismText}`,
      value: `${callData.natureMechanismValue}`,
    },
    { title: "Number of Patients", value: `${patientCount}` },
    { title: "Additional EMS", value: "?" },
    { title: "C-Spine Stabilization", value: "?" },
  ];

  sizeUpLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    sizeUpData.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  sizeUpItem.appendChild(sizeUpData);

  const sizeUpWhat = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpWhat);

  const sizeUpWhatTitle = createDivElement(null, "card-title");
  const sizeUpWhatTitleText = createTextElement("span", `En route/On scene`);
  sizeUpWhatTitle.appendChild(sizeUpWhatTitleText);
  sizeUpWhat.appendChild(sizeUpWhatTitle);

  const sizeUpWhy = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpWhy);

  const sizeUpWhyTitle = createDivElement(null, "card-title");
  const sizeUpWhyTitleText = createTextElement(
    "span",
    `Protocols/Medical knowledge`
  );
  sizeUpWhyTitle.appendChild(sizeUpWhyTitleText);
  sizeUpWhy.appendChild(sizeUpWhyTitle);

  return sizeUpGroup;
};

const buildPrimarySurvey = (callData) => {
  const primaryGroup = createDivElement(null, "patient-card-group");

  const primaryItem = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryItem);

  const primaryTitle = createDivElement(null, "card-title");
  const primaryTitleText = createTextElement(
    "span",
    `Primary Survey / Resuscitation`
  );
  primaryTitle.appendChild(primaryTitleText);
  primaryItem.appendChild(primaryTitle);

  const primaryData = createDivElement("patient-primary-survey", "assessment");

  const primarySurveyLines = [
    { title: "General Impression", value: `${callData.generalImpression}` },
    {
      title: "Responsiveness (AVPU)",
      value: `${callData.responsiveness}`,
    },
    { title: "Chief Complaint", value: `${callData.chiefComplaint}` },
    { title: "Apparent Life Threats", value: "?" },
    { title: "Airway", value: `${callData.airway}` },
    { title: "Breathing", value: `${callData.breathing}` },
    { title: "Circulation", value: `${callData.circulation}` },
    { title: "Patient Priority/Transport", value: "?" },
  ];

  primarySurveyLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    primaryData.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  primaryItem.appendChild(primaryData);

  const primaryWhat = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryWhat);

  const primaryWhatTitle = createDivElement(null, "card-title");
  const primaryWhatTitleText = createTextElement("span", `Initial Assessment`);
  primaryWhatTitle.appendChild(primaryWhatTitleText);
  primaryWhat.appendChild(primaryWhatTitle);

  const primaryVitals = createDivElement(null, "vitals");
  primaryWhat.appendChild(primaryVitals);

  const locGroup = createDivElement(null, "vital");
  primaryVitals.appendChild(locGroup);

  const locNameValue = createDivElement(null, "vital-name-value");
  const locName = createDivElement(null);
  const locNameText = createTextElement(
    "span",
    "Level of Consciousness",
    "vital-name"
  );
  locName.appendChild(locNameText);
  locNameValue.appendChild(locName);

  const randomLOC = getRandomLOC(callData.responsiveness);

  const locValue = createDivElement(null);
  const locValueText = createTextElement(
    "span",
    `A/O x ${randomLOC.score}`,
    "vital-value"
  );
  locValue.appendChild(locValueText);
  locNameValue.appendChild(locValue);
  locGroup.appendChild(locNameValue);

  const locInfo = createDivElement(null, "vital-info");
  const locOriented = createTextElement(
    "span",
    `${randomLOC.oriented}`,
    "loc-oriented"
  );
  locInfo.appendChild(locOriented);
  const locNotOriented = createTextElement(
    "span",
    `${randomLOC.notOriented}`,
    "loc-not-oriented"
  );
  locInfo.appendChild(locNotOriented);
  locGroup.appendChild(locInfo);

  const gcsGroup = createDivElement(null, "vital");
  primaryVitals.appendChild(gcsGroup);

  const gcsNameValue = createDivElement(null, "vital-name-value");
  const gcsName = createDivElement(null);
  const gcsNameText = createTextElement("span", "GCS", "vital-name");
  gcsName.appendChild(gcsNameText);
  gcsNameValue.appendChild(gcsName);

  const randomGCS = getRandomGCS(callData.chiefComplaint);

  const gcsValue = createDivElement(null);
  const gcsValueText = createTextElement(
    "span",
    `${randomGCS.totalGCS} (E${randomGCS.eyeResponse.score} V${randomGCS.verbalResponse.score} M${randomGCS.verbalResponse.score})`,
    "vital-value"
  );
  gcsValue.appendChild(gcsValueText);
  gcsNameValue.appendChild(gcsValue);
  gcsGroup.appendChild(gcsNameValue);

  const gcsInfo = createDivElement(null, "vital-info");
  const gcsEMeaning = createTextElement(
    "span",
    `Eyes: ${randomGCS.eyeResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsEMeaning);

  const gcsVMeaning = createTextElement(
    "span",
    `Verbal: ${randomGCS.verbalResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsVMeaning);

  const gcsMMeaning = createTextElement(
    "span",
    `Motor: ${randomGCS.motorResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsMMeaning);
  gcsGroup.appendChild(gcsInfo);

  const bpGroup = createDivElement(null, "vital");
  primaryVitals.appendChild(bpGroup);

  const bpNameValue = createDivElement(null, "vital-name-value");
  const bpName = createDivElement(null);
  const bpNameText = createTextElement("span", "Blood Pressure", "vital-name");
  bpName.appendChild(bpNameText);
  bpNameValue.appendChild(bpName);

  const randomBP = getRandomBloodPressure(callData.bloodPressure);

  const bpValue = createDivElement(null);
  const bpValueText = createTextElement(
    "span",
    `${randomBP.systolic}/${randomBP.diastolic} mmHg`,
    "vital-value"
  );
  bpValue.appendChild(bpValueText);
  bpNameValue.appendChild(bpValue);
  bpGroup.appendChild(bpNameValue);

  const bpInfo = createDivElement(null, "vital-info");
  const bpInfoText = createTextElement("span");
  bpInfoText.innerHTML = `${randomBP.range}`;
  bpInfo.appendChild(bpInfoText);
  bpGroup.appendChild(bpInfo);

  const pulseGroup = createDivElement(null, "vital");
  primaryVitals.appendChild(pulseGroup);

  const pulseNameValue = createDivElement(null, "vital-name-value");
  const pulseName = createDivElement(null);
  const pulseNameText = createTextElement("span", "Pulse", "vital-name");
  pulseName.appendChild(pulseNameText);
  pulseNameValue.appendChild(pulseName);

  const randomPulse = getRandomPulse(callData.pulse);

  const pulseValue = createDivElement(null);
  const pulseValueText = createTextElement(
    "span",
    `${randomPulse.pulse} bpm`,
    "vital-value"
  );
  pulseValue.appendChild(pulseValueText);
  pulseNameValue.appendChild(pulseValue);
  pulseGroup.appendChild(pulseNameValue);

  const pulseInfo = createDivElement(null, "vital-info");
  const pulseInfoText = createTextElement("span");
  pulseInfoText.innerHTML = `${randomPulse.range}`;
  pulseInfo.appendChild(pulseInfoText);
  pulseGroup.appendChild(pulseInfo);

  const primaryWhy = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryWhy);

  const primaryWhyTitle = createDivElement(null, "card-title");
  const primaryWhyTitleText = createTextElement(
    "span",
    `Protocols/Medical knowledge`
  );
  primaryWhyTitle.appendChild(primaryWhyTitleText);
  primaryWhy.appendChild(primaryWhyTitle);

  return primaryGroup;
};
