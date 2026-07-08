/************************************************************************
 * Wildewood PSAT "Roots" Book — Content Editor  (v1)
 * ---------------------------------------------------------------------
 * Applies the round of CONTENT rewrites we agreed on — teaching the
 * material explicitly, PSAT-style — directly inside the Google Doc so
 * you edit content, not formatting. It does NOT pull any practice
 * problems (you're adding those yourself); where practice goes, it
 * drops a small italic note you can delete.
 *
 * WHAT IT DOES
 *   1. PERCENTS (4B Part 1) — rewritten: per = divide, cent = 100,
 *      percent = "per 100"; percents as fractions/decimals;
 *      part/whole = x/100; "of" means multiply; Desmos.
 *   2. EXPONENTIAL GROWTH (4B Part 4) — rewritten around y = a(1 ± r)^t,
 *      every variable explained, the "1" anchored to a 100% baseline
 *      (multiplier > 1 grows, < 1 shrinks).
 *   3. MODIFIERS (3A Part 6) — rewritten/expanded, word salad kept.
 *   4. GEOMETRY (3B) restructured — in place, still 5 parts:
 *        Part 1  Triangles                         (unchanged)
 *        Part 2  Area, Surface Area & Volume       (merged; SA taught
 *                                                    conceptually only)
 *        Part 3  Degrees & Angles                  (angle relationships)
 *        Part 4  Radians                           (as a unit conversion)
 *        Part 5  Circles                           (unchanged)
 *   5. 3A examples — a few worked examples appended to Parts of Speech
 *      and "Subjects: Find the Noun" (nothing deleted there).
 *
 * SAFETY
 *   • Works section-by-section using the header tables as anchors. If a
 *     header isn't found, that section is skipped and nothing changes.
 *   • When it rewrites a section it removes the old teaching text but
 *     PRESERVES any paragraph/table that contains an image (so problems
 *     you've already pasted in survive).
 *   • DRY_RUN = true by default: run it once, read View ▸ Logs to see
 *     exactly what it would touch, then set DRY_RUN = false.
 *
 * HOW TO RUN  (test on a COPY first!)
 *   1. File ▸ Make a copy
 *   2. Extensions ▸ Apps Script ▸ paste this whole file ▸ Save
 *   3. Run  applyContentEdits  ▸ authorize ▸ read the Logs
 *   4. Set DRY_RUN = false ▸ Run again
 *   5. Run NormalizeRootsBook afterward to lock the fonts/spacing.
 ************************************************************************/

var EDIT_CONFIG = {
  DRY_RUN: true,
  BODY_FONT: 'Gelasio',
  BODY_SIZE: 11,
  SUBHEAD_SIZE: 13,
  PRESERVE_IMAGES: true,   // keep any problem you've already pasted in
};

// ---- content notation ---------------------------------------------------
// each line is [kind, text]:  'h' = bold sub-heading, 'p' = body,
// 'i' = italic note (e.g. the "add problems here" placeholder)
function h(t){ return ['h', t]; }
function p(t){ return ['p', t]; }
function i(t){ return ['i', t]; }


