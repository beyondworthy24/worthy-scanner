// src/brain/trapEngine.js

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function evaluateTrap({
  lean,
  liveTotal,
  projectedTotal,
  cushion,
  recentPace,
  pacePerMinute,
  minutesPlayed,
  environment,
}) {
  let trapRisk = 0;
  let trapCategory = "CLEAN";
  let trapReasons = [];
  let fakePace = false;
  let distortedRead = false;

  const paceGap = recentPace - pacePerMinute;
  const totalDiff = projectedTotal - liveTotal;

  if (recentPace > pacePerMinute * 1.35) {
    trapRisk += 25;
    fakePace = true;
    trapReasons.push("Scoring burst — possible fake pace");
  }

  if (minutesPlayed > 36 && environment === "CHAOS") {
    trapRisk += 30;
    trapReasons.push("Late game chaos");
  }

  if (cushion < 5) {
    trapRisk += 20;
    trapReasons.push("Cushion too thin");
  } else if (cushion < 8) {
    trapRisk += 10;
    trapReasons.push("Medium cushion");
  }

  if (lean === "UNDER" && totalDiff > 0) {
    trapRisk += 25;
    distortedRead = true;
    trapReasons.push("Under conflicts with projection");
  }

  if (lean === "OVER" && totalDiff < 0) {
    trapRisk += 25;
    distortedRead = true;
    trapReasons.push("Over conflicts with projection");
  }

  if (Math.abs(paceGap) > 1.5) {
    trapRisk += 10;
    trapReasons.push("Pace mismatch");
  }

  trapRisk = clamp(trapRisk, 0, 100);

  if (trapRisk >= 70) trapCategory = "HIGH RISK";
  else if (trapRisk >= 45) trapCategory = "CONFLICT";
  else if (trapRisk >= 25) trapCategory = "WATCH";

  return {
    trapRisk,
    trapCategory,
    fakePace,
    distortedRead,
    trapReasons,
  };
}