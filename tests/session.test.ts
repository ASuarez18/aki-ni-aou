import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseSession, matchesSecret} from '../models/session.ts';
import {calendarCountdown} from '../models/reunion.ts';
test('old profile preferences cannot unlock the dashboard',()=>{assert.equal(parseSession('"Sa-chan"',100),null)});
test('valid session retains identity; expired and invalid sessions are rejected',()=>{assert.equal(parseSession('{"profile":"Ku-chan","expiresAt":200}',100)?.profile,'Ku-chan');assert.equal(parseSession('{"profile":"Ku-chan","expiresAt":99}',100),null);assert.equal(parseSession('{"profile":"Other","expiresAt":200}',100),null);assert.equal(parseSession('broken',100),null)});
test('incorrect secret is rejected',async()=>{assert.equal(await matchesSecret('definitely-incorrect-test-answer'),false)});
test('calendar countdown clamps month end and keeps total seconds',()=>{const now=Date.parse('2026-01-31T12:00:00+09:00');const t=calendarCountdown('2026-02-28T12:00:00+09:00',now);assert.equal(t.months,1);assert.equal(t.weeks,0);assert.equal(t.days,0);assert.equal(t.totalSeconds,28*86400)});
test('calendar countdown breaks days into weeks and days',()=>{const t=calendarCountdown('2026-11-02T12:00:00+09:00',Date.parse('2026-10-11T12:00:00+09:00'));assert.equal(t.months,0);assert.equal(t.weeks,3);assert.equal(t.days,1)});
