// Full stable App.jsx founder version with:
// - Engine Grade
// - Learned Edge
// - Burst Status
// - Market Truth
// - Cushion Truth
// - Recent Scans / Memory / Clear Memory

import { useState } from "react";
import "./App.css";

export default function App() {
  const [score, setScore] = useState("");
  const [liveTotal, setLiveTotal] = useState("");
  const [minutesPlayed, setMinutesPlayed] = useState("");
  const [last3, setLast3] = useState("");
  const [gameState, setGameState] = useState("2Q");
  const [betMode, setBetMode] = useState("Over Focus");
  const [result, setResult] = useState(null);
  const [memoryStats, setMemoryStats] = useState(getMemoryStats());
  const [recentScans, setRecentScans] = useState(getRecentScans());
  const [activeScanId, setActiveScanId] = useState(null);
  const refreshMemory = () => {
    setMemoryStats(getMemoryStats());
    setRecentScans(getRecentScans());
  };

  const runScan = () => {
    const brainResult = runWorthyBrain({
      score,
      liveTotal,
      minutesPlayed,
      last3Points: last3,
      gameState,
      betMode,
    });

    if (brainResult.error) {
      alert(brainResult.error);
      return;
    }

    const savedScan = saveScanMemory({
  edge: brainResult.edgeRaw,
  cushion: brainResult.cushionRaw,
  trapRisk: brainResult.trapRiskRaw,
  confidence: brainResult.confidenceRaw,
  lean: brainResult.lean,
  projectedTotal: brainResult.projectedTotalRaw,
  decision: brainResult.decision,
  bestEntry: brainResult.bestEntryZone,
  bounce: brainResult.bounceLevel,
  stabilization: brainResult.stabilizationColor,
  fakePace: brainResult.fakePaceLabel,
  paceTruth: brainResult.paceTruth,
  burstStatus: brainResult.burstStatus,
  marketTruth: brainResult.marketTruth,
  cushionTruth: brainResult.cushionTruth,
  gameState,
  betMode,
  timestamp: new Date().toISOString(),
});

setActiveScanId(savedScan.scanId);
refreshMemory();
setResult(brainResult);
  };

const handleMemoryAction = (action) => {
  if (!activeScanId) {
    alert("Run a scan first.");
    return;
  }

  saveScanUpdate(activeScanId, {
    action,
    actionTimestamp: new Date().toISOString(),
  });

  refreshMemory();
  alert(`${action} saved to this scan.`);
};

  const handleClearMemory = () => {
    const confirmed = window.confirm("Clear all Worthy Memory scans and outcomes?");
    if (!confirmed) return;

    clearAllMemory();
    refreshMemory();
    setResult(null);
    alert("Worthy Memory cleared.");
  };

  const resetForm = () => {
    setScore("");
    setLiveTotal("");
    setMinutesPlayed("");
    setLast3("");
    setGameState("2Q");
    setBetMode("Over Focus");
    setResult(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #18204d 0%, #070b1d 40%, #03050f 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              color: "#9aa4d6",
              fontSize: "14px",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            BEYOND WORTHY SYSTEM
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "64px",
                  lineHeight: 1,
                  margin: 0,
                  fontWeight: 800,
                }}
              >
                Worthy Scanner
              </h1>
              <p
                style={{
                  marginTop: "14px",
                  color: "#b8c0ea",
                  fontSize: "18px",
                }}
              >
                Read the pace. Grade the number. Avoid traps.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #4e57c8",
                padding: "14px 22px",
                borderRadius: "999px",
                color: "#dbe0ff",
                fontWeight: 700,
                background: "rgba(78,87,200,0.08)",
              }}
            >
              LOCAL RUNNING
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.45fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "rgba(5,10,30,0.85)",
              border: "1px solid rgba(90, 105, 200, 0.18)",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: "24px", fontSize: "22px" }}>
              Game Input
            </h2>

            <InputBlock label="Current Combined Score" value={score} onChange={setScore} placeholder="94" />
            <InputBlock label="Live Total" value={liveTotal} onChange={setLiveTotal} placeholder="181" />
            <InputBlock label="Minutes Played" value={minutesPlayed} onChange={setMinutesPlayed} placeholder="24" />
            <InputBlock label="Last 3 Minutes Points (Optional)" value={last3} onChange={setLast3} placeholder="16" />

            <SelectBlock label="Game State" value={gameState} onChange={setGameState} options={["1Q", "2Q", "HALF", "3Q", "4Q"]} />
            <SelectBlock label="Bet Mode" value={betMode} onChange={setBetMode} options={["Over Focus", "Under Focus", "Auto"]} />

            <button
              onClick={runScan}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "18px",
                borderRadius: "16px",
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "24px",
                color: "white",
                background: "linear-gradient(90deg, #6a5cff 0%, #9f65ff 100%)",
                boxShadow: "0 12px 24px rgba(106,92,255,0.35)",
              }}
            >
              RUN WORTHY SCAN
            </button>

            <button
              onClick={resetForm}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "16px",
                color: "#dbe0ff",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              RESET
            </button>
          </div>

          <div style={{ display: "grid", gap: "22px" }}>
            <div style={panelStyle}>
              <h2 style={panelTitle}>Scanner Output</h2>

              <div style={grid2}>
                <StatCard title="Projected Total" value={result ? result.projectedTotal : "--"} />
                <StatCard title="Edge" value={result ? result.edge : "--"} />
                <StatCard title="Cushion" value={result ? result.cushion : "--"} />
                <StatCard title="Lean" value={result ? result.lean : "--"} />
              </div>

              <div style={infoBoxStyle}>
                <InfoRow label="Pace Truth" value={result ? result.paceTruth : "--"} />
                <InfoRow label="Stability" value={result ? <span style={{ color: result.stabilizationColor === "GREEN" ? "#5dff8b" : "#ff6b6b" }}>{result.stabilizationColor}</span> : "--"} />
                <InfoRow label="Number Quality" value={result ? result.numberQuality : "--"} />
                <InfoRow label="Entry Advice" value={result ? result.entryAdvice : "--"} noBorder />
              </div>

              <div style={warningBoxStyle}>
                <div style={{ fontWeight: 800, color: "#ffd36a", marginBottom: "10px", letterSpacing: "0.5px" }}>WARNING / READ</div>
                <div style={{ color: "#f5f0dd" }}>{result ? result.warning : "No scan yet."}</div>
              </div>
            </div>

            <div style={panelStyle}>
              <h2 style={panelTitle}>Decision Intelligence</h2>

              <div style={{ ...grid3, marginBottom: "18px" }}>
                <MiniCard title="Confidence" value={result ? result.confidence : "--"} />
                <MiniCard title="Trap Risk" value={result ? result.trapRisk : "--"} />
                <MiniCard title="Decision" value={result ? result.decision : "--"} />
              </div>

              <div style={{ ...grid3, marginBottom: "18px" }}>
                <MiniCard title="Trap Category" value={result ? result.trapCategory : "--"} />
                <MiniCard title="Environment" value={result ? result.environment : "--"} />
                <MiniCard title="Bounce" value={result ? result.bounceLevel : "--"} />
              </div>

              <div style={grid2}>
                <MiniCard title="Engine Grade" value={result ? result.engineGrade : "--"} />
                <MiniCard title="Learned Edge" value={result ? result.learnedEdgeLabel : "--"} />
              </div>
            </div>

            <div style={panelStyle}>
              <h2 style={panelTitle}>Entry Zone</h2>
              <div style={{ ...grid2, marginBottom: "14px" }}>
                <MiniCard title="Best Entry" value={result ? result.bestEntryZone : "--"} />
                <MiniCard title="Fake Pace Risk" value={result ? result.fakePaceLabel : "--"} />
              </div>
              <div style={grid3}>
                <MiniCard title="Burst Status" value={result ? result.burstStatus : "--"} />
                <MiniCard title="Market Truth" value={result ? result.marketTruth : "--"} />
                <MiniCard title="Cushion Truth" value={result ? result.cushionTruth : "--"} />
              </div>
            </div>

            <div style={panelStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
                <h2 style={{ textAlign: "center", margin: 0, fontSize: "22px", flex: 1 }}>Worthy Memory</h2>
                <button onClick={handleClearMemory} style={{ padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,120,120,0.35)", background: "rgba(255,80,80,0.08)", color: "#ff9f9f", cursor: "pointer", fontWeight: 800, fontSize: "12px" }}>CLEAR MEMORY</button>
              </div>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
  <MiniCard title="Saved Scans" value={memoryStats.total} />
  <MiniCard title="Avg Trap Risk" value={memoryStats.avgTrapRisk} />
  <MiniCard title="Win Rate" value={memoryStats.winRate} />
  <MiniCard title="Wins" value={memoryStats.wins} />
  <MiniCard title="Losses" value={memoryStats.losses} />
  <MiniCard title="Pushes" value={memoryStats.pushes} />
  <MiniCard title="Took It" value={memoryStats.tookIt} />
  <MiniCard title="Waited" value={memoryStats.waited} />
  <MiniCard title="Skipped" value={memoryStats.skipped} />
  <MiniCard title="Forced It" value={memoryStats.forcedIt} />
</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                <ActionButton text="TOOK IT" onClick={() => handleMemoryAction("TOOK IT")} />
                <ActionButton text="WAITED" onClick={() => handleMemoryAction("WAITED")} />
                <ActionButton text="SKIPPED" onClick={() => handleMemoryAction("SKIPPED")} />
                <ActionButton text="FORCED IT" onClick={() => handleMemoryAction("FORCED IT")} />
              </div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "12px" }}>
  <ActionButton text="WON" onClick={() => handleOutcome("WON")} />
  <ActionButton text="LOST" onClick={() => handleOutcome("LOST")} />
  <ActionButton text="PUSH" onClick={() => handleOutcome("PUSH")} />