// =========================================================================
// SECTIONS TO REWRITE  (old teaching text replaced; images preserved)
// =========================================================================
var REWRITES = [

  // ---------------------------------------------------- 1) PERCENTS
  { label: 'Lesson 4B, Part 1 of 5', note: 'Percents', content: [
    p('Break the word apart and it tells you exactly what to do. PER means divide (miles per hour = miles ÷ hours). CENT means 100 (a CENTury is 100 years; a CENT is 1/100 of a dollar). So PERCENT literally means “per 100” — divide by 100.'),
    h('A percent is just a number over 100'),
    p('40% means 40 per 100 = 40/100. Written three ways, all the same value: 40% = 40/100 = 0.40.'),
    p('To turn a percent into a decimal, divide by 100 (move the decimal two places left): 40% → 0.40, 7% → 0.07, 125% → 1.25.'),
    h('The one setup that solves them all:  part / whole = x / 100'),
    p('Almost every percent question is really this proportion with one piece missing. They give you two numbers; you solve for the third.'),
    p('• What is 30% of 80?   →   part / 80 = 30 / 100   →   part = 24'),
    p('• 12 is what percent of 48?   →   12 / 48 = x / 100   →   x = 25'),
    p('• 18 is 40% of what number?   →   18 / whole = 40 / 100   →   whole = 45'),
    h('“of” means multiply'),
    p('Whenever you see “X% of Y,” the word “of” is telling you to multiply. Turn the percent into a decimal and multiply: X% of Y = (X/100) · Y. So 30% of 80 = 0.30 × 80 = 24 — same answer, fewer steps.'),
    h('Do it in Desmos'),
    p('Type the proportion with the x right in it — 12/48 = x/100 — and Desmos solves for x. Or go straight at it: for the part, type 0.30*80; for the percent, type 12/48 and read the decimal (0.25 = 25%).'),
    h('Percent CHANGE uses the same setup'),
    p('change / original = x / 100. The starting value is always the whole. (From 50 up to 60: change = 10, original = 50 → 10/50 = 20% increase.)'),
    i('(Add 2–3 PSAT percent problems here.)'),
  ]},

  // ---------------------------------------------------- 2) EXPONENTIAL GROWTH
  { label: 'Lesson 4B, Part 4 of 5', note: 'Exponential Growth', content: [
    p('Linear change ADDS the same amount every step. Exponential change MULTIPLIES by the same amount every step — that’s why it starts slow, then explodes. The test’s favorite formula:'),
    h('y = a(1 ± r)^t'),
    p('Read it one piece at a time:'),
    p('• a = the STARTING amount — what you have at t = 0, before anything changes.'),
    p('• r = the rate of change as a decimal (7% → 0.07).'),
    p('• t = how many steps have gone by (years, months, …).'),
    p('• (1 ± r) = the MULTIPLIER — the piece that does all the work.'),
    h('Why the 1? It’s your 100% baseline'),
    p('The 1 stands for 100% of what you already have — you always keep that. Then you adjust:'),
    p('• Increase by 7%: keep 100% AND add 7% → 1 + 0.07 = 1.07. The multiplier is BIGGER than 1, so the amount grows.'),
    p('• Decrease by 7%: keep 100% but LOSE 7% → 1 − 0.07 = 0.93. The multiplier is LESS than 1, so the amount shrinks.'),
    p('Gut check: multiplier > 1 → growing; multiplier < 1 → shrinking. If a 7% increase ever gives you 1.7, you know it’s wrong.'),
    h('Putting it together'),
    p('$1,300 growing 7% a month: a = 1300, r = 0.07, multiplier 1.07 → y = 1300(1.07)^t. A $20,000 car losing 15% a year: y = 20000(0.85)^t.'),
    h('Desmos check'),
    p('Type the equation and look at t = 0 — you should get a back. Step t to 1 and confirm the output equals a × the multiplier. If it matches, the formula is right.'),
    i('(Add 2–3 PSAT exponential-growth problems here.)'),
  ]},

  // ---------------------------------------------------- 3) MODIFIERS
  { label: 'Lesson 3A, Part 6 of 6', note: 'Modifiers', content: [
    p('A modifier is a word or phrase that describes something else. The golden rule: a modifier has to sit RIGHT NEXT TO the thing it describes. Break that rule and you get word salad — a sentence with all the right words that says something ridiculous.'),
    h('The word salad'),
    p('“Running to catch the bus, my backpack flew open.” Read it literally: the backpack is running to catch the bus. That’s the salad. The opening phrase “Running to catch the bus” describes whoever was running — but the first thing after the comma is “my backpack,” so the sentence hands the running to the backpack.'),
    p('More salad: “Covered in melted cheese, I devoured the nachos.” (I’m covered in cheese?) “After rotting for weeks, my roommate finally threw out the leftovers.” (Your roommate rotted for weeks?)'),
    h('The fix: who is actually doing it?'),
    p('When a sentence opens with a describing phrase and a comma, the very next thing must be the person or thing that phrase is about. Ask: WHO is running / covered in cheese / rotting?'),
    p('• Running to catch the bus, I felt my backpack fly open. ✓  (I was running.)'),
    p('• Covered in melted cheese, the nachos disappeared in seconds. ✓  (The nachos were covered.)'),
    h('How it shows up on the test'),
    p('The opening phrase is fixed, and the four answer choices are four different ways to start the main sentence. Your job: pick the choice that names the thing the phrase is actually describing. Cross off any choice that makes word salad — even if it “sounds” fine.'),
    p('Pro tip: read the opening phrase, then say out loud “WHO or WHAT is doing this?” Whatever answers that question has to come right after the comma.'),
    i('(Add 2–3 PSAT modifier problems here.)'),
  ]},

  // ---------------------------------------------------- 4a) AREA / SA / VOLUME
  { label: 'Lesson 3B, Part 2 of 5', note: 'Area, Surface Area & Volume', content: [
    p('This part bundles the three “how much space” measurements. Area is flat space (2-D). Volume is space filled up (3-D). Surface area is the skin wrapped around a 3-D shape. Good news: the reference sheet at the front of every math section gives you almost all of these — your job is knowing which one to grab.'),
    h('Area (flat, 2-D) — measured in SQUARE units'),
    p('• Rectangle: length × width'),
    p('• Triangle: ½ × base × height'),
    p('• Circle: π r²   (r = radius, half the diameter)'),
    h('Surface area — you only need to GET it, not grind it'),
    p('Surface area is the area of every face of a solid added together — picture the wrapping paper it takes to cover the shape with no gaps or overlaps. The SAT and PSAT almost never ask you to calculate surface area from scratch, so don’t memorize formulas for it. Just understand the idea: a 2 × 3 × 4 box has a surface area equal to the areas of all six rectangular faces added up. That concept is all you need.'),
    h('Volume (filled up, 3-D) — measured in CUBIC units'),
    p('Most volumes follow one pattern: area of the base × how tall it is.'),
    p('• Box / rectangular prism: length × width × height'),
    p('• Cylinder: (π r²) × height — the circle base times the height'),
    p('• The reference sheet also gives cones, spheres, and pyramids. Don’t memorize them — look them up when a problem needs them.'),
    h('The trap: match your units'),
    p('Area comes out in square units (ft²), volume in cubic units (ft³). If an answer’s units don’t match what the question asked for, it’s wrong.'),
    i('(Add 2–3 PSAT area/volume problems here.)'),
  ]},

  // ---------------------------------------------------- 4b) DEGREES & ANGLES
  { label: 'Lesson 3B, Part 3 of 5', note: 'Degrees & Angles', content: [
    p('Angles are measured in degrees, and almost every angle problem comes down to a few sums that always hold. Find the angles you know, and the missing one falls out.'),
    h('The numbers that never change'),
    p('• A straight line = 180°. Angles sitting on one side of a straight line add up to 180°.'),
    p('• A full circle (all the way around a point) = 360°.'),
    p('• The three angles inside ANY triangle add up to 180°.'),
    h('Angle pairs'),
    p('• Vertical angles (the X made by two crossing lines): the angles across from each other are EQUAL.'),
    p('• Supplementary angles add to 180°; complementary angles add to 90°.'),
    h('Parallel lines cut by a transversal'),
    p('When one line crosses two parallel lines, only two angle sizes exist in the whole picture, and they add to 180°. Angles in the same position (or diagonal from each other) are EQUAL; any two that aren’t equal are supplementary. On the test: find one angle, and every other angle is either that same number or 180° minus it.'),
    h('How to attack it'),
    p('Label every angle you can figure out, one fact at a time, until you reach the one they asked for. You almost never need a formula — just the sums above.'),
    i('(Add 2–3 PSAT angle problems here.)'),
  ]},

  // ---------------------------------------------------- 4c) RADIANS
  { label: 'Lesson 3B, Part 4 of 5', note: 'Radians', content: [
    p('A radian is just another unit for measuring angles — like measuring the same distance in feet OR inches. Degrees and radians describe the exact same angle; they’re two languages for it. So switching between them is nothing more than a unit conversion.'),
    h('The one conversion fact'),
    p('180° = π radians. That’s the whole thing. (A full circle is 360° = 2π radians.)'),
    h('Convert by multiplying by 1'),
    p('Remember from unit conversion: any true equation can be written as a fraction equal to 1, and multiplying by 1 changes the units without changing the value. From 180° = π radians you get two versions of 1:'),
    p('π radians / 180°     and     180° / π radians'),
    p('Pick the one that cancels the unit you DON’T want:'),
    p('• Degrees → radians: 90° × (π radians / 180°) = π/2 radians.  (The “degrees” cancel.)'),
    p('• Radians → degrees: (π/3 radians) × (180° / π radians) = 60°.  (The “radians” cancel.)'),
    h('Desmos note'),
    p('Desmos can work in either mode, but for PSAT problems you usually just apply the conversion above. Set it up so the unit you’re getting rid of sits on the bottom — exactly like turning feet into inches.'),
    i('(Add 1–2 PSAT radian problems here.)'),
  ]},
];


