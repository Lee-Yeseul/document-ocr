import { execSync } from 'child_process';
import path, { dirname } from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';
import test from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));

// compile the TypeScript file to a temporary directory for testing
const outDir = path.join(__dirname, 'dist');
execSync(`mkdir -p ${outDir} && tsc app/utils/format.ts --module commonjs --target es2017 --outDir ${outDir}`);

const { extractFields } = await import(path.join(outDir, 'format.js'));

test('extractFields captures reference number', () => {
  const input = 'Some text\nReference No. ABC123\nOther text';
  const result = extractFields(input);
  assert.strictEqual(result.referenceNo, 'ABC123');
});