</div>
            </div>

            <div style={panelStyle}>
              <h2 style={panelTitle}>Recent Scans</h2>
              {recentScans.length === 0 ? (
                <div style={{ textAlign: "center", color: "#b8c0ea", padding: "20px 0" }}>No scans saved yet.</div>
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {recentScans.map((scan, index) => (
                    <div key={scan.timestamp || index} style={{ background: "rgba(9,15,36,0.9)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "18px", padding: "14px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "8px" }}>
                        <RecentStat label="Lean" value={scan.lean || "--"} />
                        <RecentStat label="Edge" value={formatRecentNumber(scan.edge)} />
                        <RecentStat label="Cushion" value={formatRecentNumber(scan.cushion)} />
                        <RecentStat label="Trap" value={formatPercent(scan.trapRisk)} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "8px" }}>
                        <RecentStat label="Bounce" value={scan.bounce || "--"} />
                        <RecentStat label="Entry" value={scan.bestEntry || "--"} />
                        <RecentStat label="Pace" value={scan.paceTruth || "--"} />
                        <RecentStat label="State" value={scan.gameState || "--"} />
                      </div>
                      <div style={{ color: "#9ba7dc", fontSize: "12px", textAlign: "right", marginTop: "6px" }}>{formatTimestamp(scan.timestamp)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function runWorthyBrain({ score, liveTotal, minutesPlayed, last3Points, gameState, betMode }) {
  const s = parseFloat(score);
  const l = parseFloat(liveTotal);
  const m = parseFloat(minutesPlayed);
  const last3 = last3Points === "" ? null : parseFloat(last3Points);

  if (isNaN(s) || isNaN(l) || isNaN(m) || m <= 0 || m >= 48) {
    return { error: "Enter valid numbers." };
  }

  const pacePerMinute = s / m;
  const projected = pacePerMinute * 48;
  const edgeRaw = projected - l;
  const cushionRaw = Math.abs(edgeRaw);
  const last3Rate = last3 !== null ? last3 / 3 : null;

  const marketTruthBase = getMarketTruth({ pacePerMinute, last3Rate, minutesPlayed: m, gameState });
  const numberQuality = getNumberQuality(cushionRaw);
  const stabilization = getStabilization({ minutesPlayed: m, last3Rate, gameState });

  let lean = edgeRaw >= 0 ? "OVER" : "UNDER";
  if (betMode === "Over Focus") lean = "OVER";
  if (betMode === "Under Focus") lean = "UNDER";

  const trapProfile = getTrapProfile({
    lean,
    cushionRaw,
    pacePerMinute,
    last3Rate,
    stabilized: stabilization.stabilized,
    gameState,
    betMode,
  });

  const bounceLevel = getBounceLevel(cushionRaw);
  const entryProfile = getEntryProfile({
    stabilized: stabilization.stabilized,
    numberQuality,
    trapRiskRaw: trapProfile.trapRiskRaw,
    fakePace: trapProfile.fakePace,
    cushionRaw,
    lean,
    gameState,
  });

  const learnedEdge = getLearnedEdge({
    lean,
    numberQuality,
    stabilized: stabilization.stabilized,
    gameState,
    trapCategory: trapProfile.trapCategory,
  });

  let burstStatus = "STABLE FLOW";
  if (last3Rate !== null) {
    if (last3Rate >= pacePerMinute + 2) burstStatus = "EXTREME BURST";
    else if (last3Rate >= pacePerMinute + 1.2) burstStatus = "HOT RUN";
    else if (last3Rate <= pacePerMinute - 1.2) burstStatus = "COLD STRETCH";
  }

  let marketTruth = "FAIR PRICE";
  if (last3Rate !== null && last3Rate >= 6 && !stabilization.stabilized) marketTruth = "PUBLIC OVER INFLATION";
  if (pacePerMinute < 3.2 && l > projected) marketTruth = "INFLATED TOTAL";

  let cushionTruth = "REAL CUSHION";
  if (burstStatus !== "STABLE FLOW" && cushionRaw >= 6) cushionTruth = "FAKE CUSHION";
  if (!stabilization.stabilized && cushionRaw >= 8) cushionTruth = "UNSTABLE CUSHION";

  let confidenceRaw =
    50 +
    marketTruthBase.confidenceBoost +
    numberQuality.confidenceBoost +
    stabilization.confidenceBoost +
    learnedEdge.confidenceBoost -
    trapProfile.confidencePenalty;

  if (marketTruth === "PUBLIC OVER INFLATION") confidenceRaw -= 8;
  if (marketTruth === "INFLATED TOTAL") confidenceRaw -= 6;
  if (cushionTruth === "FAKE CUSHION") confidenceRaw -= 8;
  if (cushionTruth === "UNSTABLE CUSHION") confidenceRaw -= 10;

  if (confidenceRaw > 99) confidenceRaw = 99;
  if (confidenceRaw < 1) confidenceRaw = 1;

  let decision = "NO BET";
  let warning = "Game not ready.";

  if (!stabilization.stabilized) {
    decision = "NO BET";
    warning = "RED LIGHT. Game is not stabilized yet. Do not bet this now.";
  } else if (trapProfile.fakePace) {
    decision = "CAUTION";
    warning = "Possible fake pace burst. Let the market settle first.";
  } else if (numberQuality.label === "THIN") {
    decision = "PASS";
    warning = "Thin cushion. Too close to the wire.";
  } else {
    decision = lean === "OVER" ? "OVER LOOK" : "UNDER LOOK";
    warning =
      lean === "UNDER" && cushionRaw < 8
        ? "Under read is live, but cushion is not huge. Be careful."
        : "Readable number. Monitor pace changes before forcing more exposure.";
  }

  const engineScoreRaw =
    marketTruthBase.score +
    numberQuality.score +
    stabilization.score +
    learnedEdge.score -
    trapProfile.scorePenalty;

  let engineGrade = "MID";
  if (engineScoreRaw >= 75) engineGrade = "A";
  else if (engineScoreRaw >= 60) engineGrade = "B";
  else if (engineScoreRaw >= 45) engineGrade = "C";
  else engineGrade = "D";

  return {
    projectedTotal: projected.toFixed(1),
    projectedTotalRaw: projected,
    edge: edgeRaw.toFixed(1),
    edgeRaw,
    cushion: cushionRaw.toFixed(1),
    cushionRaw,
    lean,
    paceTruth: marketTruthBase.label,
    stabilized: stabilization.stabilized,
    stabilizationColor: stabilization.color,
    numberQuality: numberQuality.label,
    entryAdvice: entryProfile.entryAdvice,
    bestEntryZone: entryProfile.bestEntryZone,
    warning,
    confidence: `${confidenceRaw}%`,
    confidenceRaw,
    trapRisk: `${trapProfile.trapRiskRaw}%`,
    trapRiskRaw: trapProfile.trapRiskRaw,
    decision,
    trapCategory: trapProfile.trapCategory,
    environment: marketTruthBase.environment,
    bounceLevel,
    fakePaceLabel: trapProfile.fakePace ? "HIGH" : "LOW",
    engineScore: engineScoreRaw,
    engineGrade,
    learnedEdgeLabel: learnedEdge.label,
    burstStatus,
    marketTruth,
    cushionTruth,
  };
}

function getMarketTruth({ pacePerMinute, last3Rate, minutesPlayed, gameState }) {
  let label = "BALANCED";
  let environment = "NEUTRAL";
  let score = 20;
  let confidenceBoost = 0;

  if (pacePerMinute >= 4.3) {
    label = "FLYING";
    environment = "HIGH TEMPO";
    score = 28;
    confidenceBoost = 8;
  } else if (pacePerMinute >= 3.9) {
    label = "FAST";
    environment = "HIGH TEMPO";
    score = 24;
    confidenceBoost = 5;
  } else if (pacePerMinute <= 2.8) {
    label = "DEAD SLOW";
    environment = "SLOW GRIND";
    score = 28;
    confidenceBoost = 8;
  } else if (pacePerMinute <= 3.15) {
    label = "SLOW";
    environment = "SLOW GRIND";
    score = 24;
    confidenceBoost = 5;
  }

  if (minutesPlayed < 12) confidenceBoost -= 5;
  if (gameState === "4Q") confidenceBoost -= 3;
  if (last3Rate !== null && last3Rate >= 6.5) confidenceBoost -= 4;

  return { label, environment, score, confidenceBoost };
}

function getNumberQuality(cushionRaw) {
  if (cushionRaw >= 15) return { label: "ELITE", score: 26, confidenceBoost: 18 };
  if (cushionRaw >= 10) return { label: "STRONG", score: 20, confidenceBoost: 12 };
  if (cushionRaw >= 6) return { label: "PLAYABLE", score: 14, confidenceBoost: 5 };
  return { label: "THIN", score: 5, confidenceBoost: -12 };
}

function getStabilization({ minutesPlayed, last3Rate, gameState }) {
  let stabilized = minutesPlayed >= 18;
  let color = stabilized ? "GREEN" : "RED";
  let score = stabilized ? 18 : 4;
  let confidenceBoost = stabilized ? 10 : -14;

  if (last3Rate !== null && last3Rate >= 6.2) {
    stabilized = false;
    color = "RED";
    score = 4;
    confidenceBoost = -12;
  }

  if (gameState === "1Q") {
    stabilized = false;
    color = "RED";
    score = 2;
    confidenceBoost = -16;
  }

  return { stabilized, color, score, confidenceBoost };
}

function getTrapProfile({ lean, cushionRaw, pacePerMinute, last3Rate, stabilized, gameState, betMode }) {
  let trapRiskRaw = 16;
  let trapCategory = "NONE";
  let fakePace = false;
  let scorePenalty = 0;
  let confidencePenalty = 0;

  if (!stabilized) {
    trapRiskRaw += 28;
    trapCategory = "UNSTABLE";
    scorePenalty += 16;
    confidencePenalty += 16;
  }

  if (cushionRaw < 6) {
    trapRiskRaw += 24;
    trapCategory = "THIN CUSHION";
    scorePenalty += 14;
    confidencePenalty += 12;
  }

  if (last3Rate !== null) {
    if (pacePerMinute < 4.0 && last3Rate >= 6) fakePace = true;
    if (pacePerMinute > 3.1 && last3Rate <= 2) fakePace = true;
  }

  if (fakePace) {
    trapRiskRaw += 22;
    trapCategory = "FAKE PACE";
    scorePenalty += 14;
    confidencePenalty += 15;
  }

  if (gameState === "4Q") {
    trapRiskRaw += 10;
    scorePenalty += 5;
    confidencePenalty += 4;
  }

  if (lean === "UNDER" && cushionRaw < 8) {
    trapRiskRaw += 10;
    trapCategory = "UNDER DANGER";
    scorePenalty += 8;
    confidencePenalty += 8;
  }

  if (betMode === "Under Focus" && cushionRaw < 8) {
    trapRiskRaw += 6;
    confidencePenalty += 4;
  }

  if (trapRiskRaw > 100) trapRiskRaw = 100;

  return { trapRiskRaw, trapCategory, fakePace, scorePenalty, confidencePenalty };
}

function getBounceLevel(cushionRaw) {
  if (cushionRaw >= 18) return "ELITE BOUNCE";
  if (cushionRaw >= 13) return "MAX BOUNCE";
  if (cushionRaw >= 9) return "STRONG BOUNCE";
  if (cushionRaw >= 6) return "BOTTOM BOUNCE";
  return "NO BOUNCE";
}

function getEntryProfile({ stabilized, numberQuality, trapRiskRaw, fakePace, cushionRaw, lean, gameState }) {
  if (!stabilized) return { entryAdvice: "WAIT FOR STABILIZATION", bestEntryZone: "NO ENTRY - NOT STABLE" };
  if (fakePace) return { entryAdvice: "WAIT / RECHECK", bestEntryZone: "WAIT - POSSIBLE FAKE BURST" };
  if (numberQuality.label === "THIN") return { entryAdvice: "WAIT FOR BETTER NUMBER", bestEntryZone: "WAIT FOR A BETTER NUMBER" };
  if (lean === "UNDER" && cushionRaw < 8) return { entryAdvice: "LIGHT ENTRY ONLY", bestEntryZone: "UNDER IS READABLE BUT MARGIN IS THIN" };
  if (gameState === "4Q" && trapRiskRaw >= 60) return { entryAdvice: "BE CAREFUL LATE", bestEntryZone: "VOLATILE LATE WINDOW" };
  if (cushionRaw >= 10) return { entryAdvice: "PLAYABLE NOW", bestEntryZone: "GOOD ENTRY NOW" };
  return { entryAdvice: "BE PATIENT", bestEntryZone: "PLAYABLE BUT BE PATIENT" };
}

function getLearnedEdge({ lean, numberQuality, stabilized, gameState, trapCategory }) {
  let confidenceBoost = 0;
  let score = 0;
  let label = "NEUTRAL MEMORY";

  if (stabilized && numberQuality.label === "ELITE") {
    confidenceBoost += 6;
    score += 8;
    label = "STRONG STABLE SPOT";
  }

  if (lean === "UNDER" && numberQuality.label === "THIN") {
    confidenceBoost -= 6;
    score -= 6;
    label = "THIN UNDER WARNING";
  }

  if (gameState === "1Q") {
    confidenceBoost -= 5;
    score -= 5;
    label = "EARLY GAME CAUTION";
  }

  if (trapCategory === "FAKE PACE") {
    confidenceBoost -= 7;
    score -= 7;
    label = "FAKE BURST HISTORY";
  }

  return { confidenceBoost, score, label };
}

function saveScanMemory(scan) {
  const existing = JSON.parse(localStorage.getItem("worthyMemory") || "[]");

  const scanWithId = {
    scanId: `scan_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    action: null,
    outcome: null,
    ...scan,
  };

  existing.push(scanWithId);
  localStorage.setItem("worthyMemory", JSON.stringify(existing));

  return scanWithId;
}
function saveScanUpdate(scanId, updates) {
  const existing = JSON.parse(localStorage.getItem("worthyMemory") || "[]");

  const updated = existing.map((item) =>
    item.scanId === scanId
      ? {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : item
  );

  localStorage.setItem("worthyMemory", JSON.stringify(updated));
}

function getMemoryStats() {
  const memory = JSON.parse(localStorage.getItem("worthyMemory") || "[]");

  const tookIt = memory.filter((item) => item.action === "TOOK IT").length;
  const waited = memory.filter((item) => item.action === "WAITED").length;
  const skipped = memory.filter((item) => item.action === "SKIPPED").length;
  const forcedIt = memory.filter((item) => item.action === "FORCED IT").length;

  const wins = memory.filter((item) => item.outcome === "WON").length;
  const losses = memory.filter((item) => item.outcome === "LOST").length;
  const pushes = memory.filter((item) => item.outcome === "PUSH").length;

  const graded = wins + losses;
  const winRate = graded > 0 ? `${((wins / graded) * 100).toFixed(1)}%` : "0%";

  if (!memory.length) {
    return {
      total: 0,
      avgTrapRisk: "0%",
      tookIt,
      waited,
      skipped,
      forcedIt,
      wins,
      losses,
      pushes,
      winRate,
    };
  }

  const avgTrapRisk =
    memory.reduce((sum, item) => sum + (item.trapRisk || 0), 0) / memory.length;

  return {
    total: memory.length,
    avgTrapRisk: `${avgTrapRisk.toFixed(1)}%`,
    tookIt,
    waited,
    skipped,
    forcedIt,
    wins,
    losses,
    pushes,
    winRate,
  };
}

function getRecentScans() {
  const memory = JSON.parse(localStorage.getItem("worthyMemory") || "[]");
  return memory.slice(-5).reverse();
}

function getMemoryStats() {
  const memory = JSON.parse(localStorage.getItem("worthyMemory") || "[]");
  const outcomes = JSON.parse(localStorage.getItem("worthyOutcomes") || "[]");

  const tookIt = outcomes.filter((item) => item.action === "TOOK IT").length;
  const waited = outcomes.filter((item) => item.action === "WAITED").length;
  const skipped = outcomes.filter((item) => item.action === "SKIPPED").length;
  const forcedIt = outcomes.filter((item) => item.action === "FORCED IT").length;

  if (!memory.length) {
    return { total: 0, avgTrapRisk: "0%", tookIt, waited, skipped, forcedIt };
  }

  const avgTrapRisk = memory.reduce((sum, item) => sum + (item.trapRisk || 0), 0) / memory.length;

  return {
    total: memory.length,
    avgTrapRisk: `${avgTrapRisk.toFixed(1)}%`,
    tookIt,
    waited,
    skipped,
    forcedIt,
  };
}

function formatRecentNumber(value) {
  if (value === undefined || value === null || value === "") return "--";
  return typeof value === "number" ? value.toFixed(1) : value;
}

function formatPercent(value) {
  if (value === undefined || value === null || value === "") return "--";
  return typeof value === "number" ? `${value.toFixed(1)}%` : value;
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "--";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleString();
}

function InputBlock({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "8px", color: "#b6c0f3", fontWeight: 700, fontSize: "14px" }}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", background: "#050913", color: "white", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 16px", fontSize: "22px", outline: "none" }}
      />
    </div>
  );
}

function SelectBlock({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "8px", color: "#b6c0f3", fontWeight: 700, fontSize: "14px" }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", background: "#050913", color: "white", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 16px", fontSize: "18px", outline: "none" }}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{ background: "rgba(9,15,36,0.9)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "18px", textAlign: "center" }}>
      <div style={{ color: "#9ba7dc", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function MiniCard({ title, value }) {
  return (
    <div style={{ background: "rgba(9,15,36,0.9)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "18px", padding: "16px", textAlign: "center" }}>
      <div style={{ color: "#9ba7dc", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>{title}</div>
      <div style={{ fontSize: "22px", fontWeight: 800, wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function RecentStat({ label, value }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
      <div style={{ color: "#9ba7dc", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontSize: "13px", fontWeight: 800, wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function InfoRow({ label, value, noBorder = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: noBorder ? "none" : "1px solid rgba(255,255,255,0.08)", gap: "16px" }}>
      <div style={{ color: "#b8c0ea", fontSize: "16px", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: 800, textAlign: "right" }}>{value}</div>
    </div>
  );
}

function ActionButton({ text, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "12px 10px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "white", cursor: "pointer", fontWeight: 800, fontSize: "12px" }}>
      {text}
    </button>
  );
}

const panelStyle = {
  background: "rgba(5,10,30,0.85)",
  border: "1px solid rgba(90, 105, 200, 0.18)",
  borderRadius: "28px",
  padding: "24px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
};

const panelTitle = {
  textAlign: "center",
  marginTop: 0,
  marginBottom: "18px",
  fontSize: "22px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "14px",
};

const infoBoxStyle = {
  background: "rgba(9,15,36,0.9)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "22px",
  padding: "18px 20px",
};

const warningBoxStyle = {
  marginTop: "18px",
  background: "rgba(60,40,20,0.45)",
  border: "1px solid rgba(255,180,60,0.28)",
  borderRadius: "18px",
  padding: "18px",
  textAlign: "center",
};
