/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const medicalChiefComplaints = [
  {
    complaint: "Chest pain",
    nature: "Cardiac",
    responsiveness: "Responsive: Alert",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "High",
    pulse: "High",
  },
  {
    complaint: "Shortness of breath",
    nature: "Respiratory",
    responsiveness: "Responsive: to Verbal",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Abdominal pain",
    nature: "Gastrointestinal",
    responsiveness: "Responsive: to Pain",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Headache",
    nature: "Neurological",
    responsiveness: "Responsive: Alert",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Dizziness",
    nature: "Neurological",
    responsiveness: "Responsive: Alert",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Nausea",
    nature: "Gastrointestinal",
    responsiveness: "Responsive: to Verbal",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Vomiting",
    nature: "Gastrointestinal",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Allergic reaction",
    nature: "Allergic/Immunologic",
    responsiveness: "Responsive: Alert",
    airway: "May be compromised",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Seizure",
    nature: "Neurological",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Fever",
    nature: "Infectious",
    responsiveness: "Responsive: Alert",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Cardiac arrest",
    nature: "Cardiac",
    responsiveness: "Unresponsive",
    airway: "May be compromised",
    breathing: "Absent",
    circulation: "Pulse absent",
    bloodPressure: "Low",
    pulse: "None",
  },
];

