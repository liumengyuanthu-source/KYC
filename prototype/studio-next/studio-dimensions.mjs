export const studioDimensions = [
  {id: 'cj', label: 'Customer journey'},
  {id: 'hero', label: 'Hero case'},
  {id: 'scoreboard', label: 'Scoreboard'},
];

const frames = {
  cj: {
    title: 'Interactive target journey',
    src: './studio-next/target-journey.html',
    kind: 'journey',
  },
  hero: {
    title: 'Interactive hero case',
    src: './studio-next/hero-journey.html',
    kind: 'journey',
  },
  scoreboard: {
    title: 'Scenario scoreboard',
    src: './workshop/index.html',
    kind: 'scoreboard',
  },
};

export function normalizeStudioDimension(value) {
  return frames[value] ? value : 'cj';
}

export function studioDimensionFrame(value) {
  return frames[normalizeStudioDimension(value)];
}
