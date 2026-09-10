(function installScenarioProgress(root) {
  'use strict';

  const KEY = 'ctt-scenario-progress-v1';

  function read(storage) {
    try {
      const value = JSON.parse(storage?.getItem(KEY) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function record(storage, input) {
    const scenarioId = String(input?.scenarioId || '');
    if (!scenarioId) return null;
    const total = Math.max(1, Number(input.total) || 1);
    const step = Math.min(total, Math.max(1, Number(input.step) || 1));
    const next = {
      scenarioId,
      scenarioNumber: String(input.scenarioNumber || ''),
      subprocess: String(input.subprocess || ''),
      step,
      total,
      completed: Boolean(input.completed),
    };
    const records = read(storage);
    records[scenarioId] = next;
    try { storage?.setItem(KEY, JSON.stringify(records)); } catch { /* local state is optional */ }
    return next;
  }

  function get(storage, scenarioId) {
    return read(storage)[scenarioId] || null;
  }

  root.CTTScenarioProgress = {KEY, read, record, get};
})(globalThis);
