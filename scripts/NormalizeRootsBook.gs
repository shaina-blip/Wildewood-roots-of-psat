/************************************************************************
 * Wildewood PSAT "Roots" Book — Formatting Normalizer  (v2)
 * ---------------------------------------------------------------------
 * Fixes three things so you can focus on CONTENT, not formatting:
 *
 *  1) SIZES:  body text -> 12 pt,  bold sub-headings -> 14 pt.
 *  2) INDENTS: clears stray left / first-line indents on body text.
 *  3) "INVISIBLE TABLE" FEEL: unwraps the single-cell tables that box
 *     reading passages, turning them into normal paragraphs you can edit
 *     freely. (Keeps real tables — headers, the intelligences inventory,
 *     homework grids, the reference sheet, and small write-in boxes.)
 *
 * Fonts: retypes wrong/default fonts to Gelasio but LEAVES the Caveat
 * handwriting tagline and your headers alone.
 *
 * HOW TO RUN  (always test on a COPY first!)
 *   1. File ▸ Make a copy
 *   2. Extensions ▸ Apps Script  ▸ paste this whole file ▸ Save
 *   3. Run  normalizeFormatting  ▸ authorize.
 *   Tip: set DRY_RUN = true to preview counts in View ▸ Logs first.
 ************************************************************************/

var CONFIG = {
  DRY_RUN: false,

  BODY_FONT: 'Gelasio',
  BODY_SIZE: 12,          // normal body text  (set 11 if you prefer)
  SUBHEAD_SIZE: 14,       // bold sub-headings
  SUBHEAD_MAX_CHARS: 60,  // a bold line this short (or shorter) = sub-heading

  FIX_INDENTATION: true,
  UNWRAP_PASSAGE_TABLES: true,
  UNWRAP_MIN_CHARS: 150,  // only unwrap single-cell tables holding real text
                          // (so blank write-in boxes are left as boxes)

  // Fonts treated as "wrong" (my inserted defaults). Retyped to BODY_FONT.
  // Gelasio is also re-sized here so the all-14 mistake gets corrected.
  WRONG_FONTS: ['Arial', 'Calibri', 'Docs-Calibri', 'Times New Roman'],
  // Fonts to leave completely alone (never retype/resize):
  PRESERVE_FONTS: ['Caveat'],
};


function normalizeFormatting() {
  var doc  = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var rep = { unwrapped: 0, paras: 0 };

  if (CONFIG.UNWRAP_PASSAGE_TABLES) unwrapPassageTables_(body, rep);

  var paras = body.getParagraphs();
  for (var i = 0; i < paras.length; i++) normalizePara_(paras[i], rep);

  Logger.log('Passage tables unwrapped: %s   Paragraphs normalized: %s%s',
    rep.unwrapped, rep.paras, CONFIG.DRY_RUN ? '   (DRY RUN)' : '');
  try {
    DocumentApp.getUi().alert('Formatting normalized.\n' +
      'Passage tables unwrapped: ' + rep.unwrapped +
      '\nParagraphs normalized: ' + rep.paras +
      (CONFIG.DRY_RUN ? '\n(DRY RUN — nothing changed)' : ''));
  } catch (e) {}
}


/** Turn single-cell tables that hold real text into normal paragraphs. */
function unwrapPassageTables_(body, rep) {
  var tables = body.getTables();
  for (var i = tables.length - 1; i >= 0; i--) {
    var tbl = tables[i];
    if (tbl.getNumRows() !== 1) continue;
    if (tbl.getRow(0).getNumCells() !== 1) continue;
    var cell = tbl.getCell(0, 0);
    if (cell.getText().replace(/\s/g, '').length < CONFIG.UNWRAP_MIN_CHARS) continue;

    if (!CONFIG.DRY_RUN) {
      var at = body.getChildIndex(tbl);
      for (var k = 0; k < cell.getNumChildren(); k++) {
        var child = cell.getChild(k);
        var type = child.getType();
        if (type === DocumentApp.ElementType.PARAGRAPH) {
          body.insertParagraph(at++, child.copy());
        } else if (type === DocumentApp.ElementType.LIST_ITEM) {
          body.insertListItem(at++, child.copy());
        } else if (type === DocumentApp.ElementType.TABLE) {
          body.insertTable(at++, child.copy());
        }
      }
      body.removeChild(tbl);
    }
    rep.unwrapped++;
  }
}


function firstFont_(t, len) {
  for (var i = 0; i < len; i++) {
    var f = t.getFontFamily(i);
    if (f != null) return f;
  }
  return null;
}


/** Set font + size (body vs sub-heading) + indent on a body paragraph.
 *  Skips headings and anything in a PRESERVE font (e.g., Caveat). */
function normalizePara_(p, rep) {
  if (p.getHeading && p.getHeading() !== DocumentApp.ParagraphHeading.NORMAL) return;
  var t = p.editAsText();
  var s = t.getText();
  if (!s || !s.trim().length) return;

  var f = firstFont_(t, s.length);
  if (CONFIG.PRESERVE_FONTS.indexOf(f) !== -1) return;         // leave handwriting etc.
  var processable = (f === CONFIG.BODY_FONT) || (f == null) ||
                    (CONFIG.WRONG_FONTS.indexOf(f) !== -1);
  if (!processable) return;                                    // leave unknown intentional fonts

  // sub-heading? bold + short line
  var firstBoldIdx = 0;
  while (firstBoldIdx < s.length && s[firstBoldIdx] === ' ') firstBoldIdx++;
  var isBold = t.isBold(firstBoldIdx);
  var isSubhead = isBold && s.trim().length <= CONFIG.SUBHEAD_MAX_CHARS;
  var size = isSubhead ? CONFIG.SUBHEAD_SIZE : CONFIG.BODY_SIZE;

  if (!CONFIG.DRY_RUN) {
    t.setFontFamily(CONFIG.BODY_FONT);
    t.setFontSize(size);
    if (CONFIG.FIX_INDENTATION) {
      p.setIndentStart(0); p.setIndentFirstLine(0); p.setIndentEnd(0);
    }
  }
  rep.paras++;
}
