/************************************************************************
 * Wildewood PSAT "Roots" Book — Formatting Normalizer  (v3)
 * ---------------------------------------------------------------------
 * Makes the Google Doc match the printed "house look":
 *
 *   • FONT: everything → Gelasio (except the Caveat handwriting tagline)
 *   • SIZE: body 11 pt · bold sub-headings 13 pt
 *   • SPACING: single line spacing, small gap after each paragraph
 *   • BULLETS: clean hanging indents (nested bullets step in further)
 *   • LESSON HEADER TABLES ("Lesson 4B, Part 1 of 5 | 10 minutes"):
 *       – label cell: blue, bold-italic-underline, 15 pt (fixes the
 *         broken "of 5" run styling)
 *       – time cell: bold-italic 15 pt, right-aligned
 *       – title row: bold, underlined, CENTERED, 14 pt
 *   • MARGINS: page margins set to the book's print margins
 *   • Also unwraps single-cell passage boxes (safe to re-run)
 *
 * HOW TO RUN  (test on a COPY first!)
 *   1. File ▸ Make a copy
 *   2. Extensions ▸ Apps Script ▸ paste this whole file ▸ Save
 *   3. Run  normalizeFormatting  ▸ authorize
 *   Tip: DRY_RUN = true previews counts in View ▸ Logs, changes nothing.
 ************************************************************************/

var CONFIG = {
  DRY_RUN: false,

  BODY_FONT: 'Gelasio',
  BODY_SIZE: 11,
  SUBHEAD_SIZE: 13,        // short bold lines ("The Facts", "Pro Tip"…)
  SUBHEAD_MAX_CHARS: 60,

  HDR_LABEL_SIZE: 15,      // "Lesson 4B, Part 1 of 5"
  HDR_TIME_SIZE: 15,       // "10 minutes"
  HDR_TITLE_SIZE: 14,      // "Percents"
  HDR_BLUE: '#1155cc',

  LINE_SPACING: 1.0,
  SPACE_AFTER_BODY: 4,     // pt
  SPACE_AFTER_LIST: 2,     // pt

  LIST_INDENT: 36,         // pt (0.5") first-level bullet text position
  LIST_STEP: 18,           // extra per nesting level
  LIST_HANG: 14,           // bullet glyph sits this far left of the text

  MARGIN_TOP: 36, MARGIN_BOTTOM: 36,   // pt (0.5")
  MARGIN_LEFT: 43, MARGIN_RIGHT: 43,   // pt (0.6")

  UNWRAP_PASSAGE_TABLES: true,
  UNWRAP_MIN_CHARS: 150,

  PRESERVE_FONTS: ['Caveat'],   // never touch these runs
};


function normalizeFormatting() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var rep = { paras: 0, lists: 0, headers: 0, unwrapped: 0 };

  if (!CONFIG.DRY_RUN) {
    body.setMarginTop(CONFIG.MARGIN_TOP);
    body.setMarginBottom(CONFIG.MARGIN_BOTTOM);
    body.setMarginLeft(CONFIG.MARGIN_LEFT);
    body.setMarginRight(CONFIG.MARGIN_RIGHT);
  }

  if (CONFIG.UNWRAP_PASSAGE_TABLES) unwrapPassageTables_(body, rep);

  // 1) Lesson header tables get their exact look
  var tables = body.getTables();
  for (var t = 0; t < tables.length; t++) {
    if (isLessonHeader_(tables[t])) { styleLessonHeader_(tables[t]); rep.headers++; }
    else fixTableText_(tables[t], rep);
  }

  // 2) Body paragraphs + list items
  var n = body.getNumChildren();
  for (var i = 0; i < n; i++) {
    var el = body.getChild(i);
    var type = el.getType();
    if (type === DocumentApp.ElementType.PARAGRAPH) {
      styleBodyPara_(el.asParagraph(), rep, false);
    } else if (type === DocumentApp.ElementType.LIST_ITEM) {
      styleListItem_(el.asListItem(), rep);
    }
  }

  Logger.log('headers styled: %s  paragraphs: %s  list items: %s  unwrapped: %s%s',
    rep.headers, rep.paras, rep.lists, rep.unwrapped,
    CONFIG.DRY_RUN ? '  (DRY RUN)' : '');
  try {
    DocumentApp.getUi().alert('Done!\nHeader tables styled: ' + rep.headers +
      '\nParagraphs: ' + rep.paras + '\nList items: ' + rep.lists +
      (CONFIG.DRY_RUN ? '\n(DRY RUN — nothing changed)' : ''));
  } catch (e) {}
}


// ---------------------------------------------------------------- helpers

function hasPreservedFont_(t, len) {
  for (var i = 0; i < len; i++) {
    if (CONFIG.PRESERVE_FONTS.indexOf(t.getFontFamily(i)) !== -1) return true;
  }
  return false;
}

/** A "lesson header" table: first cell starts with "Lesson " and the table
 *  has 1-2 columns in its first row. */
function isLessonHeader_(tbl) {
  try {
    var first = tbl.getRow(0).getCell(0).getText().trim();
    return first.indexOf('Lesson') === 0 && tbl.getNumRows() <= 3;
  } catch (e) { return false; }
}

