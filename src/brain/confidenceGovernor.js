// src/brain/confidenceGovernor.js

export function getConfidence({
  trapRisk,
  environment,
  cushion,
}) {
  let confidence = 100;

  confidence -= trapRisk;

  if (environment === "CHAOS") confidence -= 20;
  if (environment === "OVERHEATED") confidence -= 10;

  if (cushion < 5) confidence -= 20;
  else if (cushion < 8) confidence -= 10;

  confidence = Math.max(0, Math.min(100, confidence));

  let decision = "GO";

  if (confidence < 40) decision = "NO BET";
  else if (confidence < 65) decision = "WAIT";

  return {
    confidence,
    decision,
  };
}