// =========================================================================
// HEADER RETITLES  (change the title row + time; styling preserved)
// scoped to each header table so identical times elsewhere aren't touched
// =========================================================================
var RETITLES = [
  { label: 'Lesson 3B, Part 2 of 5', find: 'Area',              to: 'Area, Surface Area & Volume', timeFind: '12 minutes', timeTo: '15 minutes' },
  { label: 'Lesson 3B, Part 3 of 5', find: 'Volume',            to: 'Degrees & Angles',            timeFind: '10 minutes', timeTo: '12 minutes' },
  { label: 'Lesson 3B, Part 4 of 5', find: 'Degrees & Radians', to: 'Radians',                     timeFind: '12 minutes', timeTo: '10 minutes' },
];


// =========================================================================
// APPENDS  (extra examples added to the END of a section; nothing deleted)
// =========================================================================
var APPENDS = [
  { label: 'Lesson 3A, Part 1 of 6', note: 'Parts of Speech', content: [
    h('Quick examples'),
    p('Nouns are people, places, things, or ideas: teacher, Chicago, pencil, freedom. Verbs are actions or states of being: run, is, becomes, thinks. Adjectives describe nouns (the RED car); adverbs describe verbs (ran QUICKLY).'),
    p('Label the parts: “The nervous student answered quickly.” → The (article) · nervous (adjective) · student (noun) · answered (verb) · quickly (adverb).'),
  ]},
  { label: 'Lesson 3A, Part 2 of 6', note: 'Subjects: Find the Noun', content: [
    h('More examples'),
    p('The subject is the noun doing the verb. Strip away the extra words to find it:'),
    p('• “The box of old photos is heavy.” → subject = box (not photos). is ✓'),
    p('• “My friends from the team are here.” → subject = friends. are ✓'),
    p('• “Each of the students has a locker.” → subject = Each (singular). has ✓'),
  ]},
];