const traumaChiefComplaints = [
  {
    complaint: "Motor vehicle accident",
    mechanism: "Blunt trauma",
    responsiveness: "Responsive: Alert",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Fall from height",
    mechanism: "Fall",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Bicycle accident",
    mechanism: "Blunt trauma",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Assault",
    mechanism: "Blunt or penetrating trauma",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Sports injury",
    mechanism: "Blunt trauma",
    responsiveness: "Responsive: Alert",
    airway: "Clear",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
  },
  {
    complaint: "Burn",
    mechanism: "Burn",
    responsiveness: "Responsive: Alert",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Penetrating trauma",
    mechanism: "Penetrating trauma",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Animal bite",
    mechanism: "Bite",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Electrical injury",
    mechanism: "Electrical injury",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
  {
    complaint: "Crush injury",
    mechanism: "Crush injury",
    responsiveness: "Responsive: to Pain",
    airway: "May be compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
  },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomEvenInt(min, max) {
  const range = Math.floor((max - min) / 2) + 1;
  return min + 2 * Math.floor(Math.random() * range);
}

const getRandomChiefComplaint = (chiefComplaints) => {
  const randomIndex = Math.floor(Math.random() * chiefComplaints.length);
  return chiefComplaints[randomIndex];
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
    randomMonth = getRandomInt(start, end);
  }

  const daysInMonth = new Date(2022, randomMonth, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

  return `${randomMonth}-${randomDay}`;
}

function getRandomBloodPressure(bloodPressureValue) {
  const lowRange = {
    systolic: { low: 40, high: 88 },
    diastolic: { low: 10, high: 58 },
    name: "Low",
  };
  const normalRange = {
    systolic: { low: 90, high: 118 },
    diastolic: { low: 60, high: 78 },
    name: "Normal",
  };
  const elevatedRange = {
    systolic: { low: 120, high: 128 },
    diastolic: { low: 60, high: 78 },
    name: "Elevated",
  };
  const highRange = {
    systolic: { low: 130, high: 180 },
    diastolic: { low: 80, high: 120 },
    name: "High",
  };
  let selectedRange;
  switch (bloodPressureValue) {
    case "Low":
      selectedRange = lowRange;
      break;
    case "Normal":
      selectedRange = normalRange;
      break;
    case "Elevated":
      selectedRange = elevatedRange;
      break;
    case "High":
      selectedRange = highRange;
      break;
    default:
      throw new Error("Invalid blood pressure value");
  }
  const randomSystolic = getRandomEvenInt(
    Math.max(selectedRange.systolic.low, selectedRange.diastolic.low + 2),
    selectedRange.systolic.high + 1
  );
  const randomDiastolic = getRandomEvenInt(
    selectedRange.diastolic.low,
    Math.min(selectedRange.diastolic.high, randomSystolic - 1) + 1
  );
  return `${randomSystolic}/${randomDiastolic} mmHg (${selectedRange.name})`;
}

function getRandomPulse(pulseValue) {
  const zeroRange = { low: 0, high: 0, name: "None" };
  const lowRange = { low: 40, high: 60, name: "Low" };
  const normalRange = { low: 60, high: 100, name: "Normal" };
  const elevatedRange = { low: 100, high: 120, name: "Elevated" };
  const highRange = { low: 120, high: 160, name: "High" };
  let selectedRange;
  switch (pulseValue) {
    case "None":
      selectedRange = zeroRange;
      break;
    case "Low":
      selectedRange = lowRange;
      break;
    case "Normal":
      selectedRange = normalRange;
      break;
    case "Elevated":
      selectedRange = elevatedRange;
      break;
    case "High":
      selectedRange = highRange;
      break;
    default:
      throw new Error("Invalid pulse value");
  }
  const randomPulse = getRandomEvenInt(
    selectedRange.low,
    selectedRange.high + 1
  );
  return `${randomPulse} bpm (${selectedRange.name})`;
}

function getRandomGCS(chiefComplaint) {
  const gcsMapping = {
    "Chest pain": { eye: 4, verbal: 5, motor: 6 },
    "Shortness of breath": { eye: 3, verbal: 4, motor: 5 },
    "Abdominal pain": { eye: 2, verbal: 3, motor: 4 },
    Headache: { eye: 4, verbal: 4, motor: 6 },
    Dizziness: { eye: 3, verbal: 3, motor: 5 },
    Nausea: { eye: 2, verbal: 3, motor: 4 },
    Vomiting: { eye: 2, verbal: 2, motor: 4 },
    "Allergic reaction": { eye: 4, verbal: 5, motor: 6 },
    Seizure: { eye: 1, verbal: 2, motor: 3 },
    Fever: { eye: 4, verbal: 5, motor: 6 },
    "Cardiac arrest": { eye: 1, verbal: 1, motor: 1 },
    //
    "Motor vehicle accident": { eye: 3, verbal: 3, motor: 5 },
    "Fall from height": { eye: 2, verbal: 2, motor: 4 },
    "Bicycle accident": { eye: 2, verbal: 2, motor: 4 },
    Assault: { eye: 3, verbal: 3, motor: 5 },
    "Sports injury": { eye: 4, verbal: 4, motor: 6 },
    Burn: { eye: 2, verbal: 2, motor: 4 },
    "Penetrating trauma": { eye: 2, verbal: 2, motor: 4 },
    "Animal bite": { eye: 2, verbal: 2, motor: 4 },
    "Electrical injury": { eye: 2, verbal: 2, motor: 4 },
    "Crush injury": { eye: 2, verbal: 2, motor: 4 },
  };

  const expectedGCS = gcsMapping[chiefComplaint] || {
    eye: 3,
    verbal: 4,
    motor: 5,
  };

  const randomEyeResponse = getRandomInt(
    expectedGCS.eye - 1,
    expectedGCS.eye + 1
  );
  const randomVerbalResponse = getRandomInt(
    expectedGCS.verbal - 1,
    expectedGCS.verbal + 1
  );
  const randomMotorResponse = getRandomInt(
    expectedGCS.motor - 1,
    expectedGCS.motor + 1
  );

  const finalEyeResponse = Math.min(Math.max(randomEyeResponse, 1), 4);
  const finalVerbalResponse = Math.min(Math.max(randomVerbalResponse, 1), 5);
  const finalMotorResponse = Math.min(Math.max(randomMotorResponse, 1), 6);

  const totalGCS = finalEyeResponse + finalVerbalResponse + finalMotorResponse;

  return {
    eyeResponse: finalEyeResponse,
    verbalResponse: finalVerbalResponse,
    motorResponse: finalMotorResponse,
    totalGCS: totalGCS,
  };
}
/*
const safety = ["yes", "no"];

const hazard = ["none", "yes-combative", "yes-fire"];

const mechanism = {
  beach,
};

const buildTraumaAssessment = (location, patients, age, sex) => {};

const trauma = {
  single: {
    observed: {
      beach: [
        {
          id: 1,
          safe: "Yes",
          hazard: "None",
          treatmentConsent: "Verbal",
          mechanism: "Running",
          additionalEMS: "Yes",
          cSpine: "No",
          generalImpression: "Seated, holding leg, wincing",
          avpu: "Alert",
          loc: "4",
          alteredMentalStatus: "No",
          chiefComplaint: "Ankle pain",
          airway: "Open",
          airwayCompromise: "None",
          ventilationRate: "Normal",
          ventilationQuality: "Normal",
          supplementalOxygen: "No",
          supplementalOxygenRoute: "N/A",
          supplementalOxygenRate: "N/A",
          pulse: "Yes",
          skinColor: "Pink",
          skinTemperature: "Warm",
          skinCondition: "Moist",
          majorBleed: "None",
          majorBleedLocation: "None",
          shock: "No",
          gcs: "14",
          treatTransport: "Transport",
          vitalPulse: "96",
          vitalRespiration: "18",
          vitalBP: "130/P",
          painOnset: "Sudden",
          painBetter: "Nothing",
          painWorse: "Movement",
          painQuality: "Sharp",
          painRadiation: "Localized",
          painSeverity: "10",
          painTime: "10 minutes",
          historyObtainable: "Yes",
          historySigns: "Ankle deformity",
          historySymptoms: "Light-headedness",
          historyAllergies: "None",
          historyMedications: "None",
          historyPertinent: "None",
          historyLastIntake: "Water, Bagel",
          historyEvents: "Tripped while running",
          secondaryObtainable: "Yes",
          secondaryHeadScalpEars: "Normal",
          secondaryHeadEyes: "PERL @ 4mm",
          secondaryHeadMouthNoseFace: "Normal",
          secondaryNeckTrachea: "Normal",
          secondaryNeckJugularVeins: "Normal",
          secondaryNeckCSpine: "Normal",
          secondaryChestInspect: "Normal",
          secondaryChestAusculate: "Normal bilateral",
          secondaryAbdomenPalpate: "Normal",
          secondaryPelvis: "Normal",
          secondaryGenitaliaNeeded: "No",
          secondaryGenitalia: "Unknown",
          secondaryLowerExtremityLeft: "Ankle deformity",
          secondaryLowerExtremityLeftPMS: "Normal",
          secondaryLowerExtremityRight: "Normal",
          secondaryLowerExtremityRightPMS: "Normal",
          secondaryUpperExtremityLeft: "Elbow scrape",
          secondaryUpperExtremityLeftPMS: "Normal",
          secondaryUpperExtremityRight: "Normal",
          secondaryUpperExtremityRightPMS: "Normal",
          secondaryPosteriorThorax: "Normal",
          secondaryPosteriorLumbar: "Normal",
          secondaryPosteriorButtocks: "Normal",
          relatedProtocolName: "Trauma-Extremity",
          relatedProtocolID: "S-139",
          relatedProtocolBLSInterventions:
            "Splint neurologically stable fractures in position as presented. Traction splint PRN. Reduce grossly angulated long bone fractures with no pulse or sensation PRN BHO. Direct pressure to control external hemorrhage. Apply gauze or hemostatic dressing PRN. Tourniquet PRN. In MCI, direct pressure not required prior to tourniquet application.",
          secondaryRelatedProtocolName: "Pain Management",
          secondaryRelatedProtocolID: "S-141",
          secondaryRelatedProtocolBLSInterventions:
            "Assess level of pain. Ice, immobilize, and splint PRN. Elevation of extremity PRN.",
          reassessmentTime: "15 minutes",
          reassessmentObtainable: "No",
        },
      ],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
    repCall: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
  },
  multi: {
    observed: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
    repCall: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
  },
};
*/
