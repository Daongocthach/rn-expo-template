#!/usr/bin/env node

/**
 * i18n Unused Key Check
 *
 * Scans source files for translation keys used through t('...'), t("..."),
 * t(`...`), i18n.t('...'), and literal values assigned to common translation-key
 * properties such as labelKey/questionKey/titleKey. Reports locale keys that do
 * not appear in code.
 *
 * Usage:
 *   yarn i18n:unused
 *   node scripts/i18n-unused-check.js --locale vi
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'src', 'i18n', 'locales');
const DEFAULT_LOCALE = 'vi';
const SOURCE_DIRS = ['src', 'app'];
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const KEY_LIKE_LITERAL_PATTERN = /^[a-z][a-zA-Z0-9_-]*(?:\.[a-zA-Z0-9_-]+)+$/;

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

function parseArgs(argv) {
  const result = {
    locale: DEFAULT_LOCALE,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--locale' || arg === '-l') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error('Missing value for --locale');
      }
      result.locale = value;
      i += 1;
    }
  }

  return result;
}

function walkFiles(dirPath, collected = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, collected);
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function getAllKeys(obj, prefix = '') {
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

function collectTranslationUsage(files) {
  const exactKeys = new Set();
  const dynamicPrefixes = new Set();

  const exactPattern = /\b(?:t|i18n\.t)\(\s*(?:'([^']+)'|"([^"]+)"|`([^`$]+)`)(?:\s+as\s+never)?/g;
  const dynamicPattern = /\b(?:t|i18n\.t)\(\s*`([^`$]*)\$\{[^`]*\}[^`]*`/g;
  const keyPropertyPattern =
    /\b(?:[A-Za-z_][A-Za-z0-9_]*)Key\s*:\s*(?:'([^']+)'|"([^"]+)"|`([^`$]+)`)/g;
  const stringLiteralPattern = /(?:'([^']+)'|"([^"]+)"|`([^`$]+)`)/g;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    for (const match of content.matchAll(exactPattern)) {
      const key = match[1] ?? match[2] ?? match[3];
      if (key) {
        exactKeys.add(key);
      }
    }

    for (const match of content.matchAll(dynamicPattern)) {
      const prefix = match[1];
      if (prefix) {
        dynamicPrefixes.add(prefix);
      }
    }

    for (const match of content.matchAll(keyPropertyPattern)) {
      const key = match[1] ?? match[2] ?? match[3];
      if (key) {
        exactKeys.add(key);
      }
    }

    for (const match of content.matchAll(stringLiteralPattern)) {
      const literal = match[1] ?? match[2] ?? match[3];
      if (literal && KEY_LIKE_LITERAL_PATTERN.test(literal)) {
        exactKeys.add(literal);
      }
    }
  }

  return { exactKeys, dynamicPrefixes };
}

function keyMatchesDynamicPrefix(key, prefixes) {
  for (const prefix of prefixes) {
    if (key.startsWith(prefix)) {
      return true;
    }
  }

  return false;
}

function run() {
  const { locale } = parseArgs(process.argv.slice(2));
  const localePath = path.join(LOCALES_DIR, `${locale}.json`);

  console.log(`\n  ${c('cyan', 'i18n Unused Key Check')}\n`);

  if (!fs.existsSync(localePath)) {
    console.log(`  ${c('red', '✗')} Locale file not found: ${path.relative(ROOT, localePath)}\n`);
    process.exit(1);
  }

  let localeData;
  try {
    localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`  ${c('red', '✗')} Failed to parse ${locale}.json: ${message}\n`);
    process.exit(1);
  }

  const filesToScan = SOURCE_DIRS.flatMap((dir) => walkFiles(path.join(ROOT, dir)));
  const { exactKeys, dynamicPrefixes } = collectTranslationUsage(filesToScan);
  const allKeys = getAllKeys(localeData);

  const unusedKeys = allKeys.filter(
    (key) => !exactKeys.has(key) && !keyMatchesDynamicPrefix(key, dynamicPrefixes)
  );

  if (unusedKeys.length === 0) {
    console.log(`  ${c('green', '✓')} No unused keys found in ${locale}.json\n`);
    process.exit(0);
  }

  console.log(
    `  ${c('yellow', '⚠')} Potential unused keys in ${locale}.json (${unusedKeys.length}):`
  );
  unusedKeys.forEach((key) => {
    console.log(`    ${c('dim', '-')} ${key}`);
  });
  console.log('');

  process.exit(1);
}

run();
