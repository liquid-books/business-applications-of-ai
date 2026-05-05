#!/usr/bin/env node
/**
 * generate-pdfs-pdfkit.js
 * Converts each chapter markdown to PDF using PDFKit.
 *
 * Fixes applied:
 *  - Strip MyST {tab-item}, {tab-set}, {code-cell} and other non-mermaid code-fence directives
 *  - Heading underlines drawn AFTER text (prevents strikethrough on wrapping headings)
 *  - Table rows use dynamic height via doc.heightOfString()
 *  - List items: check page space BEFORE rendering bullet+text together
 *  - Links stripped in table cells
 *  - Mermaid: explicit doc.y advance after image placement
 */

const PDFDocument = require('pdfkit');
const { marked }  = require('marked');
const fs   = require('fs');
const path = require('path');
const https = require('https');
const zlib  = require('zlib');

const BOOK_DIR     = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.join(BOOK_DIR, 'chapters');
const PDF_DIR      = path.join(BOOK_DIR, 'pdfs');

if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

const chapters = [
  { file: 'ch00-preface.md',                title: 'Preface — Why This Book Exists' },
  { file: 'ch01-ai-disruption.md',           title: 'Module 1 — Introduction to AI Disruption' },
  { file: 'ch02-value-proposition.md',       title: 'Module 2 — Value Proposition' },
  { file: 'ch03-ideal-customer-profile.md',  title: 'Module 3 — Ideal Customer Profile' },
  { file: 'ch04-unit-economics.md',          title: 'Module 4 — Unit Economics' },
  { file: 'ch05-pitch.md',                   title: 'Module 5 — The Pitch' },
  { file: 'ch06-vibe-coding.md',             title: 'Module 6 — Vibe Coding' },
  { file: 'ch07-synthetic-employees.md',     title: 'Module 7 — Synthetic Employees' },
  { file: 'ch08-martech.md',                 title: 'Module 8 — MarTech & Vibe Marketing' },
  { file: 'ch09-information-tax.md',         title: 'Module 9 — The End of the Information Tax' },
  { file: 'appendices.md',                   title: 'Appendices' },
];

// ─── Colors ──────────────────────────────────────────────────────────────────
const DARK_BLUE = '#0f3460';
const MID_BLUE  = '#16213e';
const GRAY      = '#555555';
const BLACK     = '#1a1a2e';

