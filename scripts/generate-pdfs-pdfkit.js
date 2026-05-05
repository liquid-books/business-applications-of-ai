#!/usr/bin/env node
/**
 * generate-pdfs-pdfkit.js
 * Converts each chapter markdown to PDF using PDFKit (no browser needed).
 */

const PDFDocument = require('pdfkit');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const BOOK_DIR = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.join(BOOK_DIR, 'chapters');
const PDF_DIR = path.join(BOOK_DIR, 'pdfs');

if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

const chapters = [
  { file: 'ch00-preface.md',            title: 'Preface — Why This Book Exists' },
  { file: 'ch01-ai-disruption.md',      title: 'Module 1 — Introduction to AI Disruption' },
  { file: 'ch02-value-proposition.md',  title: 'Module 2 — Value Proposition' },
  { file: 'ch03-ideal-customer-profile.md', title: 'Module 3 — Ideal Customer Profile' },
  { file: 'ch04-unit-economics.md',     title: 'Module 4 — Unit Economics' },
  { file: 'ch05-pitch.md',              title: 'Module 5 — The Pitch' },
  { file: 'ch06-vibe-coding.md',        title: 'Module 6 — Vibe Coding' },
  { file: 'ch07-synthetic-employees.md','title': 'Module 7 — Synthetic Employees' },
  { file: 'ch08-martech.md',            title: 'Module 8 — MarTech & Vibe Marketing' },
  { file: 'ch09-information-tax.md',    title: 'Module 9 — The End of the Information Tax' },
  { file: 'appendices.md',              title: 'Appendices' },
];

// Colors
const DARK_BLUE = '#0f3460';
const MID_BLUE  = '#16213e';
const GRAY      = '#555555';
const LIGHT_BG  = '#f4f6fb';
const BLACK     = '#1a1a2e';

// Strip MyST directives and frontmatter from markdown
function cleanMd(md) {
  return md
    .replace(/^---[\s\S]*?---\n/m, '')          // frontmatter
    .replace(/:::\{[^}]*\}[\s\S]*?:::/g, '')     // MyST directives with content
    .replace(/^:::[^\n]*$/gm, '')                // bare ::: lines
    .replace(/^\{[^}]*\}[^\n]*$/gm, '')          // {label} etc
    .replace(/^:.*:.*$/gm, '')                   // :key: value lines
    .trim();
}

function addCoverPage(doc, chapterTitle) {
  const W = doc.page.width;
  const H = doc.page.height;

  // Dark background
  doc.rect(0, 0, W, H).fill(DARK_BLUE);

  // Accent bar
  doc.rect(0, H * 0.35, W, 4).fill('#a8d8ea');
  doc.rect(0, H * 0.65, W, 4).fill('#a8d8ea');

  // Book series label
  doc.fillColor('#a8d8ea')
     .fontSize(11)
     .font('Helvetica')
     .text('BUSINESS APPLICATIONS OF AI', 0, H * 0.25, {
       align: 'center',
       characterSpacing: 3,
     });

  // Chapter title
  doc.fillColor('white')
     .fontSize(28)
     .font('Helvetica-Bold')
     .text(chapterTitle, 60, H * 0.38, {
       align: 'center',
       width: W - 120,
     });

  // Institution
  doc.fillColor('#a8d8ea')
     .fontSize(10)
     .font('Helvetica')
     .text('Palm Beach Atlantic University · Graduate Program', 0, H * 0.70, {
       align: 'center',
       characterSpacing: 1,
     });

  doc.addPage();
}

