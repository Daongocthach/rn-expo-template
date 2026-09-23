#!/usr/bin/env node

/**
 * i18n Key Parity Check
 *
 * Recursively compares all keys in en.json vs target locale files (vi, zh-CN, zh-TW).
 * Reports missing keys and empty string values.
 *
 * Usage: yarn i18n:check
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.resolve(__dirname, '..', 'src', 'i18n', 'locales');
const EN_PATH = path.join(LOCALES_DIR, 'en.json');
const TARGET_LOCALES = ['vi', 'zh-CN', 'zh-TW'];

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function getValueAtPath(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function run() {
  console.log(`\n  ${c('cyan', 'i18n Key Parity Check')}\n`);

  let en;
  try {
    en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  } catch (err) {
    console.log(`  ${c('red', '✗')} Failed to parse en.json: ${err.message}`);
    process.exit(1);
  }

  const enKeys = getAllKeys(en);
  const enSet = new Set(enKeys);
  let hasErrors = false;

  const emptyInEn = enKeys.filter((k) => getValueAtPath(en, k) === '');
  if (emptyInEn.length > 0) {
    hasErrors = true;
    console.log(`  ${c('yellow', '⚠')} Empty values in en.json (${emptyInEn.length}):`);
    emptyInEn.forEach((k) => console.log(`    ${c('dim', '-')} ${k}`));
    console.log('');
  }

  for (const locale of TARGET_LOCALES) {
    const targetPath = path.join(LOCALES_DIR, `${locale}.json`);
    if (!fs.existsSync(targetPath)) {
      console.log(`  ${c('yellow', '⊘')} ${locale}.json not found — skipping\n`);
      continue;
    }

    let targetData;
    try {
      targetData = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    } catch (err) {
      console.log(`  ${c('red', '✗')} Failed to parse ${locale}.json: ${err.message}`);
      hasErrors = true;
      continue;
    }

    const targetKeys = getAllKeys(targetData);
    const targetSet = new Set(targetKeys);

    const missingInTarget = enKeys.filter((k) => !targetSet.has(k));
    if (missingInTarget.length > 0) {
      hasErrors = true;
      console.log(
        `  ${c('red', '✗')} Keys in en.json missing from ${locale}.json (${missingInTarget.length}):`
      );
      missingInTarget.forEach((k) => console.log(`    ${c('dim', '-')} ${k}`));
      console.log('');
    }

    const missingInEn = targetKeys.filter((k) => !enSet.has(k));
    if (missingInEn.length > 0) {
      hasErrors = true;
      console.log(
        `  ${c('red', '✗')} Keys in ${locale}.json missing from en.json (${missingInEn.length}):`
      );
      missingInEn.forEach((k) => console.log(`    ${c('dim', '-')} ${k}`));
      console.log('');
    }

    const emptyInTarget = targetKeys.filter((k) => getValueAtPath(targetData, k) === '');
    if (emptyInTarget.length > 0) {
      hasErrors = true;
      console.log(
        `  ${c('yellow', '⚠')} Empty values in ${locale}.json (${emptyInTarget.length}):`
      );
      emptyInTarget.forEach((k) => console.log(`    ${c('dim', '-')} ${k}`));
      console.log('');
    }
  }

  if (!hasErrors) {
    console.log(
      `  ${c('green', '✓')} All ${enKeys.length} keys match across en.json and target locales (${TARGET_LOCALES.join(', ')})\n`
    );
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