function styleLessonHeader_(tbl) {
  if (CONFIG.DRY_RUN) return;
  var row0 = tbl.getRow(0);
  // label cell — uniform blue bold italic underline (fixes broken runs)
  var label = row0.getCell(0);
  styleCellText_(label, CONFIG.HDR_LABEL_SIZE, true, true, true, CONFIG.HDR_BLUE,
                 DocumentApp.HorizontalAlignment.LEFT);
  // time cell (if present)
  if (row0.getNumCells() > 1) {
    styleCellText_(row0.getCell(1), CONFIG.HDR_TIME_SIZE, true, true, false, null,
                   DocumentApp.HorizontalAlignment.RIGHT);
  }
  // title row (second row, one cell): centered, bold, underline
  if (tbl.getNumRows() > 1) {
    styleCellText_(tbl.getRow(1).getCell(0), CONFIG.HDR_TITLE_SIZE, true, false, true,
                   null, DocumentApp.HorizontalAlignment.CENTER);
  }
}

function styleCellText_(cell, size, bold, italic, underline, color, align) {
  for (var k = 0; k < cell.getNumChildren(); k++) {
    var ch = cell.getChild(k);
    if (ch.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    var p = ch.asParagraph();
    var t = p.editAsText();
    var s = t.getText();
    if (s && s.length) {
      t.setFontFamily(CONFIG.BODY_FONT);
      t.setFontSize(size);
      t.setBold(bold); t.setItalic(italic); t.setUnderline(underline);
      if (color) t.setForegroundColor(color);
    }
    p.setAlignment(align);
    p.setLineSpacing(1.0); p.setSpacingAfter(0); p.setSpacingBefore(0);
  }
}

/** Text inside ordinary (non-header) tables: font + size only. */
function fixTableText_(tbl, rep) {
  for (var r = 0; r < tbl.getNumRows(); r++) {
    var row = tbl.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var cell = row.getCell(c);
      for (var k = 0; k < cell.getNumChildren(); k++) {
        var ch = cell.getChild(k);
        if (ch.getType() === DocumentApp.ElementType.PARAGRAPH) {
          styleBodyPara_(ch.asParagraph(), rep, true);
        } else if (ch.getType() === DocumentApp.ElementType.LIST_ITEM) {
          styleListItem_(ch.asListItem(), rep);
        }
      }
    }
  }
}

function styleBodyPara_(p, rep, inTable) {
  if (p.getHeading && p.getHeading() !== DocumentApp.ParagraphHeading.NORMAL) return;
  var t = p.editAsText();
  var s = t.getText();
  if (!s || !s.trim().length) return;
  if (hasPreservedFont_(t, s.length)) return;

  var i0 = 0; while (i0 < s.length && s[i0] === ' ') i0++;
  var isSubhead = t.isBold(i0) && s.trim().length <= CONFIG.SUBHEAD_MAX_CHARS;

  if (!CONFIG.DRY_RUN) {
    t.setFontFamily(CONFIG.BODY_FONT);
    t.setFontSize(isSubhead ? CONFIG.SUBHEAD_SIZE : CONFIG.BODY_SIZE);
    p.setLineSpacing(CONFIG.LINE_SPACING);
    p.setSpacingAfter(CONFIG.SPACE_AFTER_BODY);
    p.setSpacingBefore(isSubhead ? 6 : 0);
    if (!inTable) { p.setIndentStart(0); p.setIndentFirstLine(0); p.setIndentEnd(0); }
  }
  rep.paras++;
}

function styleListItem_(li, rep) {
  var t = li.editAsText();
  var s = t.getText();
  if (!s || !s.trim().length) return;
  if (hasPreservedFont_(t, s.length)) return;
  if (!CONFIG.DRY_RUN) {
    t.setFontFamily(CONFIG.BODY_FONT);
    t.setFontSize(CONFIG.BODY_SIZE);
    li.setLineSpacing(CONFIG.LINE_SPACING);
    li.setSpacingAfter(CONFIG.SPACE_AFTER_LIST);
    li.setSpacingBefore(0);
    var level = li.getNestingLevel() || 0;
    var start = CONFIG.LIST_INDENT + level * CONFIG.LIST_STEP;
    li.setIndentStart(start);
    li.setIndentFirstLine(start - CONFIG.LIST_HANG);
  }
  rep.lists++;
}

function unwrapPassageTables_(body, rep) {
  var tables = body.getTables();
  for (var i = tables.length - 1; i >= 0; i--) {
    var tbl = tables[i];
    if (tbl.getNumRows() !== 1) continue;
    if (tbl.getRow(0).getNumCells() !== 1) continue;
    if (isLessonHeader_(tbl)) continue;
    var cell = tbl.getCell(0, 0);
    if (cell.getText().replace(/\s/g, '').length < CONFIG.UNWRAP_MIN_CHARS) continue;
    if (!CONFIG.DRY_RUN) {
      var at = body.getChildIndex(tbl);
      for (var k = 0; k < cell.getNumChildren(); k++) {
        var ch = cell.getChild(k);
        var ty = ch.getType();
        if (ty === DocumentApp.ElementType.PARAGRAPH) body.insertParagraph(at++, ch.copy());
        else if (ty === DocumentApp.ElementType.LIST_ITEM) body.insertListItem(at++, ch.copy());
        else if (ty === DocumentApp.ElementType.TABLE) body.insertTable(at++, ch.copy());
      }
      body.removeChild(tbl);
    }
    rep.unwrapped++;
  }
}
