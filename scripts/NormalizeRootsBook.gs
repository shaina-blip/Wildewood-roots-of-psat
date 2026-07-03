/************************************************************************
 * Wildewood PSAT "Roots" Book — Formatting Normalizer
 * ---------------------------------------------------------------------
 * Fixes the #1 annoyance: inserted paragraphs that don't match your body
 * text. It learns your "house style" from your real Gelasio paragraphs
 * (font, size, line spacing, space-after, indentation) and applies it to
 * any paragraph that is still in the wrong font — so everything lines up.
 *
 * It LEAVES ALONE: your headers, tables' header rows, the Caveat
 * handwriting tagline, and anything already in the body font.
 *
 * Safe + re-runnable: run it whenever you finish editing CONTENT and it
 * cleans up the formatting. (It won't re-touch paragraphs already fixed.)
 *
 * HOW TO RUN  (test on a COPY first!)
 *   1. File ▸ Make a copy
 *   2. Extensions ▸ Apps Script
 *   3. Delete the sample code, paste THIS file, Save.
 *   4. Choose  normalizeFormatting  in the toolbar ▸ Run ▸ authorize.
 *   Tip: set DRY_RUN = true to preview counts in View ▸ Logs first.
 ************************************************************************/

var CONFIG = {
  DRY_RUN: false,

  // Your body style. Leave BODY_SIZE/spacing as 'auto' to copy them from
  // your own Gelasio text; or hard-set numbers (e.g. BODY_SIZE: 11).
  BODY_FONT:   'Gelasio',
  BODY_SIZE:   'auto',   // pt, or 'auto'
  LINE_SPACING:'auto',   // e.g. 1.15, or 'auto'
  SPACE_AFTER: 'auto',   // pt, or 'auto'
  SPACE_BEFORE:'auto',   // pt, or 'auto'

  FIX_INDENTATION: true, // reset stray left/first-line indents on fixed paras
  FIX_TABLE_FONTS: true, // also retype wrong-font text inside tables

  // Fonts that count as "wrong" (i.e., my inserted defaults). A run in any
  // of these — or with no font set — gets retyped to BODY_FONT.
  WRONG_FONTS: ['Arial', 'Calibri', 'Docs-Calibri', 'Times New Roman'],
};


function normalizeFormatting() {
  var doc  = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var style = detectHouseStyle_(body);
  Logger.log('House style: font=%s size=%s line=%s after=%s before=%s',
    style.font, style.size, style.line, style.after, style.before);

  var rep = { paras: 0, runs: 0 };
  var paras = body.getParagraphs();
  for (var i = 0; i < paras.length; i++) fixParagraph_(paras[i], style, rep, false);

  if (CONFIG.FIX_TABLE_FONTS) {
    var tables = body.getTables();
    for (var t = 0; t < tables.length; t++) fixTable_(tables[t], style, rep);
  }

  Logger.log('Paragraphs restyled: %s   Runs retyped: %s%s',
    rep.paras, rep.runs, CONFIG.DRY_RUN ? '   (DRY RUN)' : '');
  try {
    DocumentApp.getUi().alert('Formatting normalized.\nParagraphs restyled: ' +
      rep.paras + '\nRuns retyped: ' + rep.runs + (CONFIG.DRY_RUN ? '\n(DRY RUN — nothing saved)' : ''));
  } catch (e) {}
}


/** Learn font size + spacing from the first solid Gelasio body paragraph. */
function detectHouseStyle_(body) {
  var s = { font: CONFIG.BODY_FONT, size: 11, line: 1.15, after: 0, before: 0 };
  var paras = body.getParagraphs();
  for (var i = 0; i < paras.length; i++) {
    var p = paras[i];
    if (p.getHeading() !== DocumentApp.ParagraphHeading.NORMAL) continue;
    var txt = p.getText();
    if (!txt || txt.trim().length < 8) continue;
    if (p.editAsText().getFontFamily(0) === CONFIG.BODY_FONT) {
      s.size   = p.editAsText().getFontSize(0) || s.size;
      s.line   = p.getLineSpacing() || s.line;
      s.after  = (p.getSpacingAfter()  != null) ? p.getSpacingAfter()  : s.after;
      s.before = (p.getSpacingBefore() != null) ? p.getSpacingBefore() : s.before;
      break;
    }
  }
  if (CONFIG.BODY_SIZE   !== 'auto') s.size   = CONFIG.BODY_SIZE;
  if (CONFIG.LINE_SPACING!== 'auto') s.line   = CONFIG.LINE_SPACING;
  if (CONFIG.SPACE_AFTER !== 'auto') s.after  = CONFIG.SPACE_AFTER;
  if (CONFIG.SPACE_BEFORE!== 'auto') s.before = CONFIG.SPACE_BEFORE;
  return s;
}


function isWrongFont_(f) {
  return f == null || f === '' || CONFIG.WRONG_FONTS.indexOf(f) !== -1;
}


/** Retype wrong-font runs in a paragraph; if any were wrong, also align its
 *  spacing/indent to the house style. Skips headings. */
function fixParagraph_(p, style, rep, inTable) {
  if (p.getHeading && p.getHeading() !== DocumentApp.ParagraphHeading.NORMAL) return;
  var t = p.editAsText ? p.editAsText() : null;
  if (!t) return;
  var s = t.getText();
  if (!s || !s.length) return;

  var touched = false;
  for (var i = 0; i < s.length; i++) {
    if (isWrongFont_(t.getFontFamily(i))) {
      var j = i;
      while (j + 1 < s.length && isWrongFont_(t.getFontFamily(j + 1))) j++;
      if (!CONFIG.DRY_RUN) {
        t.setFontFamily(i, j, style.font);
        t.setFontSize(i, j, style.size);
      }
      rep.runs++; touched = true;
      i = j;
    }
  }

  if (touched && !inTable) {  // only reflow spacing/indent for real body paras
    rep.paras++;
    if (!CONFIG.DRY_RUN) {
      p.setLineSpacing(style.line);
      p.setSpacingAfter(style.after);
      p.setSpacingBefore(style.before);
      if (CONFIG.FIX_INDENTATION) {
        p.setIndentStart(0); p.setIndentFirstLine(0); p.setIndentEnd(0);
      }
    }
  }
}


function fixTable_(tbl, style, rep) {
  for (var r = 0; r < tbl.getNumRows(); r++) {
    var row = tbl.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var cell = row.getCell(c);
      for (var k = 0; k < cell.getNumChildren(); k++) {
        var child = cell.getChild(k);
        if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
          fixParagraph_(child.asParagraph(), style, rep, true);  // font only in tables
        }
      }
    }
  }
}
