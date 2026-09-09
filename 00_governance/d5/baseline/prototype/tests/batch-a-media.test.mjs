import test from 'node:test';
import assert from 'node:assert/strict';

import {initialMediaState, reduceMedia} from '../batch-a-media.mjs';

const frozen = value => Object.freeze(value);

test('initial state maps the scene, restores a bounded position, and never restores autoplay', () => {
  assert.deepEqual(initialMediaState('SCN-ENTITY', {
    asset: 'DMO-A02',
    revision: 'r01',
    time: 14.25,
    beat: 99,
    holdPassed: true,
    playing: true,
    injected: 'not part of the media contract'
  }), {
    asset: 'DMO-A02',
    revision: 'r01',
    time: 14.25,
    beat: 4,
    holdPassed: true,
    playing: false
  });
});

test('unknown scene and malformed saved values normalize to the safe paused poster', () => {
  assert.deepEqual(initialMediaState('SCN-INJECTED', {
    asset: 'DMO-A02',
    revision: 'evil',
    time: '13',
    beat: -20,
    holdPassed: 'yes',
    playing: true
  }), {
    asset: 'DMO-A01',
    revision: 'r01',
    time: 0,
    beat: 0,
    holdPassed: false,
    playing: false
  });
});

test('unknown or malformed intents cannot alter or extend sanitized state', () => {
  const state = frozen({
    asset: 'DMO-A01', revision: 'r01', time: 3, beat: 1,
    holdPassed: false, playing: false
  });

  assert.deepEqual(reduceMedia(state, {type: 'publish', time: 99, playing: true}), state);
  assert.deepEqual(reduceMedia(state, null), state);
  assert.deepEqual(state, {
    asset: 'DMO-A01', revision: 'r01', time: 3, beat: 1,
    holdPassed: false, playing: false
  });
});

test('seek and tick clamp to scene boundaries, stop at the end, and do not mutate input', () => {
  const original = frozen({
    asset: 'DMO-A01', revision: 'r01', time: 15, beat: 4,
    holdPassed: false, playing: true
  });

  assert.deepEqual(reduceMedia(original, {type: 'seek', time: -4}), {
    asset: 'DMO-A01', revision: 'r01', time: 0, beat: 0,
    holdPassed: false, playing: false
  });
  assert.deepEqual(reduceMedia(original, {type: 'tick', seconds: 5}), {
    asset: 'DMO-A01', revision: 'r01', time: 16, beat: 4,
    holdPassed: false, playing: false
  });
  assert.equal(original.time, 15);
  assert.equal(original.playing, true);
});

test('DMO-A02 play and seek cannot bypass the evidence hold; Next unlocks at 13 seconds', () => {
  const beforeHold = {
    asset: 'DMO-A02', revision: 'r01', time: 9, beat: 2,
    holdPassed: false, playing: true
  };
  const held = reduceMedia(beforeHold, {type: 'tick', seconds: 2});

  assert.deepEqual(held, {
    asset: 'DMO-A02', revision: 'r01', time: 9.5, beat: 3,
    holdPassed: false, playing: false
  });
  assert.deepEqual(reduceMedia(held, {type: 'play'}), held);
  assert.deepEqual(reduceMedia(held, {type: 'seek', time: 18}), held);
  assert.deepEqual(reduceMedia(held, {type: 'next'}), {
    asset: 'DMO-A02', revision: 'r01', time: 13, beat: 4,
    holdPassed: true, playing: false
  });
});

test('Previous is bounded and Replay resets the story paused with the hold locked again', () => {
  const late = frozen({
    asset: 'DMO-A02', revision: 'r01', time: 17, beat: 5,
    holdPassed: true, playing: true
  });

  assert.deepEqual(reduceMedia(late, {type: 'previous'}), {
    asset: 'DMO-A02', revision: 'r01', time: 13, beat: 4,
    holdPassed: true, playing: false
  });
  assert.deepEqual(reduceMedia(late, {type: 'replay'}), {
    asset: 'DMO-A02', revision: 'r01', time: 0, beat: 0,
    holdPassed: false, playing: false
  });
});

test('Play or Next at the ending stays stopped at the ending and never loops or rewinds', () => {
  const ended = frozen({
    asset: 'DMO-A01', revision: 'r01', time: 16, beat: 4,
    holdPassed: false, playing: false
  });

  assert.deepEqual(reduceMedia(ended, {type: 'play'}), ended);
  assert.deepEqual(reduceMedia(ended, {type: 'next'}), ended);
});
