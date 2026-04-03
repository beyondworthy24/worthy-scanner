const MEMORY_KEY = "worthy_memory";

export function getSavedMemory() {
  const raw = localStorage.getItem(MEMORY_KEY);
  if (!raw) {
    return {
      scans: [],
      actions: []
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      scans: [],
      actions: []
    };
  }
}

export function saveScanMemory(scanData) {
  const memory = getSavedMemory();

  memory.scans.push({
    ...scanData,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function saveUserAction(action) {
  const memory = getSavedMemory();

  memory.actions.push({
    action,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function getMemoryInsights() {
  const memory = getSavedMemory();

  const totalScans = memory.scans.length;
  const avgTrapRisk =
    totalScans > 0
      ? (
          memory.scans.reduce((sum, s) => sum + (Number(s.trapRisk) || 0), 0) /
          totalScans
        ).toFixed(1)
      : 0;

  const tookIt = memory.actions.filter((a) => a.action === "TOOK").length;
  const waited = memory.actions.filter((a) => a.action === "WAITED").length;
  const skipped = memory.actions.filter((a) => a.action === "SKIPPED").length;
  const forced = memory.actions.filter((a) => a.action === "FORCED").length;

  return {
    totalScans,
    avgTrapRisk,
    tookIt,
    waited,
    skipped,
    forced
  };
}