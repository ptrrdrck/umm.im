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

  const callTimer = createDivElement(null, "call-timer");
  const elapsedTime = createTextElement(
    "span",
    "00:00",
    "timer",
    `timer-${patientNumber}`
  );
  callTimer.appendChild(elapsedTime);
  patientTitle.appendChild(callTimer);

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

  const sizeUpData = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpData);

  const sizeUpTitle = createDivElement(null, "card-title");
  const sizeUpTitleText = createTextElement("span", "Scene Size Up", null);
  sizeUpTitle.appendChild(sizeUpTitleText);
  sizeUpData.appendChild(sizeUpTitle);

  const sizeUpItem = createDivElement("patient-size-up", "assessment");

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
    sizeUpItem.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
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

  const primaryDataTitle = createDivElement(null, "card-title");
  const primaryDataTitleText = createTextElement(
    "span",
    `Primary Survey / Resuscitation`
  );
  primaryDataTitle.appendChild(primaryDataTitleText);
  primaryData.appendChild(primaryDataTitle);

  const primarySurveyItem = createDivElement(
    "patient-primary-survey",
    "assessment"
  );

  const primarySurveyLines = [
    { title: "General Impression", value: `${callData.generalImpression}` },
    {
      title: "Responsiveness, Level Of Consciousness (AVPU)",
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
    primarySurveyItem.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  primaryData.appendChild(primarySurveyItem);

  const primaryInfo = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryInfo);

  const primaryInfoTitle = createDivElement(null, "card-title");
  const primaryInfoTitleText = createTextElement("span", `Primary Vitals`);
  primaryInfoTitle.appendChild(primaryInfoTitleText);
  primaryInfo.appendChild(primaryInfoTitle);

  const primaryVitals = createDivElement(null, "vitals");
  primaryInfo.appendChild(primaryVitals);

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
    `${randomGCS.totalGCS}`,
    "vital-value"
  );
  gcsValue.appendChild(gcsValueText);
  gcsNameValue.appendChild(gcsValue);
  gcsGroup.appendChild(gcsNameValue);

  const gcsInfo = createDivElement(null, "vital-info");
  const gcsInfoText = createTextElement("span");
  gcsInfoText.innerHTML = `<b>E${randomGCS.eyeResponse.score}</b> (${randomGCS.eyeResponse.meaning}) <br><b>V${randomGCS.verbalResponse.score}</b> (${randomGCS.verbalResponse.meaning}) <br><b>M${randomGCS.motorResponse.score}</b> (${randomGCS.motorResponse.meaning})`;
  gcsInfo.appendChild(gcsInfoText);
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

  return primaryGroup;
};