// ─── Kroki mermaid render ─────────────────────────────────────────────────────
function renderMermaid(code) {
  return new Promise((resolve, reject) => {
    const deflated = zlib.deflateSync(Buffer.from(code, 'utf8'));
    const encoded  = deflated.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    https.get(`https://kroki.io/mermaid/png/${encoded}`, { headers: { Accept: 'image/png' } }, res => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`Kroki ${res.statusCode}`)); }
      const bufs = [];
      res.on('data', c => bufs.push(c));
      res.on('end',  () => resolve(Buffer.concat(bufs)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ─── Markdown cleanup ─────────────────────────────────────────────────────────
function cleanMd(md) {
  return md
    // Remove YAML frontmatter
    .replace(/^---[\s\S]*?---\n/m, '')
    // Convert MyST mermaid fence to standard
    .replace(/^```\{mermaid\}/gm, '```mermaid')
    // Remove ALL other MyST code-fence directives (tab-item, tab-set, code-cell, etc.)
    .replace(/^```\{[^}]+\}[^\n]*\n[\s\S]*?^```/gm, '')
    // Remove MyST ::: directives
    .replace(/:::\{[^}]*\}[\s\S]*?:::/g, '')
    .replace(/^:::[^\n]*$/gm, '')
    // Remove {label} references and :key: value pairs
    .replace(/^\{[^}]*\}[^\n]*$/gm, '')
    .replace(/^:[a-z_-]+:.*$/gm, '')
    .trim();
}

// ─── Strip inline markdown ────────────────────────────────────────────────────
function stripInline(txt) {
  return (txt || '')
    .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
    .replace(/\*\*(.+?)\*\*/g,     '$1')
    .replace(/\*(.+?)\*/g,         '$1')
    .replace(/__(.+?)__/g,         '$1')
    .replace(/_(.+?)_/g,           '$1')
    .replace(/`(.+?)`/g,           '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // strip links
    .replace(/\n/g, ' ')
    .trim();
}

// ─── Cover page ───────────────────────────────────────────────────────────────
function addCoverPage(doc, title) {
  const W = doc.page.width, H = doc.page.height;
  doc.rect(0, 0, W, H).fill(DARK_BLUE);
  doc.rect(0, H * 0.35, W, 4).fill('#a8d8ea');
  doc.rect(0, H * 0.65, W, 4).fill('#a8d8ea');
  doc.fillColor('#a8d8ea').fontSize(11).font('Helvetica')
     .text('BUSINESS APPLICATIONS OF AI', 0, H * 0.25, { align: 'center', characterSpacing: 3 });
  doc.fillColor('white').fontSize(26).font('Helvetica-Bold')
     .text(title, 60, H * 0.38, { align: 'center', width: W - 120 });
  doc.fillColor('#a8d8ea').fontSize(10).font('Helvetica')
     .text('Palm Beach Atlantic University · Graduate Program', 0, H * 0.70, { align: 'center', characterSpacing: 1 });
  doc.addPage();
}

// ─── Page boundary helper ─────────────────────────────────────────────────────
function ensureSpace(doc, needed) {
  const bottomMargin = doc.page.margins.bottom;
  if (doc.y + needed > doc.page.height - bottomMargin) doc.addPage();
}

// ─── Render token list ────────────────────────────────────────────────────────
async function renderTokens(doc, tokens, baseX, contentWidth) {
  const bottomMargin = doc.page.margins.bottom;

  for (const token of tokens) {
    switch (token.type) {

      // ── Headings ──────────────────────────────────────────────────────────
      case 'heading': {
        const sizes = [0, 22, 16, 13, 11, 10, 10];
        const cols  = [null, DARK_BLUE, MID_BLUE, DARK_BLUE, BLACK, BLACK, BLACK];
        const fonts = [null, 'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica-Bold',
                       'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica'];
        const sz  = sizes[token.depth] || 11;
        const col = cols[token.depth]  || BLACK;
        const fnt = fonts[token.depth] || 'Helvetica-Bold';

        ensureSpace(doc, sz * 3);
        doc.moveDown(token.depth <= 2 ? 1.2 : 0.7);

        // Render text FIRST
        doc.fillColor(col).fontSize(sz).font(fnt)
           .text(stripInline(token.text), baseX, doc.y, { width: contentWidth });

        // Draw underline AFTER text so it sits below wrapped lines
        if (token.depth <= 2) {
          const lineThick = token.depth === 1 ? 2.5 : 1.5;
          doc.rect(baseX, doc.y + 3, contentWidth, lineThick).fill(col);
          doc.moveDown(0.3);
        }
        doc.moveDown(0.4);
        break;
      }

      // ── Paragraph ─────────────────────────────────────────────────────────
      case 'paragraph': {
        const text = stripInline(token.text);
        ensureSpace(doc, 30);
        doc.fillColor(BLACK).fontSize(10.5).font('Helvetica')
           .text(text, baseX, doc.y, { width: contentWidth, align: 'justify' });
        doc.moveDown(0.6);
        break;
      }

      // ── Lists ─────────────────────────────────────────────────────────────
      case 'list': {
        for (const item of token.items) {
          const text   = stripInline(item.text);
          const indent = 20;
          const textW  = contentWidth - indent;
          // Estimate height needed for this item
          const estH = doc.heightOfString(text, { width: textW, fontSize: 10.5 }) + 8;
          ensureSpace(doc, estH);

          const lineY = doc.y;
          // Bullet — no lineBreak so it stays on same line
          doc.fillColor(DARK_BLUE).fontSize(10.5).font('Helvetica-Bold')
             .text('•', baseX, lineY, { width: indent, lineBreak: false });
          // Text
          doc.fillColor(BLACK).font('Helvetica')
             .text(text, baseX + indent, lineY, { width: textW });
          doc.moveDown(0.2);
        }
        doc.moveDown(0.4);
        break;
      }

      // ── Blockquote ────────────────────────────────────────────────────────
      case 'blockquote': {
        const text = stripInline(token.text);
        ensureSpace(doc, 60);
        const qY = doc.y;
        doc.fillColor(GRAY).fontSize(10).font('Helvetica-Oblique')
           .text(text, baseX + 14, qY, { width: contentWidth - 14 });
        const qH = doc.y - qY + 4;
        doc.rect(baseX, qY - 2, 3, qH).fill(DARK_BLUE);
        doc.moveDown(0.6);
        break;
      }

      // ── Code blocks ───────────────────────────────────────────────────────
      case 'code': {
        // Mermaid → Kroki
        if (token.lang && token.lang.toLowerCase() === 'mermaid') {
          try {
            process.stdout.write(' [mermaid]');
            const pngBuf = await renderMermaid(token.text);
            ensureSpace(doc, 180);
            const imgY    = doc.y;
            const imgDims = doc.openImage(pngBuf);
            const scale   = Math.min(contentWidth / imgDims.width, 300 / imgDims.height);
            const rendW   = imgDims.width  * scale;
            const rendH   = imgDims.height * scale;
            // Center horizontally
            const imgX = baseX + (contentWidth - rendW) / 2;
            doc.image(pngBuf, imgX, imgY, { width: rendW, height: rendH });
            doc.y = imgY + rendH + 20;
          } catch (err) {
            ensureSpace(doc, 40);
            doc.rect(baseX, doc.y, contentWidth, 36).fill('#fff3cd');
            doc.fillColor('#856404').fontSize(9).font('Helvetica')
               .text('[Diagram — view in online version]', baseX + 10, doc.y - 26, { width: contentWidth - 20 });
            doc.moveDown(0.8);
          }
          break;
        }

        // Regular code block — split across pages if needed
        const codeLines = token.text.split('\n');
        const lineH = 12;
        const pad   = 14;
        const maxLinesPerPage = Math.floor(
          (doc.page.height - doc.page.margins.top - doc.page.margins.bottom - pad * 2) / lineH
        );

        let lineIdx = 0;
        while (lineIdx < codeLines.length) {
          const available = Math.floor(
            (doc.page.height - doc.page.margins.bottom - doc.y - pad * 2) / lineH
          );
          const take  = Math.max(1, Math.min(available, codeLines.length - lineIdx));
          const chunk = codeLines.slice(lineIdx, lineIdx + take).join('\n');
          const chunkH = take * lineH + pad * 2;

          ensureSpace(doc, chunkH);
          const cY = doc.y;
          doc.rect(baseX, cY, contentWidth, chunkH).fill('#1a1a2e');
          doc.fillColor('#e8f0fe').fontSize(8.5).font('Courier')
             .text(chunk, baseX + pad, cY + pad, { width: contentWidth - pad * 2, lineBreak: true });
          doc.y = cY + chunkH + 4;

          lineIdx += take;
          if (lineIdx < codeLines.length) doc.addPage();
        }
        doc.moveDown(0.6);
        break;
      }

      // ── Tables ────────────────────────────────────────────────────────────
      case 'table': {
        if (!token.header || !token.header.length) break;

        const colCount = token.header.length;
        const colW     = contentWidth / colCount;
        const cellPad  = 8;
        const fontSize = 9;

        // Helper: clean cell text
        const cellText = c => stripInline(typeof c === 'string' ? c : (c && c.text) || '');

        // Helper: measure row height
        const rowHeight = (cells) => {
          let maxH = 0;
          cells.forEach((c, i) => {
            const h = doc.heightOfString(cellText(c), { width: colW - cellPad * 2, fontSize });
            if (h > maxH) maxH = h;
          });
          return maxH + cellPad * 2;
        };

        let tY = doc.y;
        ensureSpace(doc, 60);
        tY = doc.y;

        // Header row
        const hdrH = rowHeight(token.header);
        doc.rect(baseX, tY, contentWidth, hdrH).fill(DARK_BLUE);
        token.header.forEach((cell, i) => {
          doc.fillColor('white').fontSize(fontSize).font('Helvetica-Bold')
             .text(cellText(cell), baseX + i * colW + cellPad, tY + cellPad,
                   { width: colW - cellPad * 2 });
        });
        tY += hdrH;

        // Data rows
        token.rows.forEach((row, ri) => {
          const rH = rowHeight(row);
          if (tY + rH > doc.page.height - bottomMargin) {
            doc.addPage();
            tY = doc.y;
          }
          if (ri % 2 === 0) doc.rect(baseX, tY, contentWidth, rH).fill('#f0f4ff');
          // Border
          doc.rect(baseX, tY, contentWidth, rH).stroke('#c8d0e0');
          row.forEach((cell, i) => {
            doc.fillColor(BLACK).fontSize(fontSize).font('Helvetica')
               .text(cellText(cell), baseX + i * colW + cellPad, tY + cellPad,
                     { width: colW - cellPad * 2 });
          });
          tY += rH;
        });

        doc.y = tY;
        doc.moveDown(0.8);
        break;
      }

      // ── HR ────────────────────────────────────────────────────────────────
      case 'hr': {
        doc.moveDown(0.5);
        ensureSpace(doc, 10);
        doc.rect(baseX, doc.y, contentWidth, 1).fill('#d0d8e8');
        doc.moveDown(0.8);
        break;
      }

      case 'space':
        doc.moveDown(0.3);
        break;

      default:
        if (token.text) {
          const text = stripInline(token.text);
          ensureSpace(doc, 20);
          doc.fillColor(BLACK).fontSize(10.5).font('Helvetica')
             .text(text, baseX, doc.y, { width: contentWidth });
          doc.moveDown(0.5);
        }
    }
  }
}

// ─── Generate one PDF ─────────────────────────────────────────────────────────
async function generatePdf(chapterFile, chapterTitle) {
  const mdPath = path.join(CHAPTERS_DIR, chapterFile);
  if (!fs.existsSync(mdPath)) { console.warn(`  SKIP: ${chapterFile}`); return; }

  const md     = cleanMd(fs.readFileSync(mdPath, 'utf8'));
  const tokens = marked.lexer(md);

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
    info: { Title: chapterTitle, Author: 'Business Applications of AI — PBA Graduate Program' },
  });

  const pdfPath = path.join(PDF_DIR, chapterFile.replace('.md', '.pdf'));
  const stream  = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  addCoverPage(doc, chapterTitle);

  const baseX        = doc.page.margins.left;
  const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  await renderTokens(doc, tokens, baseX, contentWidth);

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error',  reject);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`Generating PDFs → ${PDF_DIR}\n`);
  for (const ch of chapters) {
    process.stdout.write(`  ${ch.file} ...`);
    await generatePdf(ch.file, ch.title);
    console.log(' ✓');
  }
  console.log('\n✅ All PDFs generated.');
}

run().catch(err => { console.error(err); process.exit(1); });