// =========================================================================
// MAIN
// =========================================================================
function applyContentEdits() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var headers = getHeaderTables_(body);
  var log = [];

  // 1) retitle geometry headers (do this first; label lookup is unaffected)
  RETITLES.forEach(function(r){
    var tbl = findHeader_(headers, r.label);
    if (!tbl) { log.push('SKIP retitle (header not found): ' + r.label); return; }
    if (!EDIT_CONFIG.DRY_RUN) {
      if (r.timeFind) tbl.replaceText(escapeRe_(r.timeFind), r.timeTo);
      tbl.replaceText(escapeRe_(r.find), r.to);
    }
    log.push('retitle ' + r.label + ':  "' + r.find + '" → "' + r.to + '"'
             + (r.timeFind ? '  (' + r.timeFind + ' → ' + r.timeTo + ')' : ''));
  });

  // 2) rewrite teaching sections
  REWRITES.forEach(function(sec){
    var tbl = findHeader_(headers, sec.label);
    if (!tbl) { log.push('SKIP rewrite (header not found): ' + sec.label); return; }
    var removed = replaceSection_(body, tbl, headers, sec.content);
    log.push('rewrite ' + sec.label + ' [' + sec.note + ']:  removed ' + removed
             + ' old block(s), inserted ' + sec.content.length + ' line(s)'
             + (EDIT_CONFIG.PRESERVE_IMAGES ? ' (images kept)' : ''));
  });

  // 3) append examples
  APPENDS.forEach(function(sec){
    var tbl = findHeader_(headers, sec.label);
    if (!tbl) { log.push('SKIP append (header not found): ' + sec.label); return; }
    appendToSection_(body, tbl, headers, sec.content);
    log.push('append ' + sec.label + ' [' + sec.note + ']:  added ' + sec.content.length + ' line(s)');
  });

  var msg = log.join('\n') + (EDIT_CONFIG.DRY_RUN ? '\n\n(DRY RUN — nothing changed)' : '');
  Logger.log(msg);
  try { DocumentApp.getUi().alert('Content edits ' + (EDIT_CONFIG.DRY_RUN ? '(DRY RUN)' : 'applied') + ':\n\n' + msg); } catch (e) {}
}


