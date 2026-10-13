import {test} from 'node:test';
import assert from 'node:assert/strict';
import {countdown,daysSince,validTarget} from '../models/reunion.ts';
test('countdown handles explicit Japan timezone',()=>{const t=countdown('2026-11-02T12:00:00+09:00',Date.parse('2026-11-01T02:58:57Z'));assert.equal(t.days,1);assert.equal(t.hours,0);assert.equal(t.minutes,1);assert.equal(t.seconds,3)});
test('elapsed reunion clamps all values to zero',()=>{const t=countdown('2026-01-01T00:00:00Z',Date.parse('2026-02-01'));assert.equal(t.totalSeconds,0);assert.equal(t.arrived,true)});
test('milestones count calendar days in Vancouver across DST',()=>{assert.equal(daysSince('2026-03-07',Date.parse('2026-03-09T19:00:00Z')),2)});
test('invalid stored dates are rejected',()=>{assert.equal(validTarget('bad'),false)});

test('days together begins at zero and increments on Vancouver dates',()=>{assert.equal(daysSince('2026-02-25',Date.parse('2026-02-25T20:00:00Z')),0);assert.equal(daysSince('2026-02-25',Date.parse('2026-02-26T20:00:00Z')),1)});
