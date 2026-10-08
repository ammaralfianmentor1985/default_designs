#!/usr/bin/env node
// Checks every JSON-LD block in the built site against the official schema.org vocabulary:
// every @type exists, every property exists and is allowed on that type (or one of its parents), and every value is
// of a type the property accepts. This is a vocabulary check; it is NOT Google's Rich Results Test (which needs a
// public URL and a browser session) - run that on the live address as well.
//
//   curl -sSL -o /tmp/schemaorg.jsonld https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/29.0/schemaorg-current-https.jsonld
//   node site-src/qa/validate-jsonld.mjs /tmp/schemaorg.jsonld site
import fs from 'node:fs';
import path from 'node:path';

const [, , vocabFile, siteDir = 'site'] = process.argv;
if (!vocabFile) { console.error('usage: validate-jsonld.mjs <schemaorg-current-https.jsonld> [site dir]'); process.exit(2); }
const vocab = JSON.parse(fs.readFileSync(vocabFile, 'utf8'));
const byId = new Map(vocab['@graph'].map((n) => [n['@id'], n]));
const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const ids = (x) => arr(x).map((v) => v['@id']);
const isClass = (id) => arr(byId.get(id)?.['@type']).some((t) => t === 'rdfs:Class' || (typeof t === 'string' && byId.has(t)));

function ancestors(id, seen = new Set()) {
  if (seen.has(id)) return seen;
  seen.add(id);
  for (const s of ids(byId.get(id)?.['rdfs:subClassOf'])) ancestors(s, seen);
  return seen;
}
const TEXTLIKE = ['schema:Text', 'schema:URL', 'schema:Time', 'schema:DateTime', 'schema:Date', 'schema:CssSelectorType', 'schema:XPathType', 'schema:PronounceableText'];
const NUMBERLIKE = ['schema:Number', 'schema:Integer', 'schema:Float'];

const errors = [];
const warnings = [];
function check(node, where, file) {
  const types = arr(node['@type']).map((t) => 'schema:' + t);
  for (const t of types) if (!byId.has(t) || !isClass(t)) errors.push(`${file} ${where}: unknown type ${t}`);
  const allowed = new Set(types.flatMap((t) => [...ancestors(t)]));
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('@')) continue;
    const prop = byId.get('schema:' + key);
    if (!prop) { errors.push(`${file} ${where}: unknown property "${key}"`); continue; }
    const domain = ids(prop['schema:domainIncludes']);
    if (types.length && !domain.some((d) => allowed.has(d))) {
      errors.push(`${file} ${where}: "${key}" is not a property of ${types.join(', ')} (valid on: ${domain.map((d) => d.replace('schema:', '')).join(', ')})`);
    }
    const range = ids(prop['schema:rangeIncludes']);
    for (const v of arr(value)) {
      if (v && typeof v === 'object') {
        if (v['@type']) {
          const vt = arr(v['@type']).map((t) => 'schema:' + t);
          const vAllowed = new Set(vt.flatMap((t) => [...ancestors(t)]));
          if (!range.some((r) => vAllowed.has(r))) warnings.push(`${file} ${where}: "${key}" holds a ${vt.join(', ')}, the vocabulary lists ${range.map((r) => r.replace('schema:', '')).join(', ')}`);
          check(v, `${where}.${key}`, file);
        }
      } else if (typeof v === 'string') {
        if (!range.some((r) => TEXTLIKE.includes(r) || (byId.get(r) && !isClass(r) === false && false))) {
          // enumerations (e.g. availability) are written as URLs or text; anything else is suspicious
          if (!range.some((r) => ancestors(r).has('schema:Enumeration'))) warnings.push(`${file} ${where}: "${key}" is text but the vocabulary expects ${range.map((r) => r.replace('schema:', '')).join(', ')}`);
        }
      } else if (typeof v === 'number') {
        if (!range.some((r) => NUMBERLIKE.includes(r) || TEXTLIKE.includes(r))) warnings.push(`${file} ${where}: "${key}" is a number but the vocabulary expects ${range.map((r) => r.replace('schema:', '')).join(', ')}`);
      } else if (typeof v === 'boolean') {
        if (!range.includes('schema:Boolean')) warnings.push(`${file} ${where}: "${key}" is true/false but the vocabulary expects ${range.map((r) => r.replace('schema:', '')).join(', ')}`);
      }
    }
  }
}

function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}
let blocks = 0;
for (const file of htmlFiles(siteDir)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++;
    const data = JSON.parse(m[1]);
    const label = path.relative(siteDir, file);
    check(data, arr(data['@type']).join('/'), label);
    console.log(`checked ${label}: ${arr(data['@type']).join('/')}`);
  }
}
console.log(`\n${blocks} JSON-LD blocks, ${errors.length} errors, ${warnings.length} warnings`);
for (const e of errors) console.log('ERROR  ', e);
for (const w of warnings) console.log('warning', w);
process.exit(errors.length ? 1 : 0);