// ---------------------------------------------------------------- helpers

function getHeaderTables_(body) {
  var tables = body.getTables(), out = [];
  for (var i = 0; i < tables.length; i++) if (isLessonHeader_(tables[i])) out.push(tables[i]);
  return out;   // document order
}

/** A lesson-header table: first cell begins "Lesson ", contains a time,
 *  and has at most 3 rows. (Excludes table-of-contents lines and problems.) */
function isLessonHeader_(tbl) {
  try {
    if (tbl.getNumRows() > 3) return false;
    var first = tbl.getRow(0).getCell(0).getText().trim();
    if (first.indexOf('Lesson') !== 0) return false;
    return /minute/i.test(tbl.getText());
  } catch (e) { return false; }
}

function findHeader_(headers, label) {
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].getRow(0).getCell(0).getText().trim().indexOf(label) === 0) return headers[i];
  }
  return null;
}

/** index (in body) of the header table that follows `tbl`, or body length. */
function nextHeaderIndex_(body, tbl, headers) {
  var idx = headers.indexOf(tbl);
  if (idx >= 0 && idx + 1 < headers.length) return body.getChildIndex(headers[idx + 1]);
  return body.getNumChildren();
}

/** Remove old teaching text between a header and the next header (keeping
 *  images), then insert the new content right after the header. */
function replaceSection_(body, tbl, headers, content) {
  var start = body.getChildIndex(tbl);
  var end = nextHeaderIndex_(body, tbl, headers);
  var removed = 0;

  if (!EDIT_CONFIG.DRY_RUN) {
    for (var k = end - 1; k > start; k--) {
      var ch = body.getChild(k);
      if (EDIT_CONFIG.PRESERVE_IMAGES && containsImage_(ch)) continue;
      if (ch.getType() === DocumentApp.ElementType.TABLE && isLessonHeader_(ch.asTable())) continue;
      body.removeChild(ch);
      removed++;
    }
    insertContent_(body, body.getChildIndex(tbl) + 1, content);
  } else {
    for (var j = end - 1; j > start; j--) {
      var c = body.getChild(j);
      if (!(EDIT_CONFIG.PRESERVE_IMAGES && containsImage_(c)) &&
          !(c.getType() === DocumentApp.ElementType.TABLE && isLessonHeader_(c.asTable()))) removed++;
    }
  }
  return removed;
}

/** Insert content at the very end of a section (right before the next header). */
function appendToSection_(body, tbl, headers, content) {
  if (EDIT_CONFIG.DRY_RUN) return;
  var at = nextHeaderIndex_(body, tbl, headers);
  insertContent_(body, at, content);
}

function insertContent_(body, at, content) {
  for (var i = 0; i < content.length; i++) {
    var kind = content[i][0], text = content[i][1];
    var para = body.insertParagraph(at++, text);
    styleInserted_(para, kind);
  }
}

function styleInserted_(para, kind) {
  para.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  var t = para.editAsText();
  t.setFontFamily(EDIT_CONFIG.BODY_FONT);
  t.setFontSize(kind === 'h' ? EDIT_CONFIG.SUBHEAD_SIZE : EDIT_CONFIG.BODY_SIZE);
  t.setBold(kind === 'h');
  t.setItalic(kind === 'i');
  para.setLineSpacing(1.0);
  para.setSpacingAfter(4);
  para.setSpacingBefore(kind === 'h' ? 6 : 0);
  para.setIndentStart(0); para.setIndentFirstLine(0); para.setIndentEnd(0);
}

function containsImage_(el) {
  var type = el.getType();
  if (type === DocumentApp.ElementType.INLINE_IMAGE) return true;
  if (type === DocumentApp.ElementType.PARAGRAPH) {
    try { if (el.asParagraph().getPositionedImages().length) return true; } catch (e) {}
  }
  if (typeof el.getNumChildren === 'function') {
    for (var i = 0; i < el.getNumChildren(); i++) {
      if (containsImage_(el.getChild(i))) return true;
    }
  }
  return false;
}

function escapeRe_(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
