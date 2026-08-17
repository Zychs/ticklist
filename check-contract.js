/* check-contract.js — does the card still refuse to assert what it has not checked?
 *
 *   node experimental/todo-tree/check-contract.js
 *
 * Runs the REAL render path from todo-tree.html under minimal DOM stubs and
 * asserts the LEDGER CONTRACT holds: no state may reach the paint from todos.js.
 * Exit 0 = clean, 1 = the contract is broken.
 *
 * Why this file exists: the previous integrity check was a shape check — it
 * counted non-empty strings and awarded a green "composite complete" chip to a
 * plate that was factually wrong for five days. Shape is not truth. This script
 * checks the one property that matters: that a state key in the data cannot
 * become a claim on the screen.
 *
 * Kill criterion (from the build plan): the day you say "ignore the banner",
 * delete this lint rather than leave a permanently-ignored warning up. A warning
 * everyone ignores teaches you to ignore the receipt chips too.
 */
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const html = fs.readFileSync(path.join(DIR, "todo-tree.html"), "utf8");
const inline = html.split("<script>")[1].split("</script>")[0];
const dataSrc = fs.readFileSync(path.join(DIR, "todos.js"), "utf8");

function makeEl(id) {
  return {
    id, _text: "", className: "", innerHTML: "", hidden: false,
    children: [], style: {},
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, on) { on ? this._s.add(c) : this._s.delete(c); },
      contains(c) { return this._s.has(c); },
    },
    appendChild(c) { this.children.push(c); return c; },
    addEventListener() {},
    querySelector() { return makeEl("q"); },
    set textContent(v) { this._text = String(v); },
    get textContent() { return this._text; },
  };
}

const els = {};
const get = id => (els[id] = els[id] || makeEl(id));

global.localStorage = { getItem: () => null, setItem: () => {} };
global.document = {
  getElementById: get,
  createElement: () => makeEl("new"),
  addEventListener: () => {},
  readyState: "complete",
  body: makeEl("body"),
  documentElement: makeEl("html"),
};

function run(mutate) {
  Object.keys(els).forEach(k => delete els[k]);
  global.window = {};
  eval(dataSrc);
  if (mutate) mutate(global.window);
  Object.assign(global, { TODOS: global.window.TODOS, TypeScale: undefined });
  eval(inline);
  return { trunk: get("trunk").innerHTML, badge: get("trunkBadge").textContent };
}

let failures = 0;
const check = (name, cond, detail) => {
  console.log((cond ? "PASS  " : "FAIL  ") + name + (cond ? "" : "\n        " + detail));
  if (!cond) failures++;
};
const count = (s, re) => (s.match(re) || []).length;

console.log("=== resting state ===");
const clean = run(null);
const gates = (global.window.TODO_TREE_META.trunk.gates || []).length;
console.log("badge : " + clean.badge);
console.log("tally : " + (clean.trunk.match(/<span class="tally">(.*?)<\/span>/) || [])[1]);

check("badge is a shape count, not a truth claim",
  /all fields filled \d+\/\d+/.test(clean.badge) && !/complete|verified/i.test(clean.badge), clean.badge);
check("no gate paints as law without a ledger", !/class="gate law"/.test(clean.trunk),
  "a gate claimed law with no receipt source present");
check("no option renders as chosen", !/&#10003;/.test(clean.trunk) && !/opt pick/.test(clean.trunk),
  "a chosen option was painted — that is a state claim");
check("every gate carries a status chip", count(clean.trunk, /class="gstat"/g) === gates,
  count(clean.trunk, /class="gstat"/g) + " chips for " + gates + " gates");
check("readings are labelled as readings", count(clean.trunk, /<b>reading<\/b>/g) > 0,
  "readings rendered without their label");

console.log("\n=== contamination: a state key smuggled into todos.js ===");
const dirty = run(w => { w.TODO_TREE_META.trunk.gates[0].status = "frozen"; });
check("contamination banner fires", /narrating state/.test(dirty.trunk), "no banner");
check("banner names the offending key", /unexpected key (&quot;|")status(&quot;|")/.test(dirty.trunk),
  "banner did not name the key");
check("tally is suppressed entirely", /tally suppressed/.test(dirty.trunk), "numbers still printed");
check("the smuggled state never reaches the paint", !/class="gate law"/.test(dirty.trunk),
  "STATE LEAKED INTO THE PAINT — the whole point of this file failed");

console.log("\n=== forbidden prose in the data (contract comment excluded) ===");
const body = dataSrc.slice(dataSrc.indexOf("window.TODO_TREE_META"));
const banned = ["settled", "locked", "decided", "chosen", "frozen", "resolved",
  "agreed", "picked", "already", "no longer", "nothing further", "unblocked"];
const hits = banned.filter(w => new RegExp("\\b" + w + "\\b", "i").test(body));
check("no state prose in the readings", hits.length === 0, "found: " + hits.join(", "));

console.log(failures === 0 ? "\nCONTRACT HOLDS" : "\n" + failures + " CHECK(S) FAILED");
process.exit(failures === 0 ? 0 : 1);
