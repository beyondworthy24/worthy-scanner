export function runWorthyBrain(inputs) {
  const score = Number(inputs.score || 0);
  const liveTotal = Number(inputs.liveTotal || 0);
  const minutesPlayed = Number(inputs.minutesPlayed || 0);
  const last3Points = Number(inputs.last3Points || 0);
  const gameState = inputs.gameState || "N/A";
  const betMode = inputs.betMode || "Auto";

  if (!score || !liveTotal || !minutesPlayed) {
    return {
      error: "Missing required inputs.",
      confidence: "--",
      trapRisk: "--",
      decision: "--",
      trapCategory: "--",
      environment: "--",
      bounce: "--",
      engineGrade: "--",
      learnedEdge: "--",
      paceTruth: "--",
      stability: "--",
      numberQuality: "--",
      entryAdvice: "--",
      warning: "Enter valid numbers first."
    };
  }

  const projected = (score / minutesPlayed) * 48;
  const edge = projected - liveTotal;
  const cushion = Math.abs(edge);

  let confidence = 60;
  let trapRisk = 3;
  let decision = "WAIT";
  let trapCategory = "Neutral";
  let environment = "Normal";
  let bounce = "Standard";
  let engineGrade = "B";
  let learnedEdge = edge > 0 ? "Over Lean" : "Under Lean";
  let paceTruth = projected > liveTotal ? "Fast" : "Slow";
  let stability = minutesPlayed >= 18 ? "STABILIZED" : "UNSTABLE";
  let numberQuality = cushion >= 10 ? "STRONG" : cushion >= 5 ? "DECENT" : "WEAK";
  let entryAdvice = cushion >= 10 ? "PLAYABLE" : cushion >= 5 ? "WAIT" : "PASS";
  let warning = "No major warning.";

  if (minutesPlayed < 18) {
    confidence -= 10;
    trapRisk += 2;
    decision = "WAIT";
    warning = "Game not stabilized yet.";
  }

  if (last3Points >= 16) {
    trapRisk += 2;
    trapCategory = "Recent Burst";
    warning = "Recent scoring burst may be inflating the line.";
  }

  if (cushion >= 10 && minutesPlayed >= 18) {
    decision = "PLAYABLE";
    confidence = 82;
    engineGrade = "A";
  } else if (cushion < 5) {
    decision = "PASS";
    confidence = 52;
    engineGrade = "C";
  }

  return {
    score,
    liveTotal,
    minutesPlayed,
    last3Points,
    gameState,
    betMode,
    projected: projected.toFixed(1),
    edge: edge.toFixed(1),
    cushion: cushion.toFixed(1),
    confidence,
    trapRisk,
    decision,
    trapCategory,
    environment,
    bounce,
    engineGrade,
    learnedEdge,
    paceTruth,
    stability,
    numberQuality,
    entryAdvice,
    warning
  };
}