function renderTokens(doc, tokens, baseX, contentWidth) {
  for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const sizes  = [0, 22, 16, 13, 11, 10, 10];
        const colors = [null, DARK_BLUE, MID_BLUE, DARK_BLUE, BLACK, BLACK, BLACK];
        const fonts  = [null, 'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica-Bold', 'Helvetica'];
        const sz = sizes[token.depth] || 11;
        const col = colors[token.depth] || BLACK;
        const fnt = fonts[token.depth] || 'Helvetica-Bold';

        if (doc.y > doc.page.height - 150) doc.addPage();
        doc.moveDown(token.depth <= 2 ? 1 : 0.5);

        if (token.depth <= 2) {
          const y = doc.y;
          doc.rect(baseX, y + sz + 6, contentWidth, token.depth === 1 ? 2.5 : 1.5).fill(col);
        }

        doc.fillColor(col).fontSize(sz).font(fnt)
           .text(token.text, baseX, doc.y, { width: contentWidth });
        doc.moveDown(0.4);
        break;
      }

      case 'paragraph': {
        const text = token.text
          .replace(/\*\*(.+?)\*\*/g, '$1')
          .replace(/\*(.+?)\*/g, '$1')
          .replace(/`(.+?)`/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/\n/g, ' ');
        doc.fillColor(BLACK).fontSize(10.5).font('Helvetica')
           .text(text, baseX, doc.y, { width: contentWidth, align: 'justify' });
        doc.moveDown(0.6);
        break;
      }

      case 'list': {
        for (const item of token.items) {
          const text = item.text
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\*(.+?)\*/g, '$1')
            .replace(/`(.+?)`/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\n/g, ' ');
          const indent = 20;
          const lineY = doc.y;
          // Bullet dot
          doc.fillColor(DARK_BLUE).fontSize(10.5).font('Helvetica-Bold')
             .text('•', baseX, lineY, { width: indent, lineBreak: false });
          // Item text — starts after bullet, full remaining width
          doc.fillColor(BLACK).font('Helvetica')
             .text(text, baseX + indent, lineY, { width: contentWidth - indent });
          doc.moveDown(0.2);
        }
        doc.moveDown(0.4);
        break;
      }

      case 'blockquote': {
        const text = token.text
          .replace(/\*\*(.+?)\*\*/g, '$1')
          .replace(/\*(.+?)\*/g, '$1');
        const qY = doc.y;
        doc.rect(baseX, qY, 3, 40).fill(DARK_BLUE); // will be overwritten but sets pos
        doc.fillColor(GRAY).fontSize(10).font('Helvetica-Oblique')
           .text(text, baseX + 14, qY, { width: contentWidth - 14 });
        const qH = doc.y - qY;
        doc.rect(baseX, qY, 3, qH).fill(DARK_BLUE);
        doc.moveDown(0.6);
        break;
      }

      case 'code': {
        const lines = token.text.split('\n');
        const codeH = lines.length * 13 + 24;
        if (doc.y + codeH > doc.page.height - doc.page.margins.bottom) doc.addPage();
        const cY = doc.y;
        doc.rect(baseX, cY, contentWidth, codeH).fill('#1a1a2e');
        doc.fillColor('#e8f0fe').fontSize(8.5).font('Courier')
           .text(token.text, baseX + 12, cY + 12, { width: contentWidth - 24 });
        doc.moveDown(0.8);
        break;
      }

      case 'table': {
        if (!token.header) break;
        const colCount = token.header.length;
        const colW = contentWidth / colCount;
        let tY = doc.y;

        if (tY + 60 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          tY = doc.y;
        }

        // Header row
        doc.rect(baseX, tY, contentWidth, 22).fill(DARK_BLUE);
        token.header.forEach((cell, i) => {
          doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
             .text(cell.text || cell, baseX + i * colW + 6, tY + 6, { width: colW - 12 });
        });
        tY += 22;

        // Data rows
        token.rows.forEach((row, ri) => {
          if (tY + 20 > doc.page.height - doc.page.margins.bottom) {
            doc.addPage();
            tY = doc.y;
          }
          if (ri % 2 === 0) doc.rect(baseX, tY, contentWidth, 20).fill('#f0f4ff');
          row.forEach((cell, i) => {
            const txt = typeof cell === 'string' ? cell : (cell.text || '');
            doc.fillColor(BLACK).fontSize(9).font('Helvetica')
               .text(txt.replace(/\*\*(.+?)\*\*/g, '$1'), baseX + i * colW + 6, tY + 5, { width: colW - 12 });
          });
          tY += 20;
        });

        doc.rect(baseX, doc.y, contentWidth, tY - doc.y).stroke('#c8d0e0');
        doc.y = tY;
        doc.moveDown(0.8);
        break;
      }

      case 'hr': {
        doc.moveDown(0.5);
        doc.rect(baseX, doc.y, contentWidth, 1).fill('#d0d8e8');
        doc.moveDown(0.8);
        break;
      }

      case 'space':
        doc.moveDown(0.3);
        break;

      default:
        // Try to render text if available
        if (token.text) {
          doc.fillColor(BLACK).fontSize(10.5).font('Helvetica')
             .text(token.text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1'), baseX, doc.y, { width: contentWidth });
          doc.moveDown(0.5);
        }
    }
  }
}

async function generatePdf(chapterFile, chapterTitle) {
  const mdPath = path.join(CHAPTERS_DIR, chapterFile);
  if (!fs.existsSync(mdPath)) {
    console.warn(`  SKIP (not found): ${chapterFile}`);
    return;
  }

  const rawMd = fs.readFileSync(mdPath, 'utf8');
  const md = cleanMd(rawMd);
  const tokens = marked.lexer(md);

  const pdfName = chapterFile.replace('.md', '.pdf');
  const pdfPath = path.join(PDF_DIR, pdfName);

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
    info: {
      Title: chapterTitle,
      Author: 'Business Applications of AI — PBA Graduate Program',
      Subject: 'Business Applications of AI',
    }
  });

  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  // Cover page
  addCoverPage(doc, chapterTitle);

  // Content
  const baseX = doc.page.margins.left;
  const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // Page number footer
  const totalPagesRef = doc.bufferedPageRange ? null : null;
  doc.on('pageAdded', () => {
    const pageNum = doc.bufferedPageRange ? doc.bufferedPageRange().start + doc.bufferedPageRange().count : '—';
  });

  renderTokens(doc, tokens, baseX, contentWidth);

  // Add page numbers retrospectively
  const range = doc.bufferedPageRange ? doc.bufferedPageRange() : null;

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function run() {
  console.log(`Generating PDFs → ${PDF_DIR}\n`);
  for (const ch of chapters) {
    process.stdout.write(`  ${ch.file} ... `);
    await generatePdf(ch.file, ch.title);
    console.log('✓');
  }
  console.log('\n✅ All PDFs generated.');
}

run().catch(err => { console.error(err); process.exit(1); });
