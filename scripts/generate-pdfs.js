#!/usr/bin/env node
/**
 * generate-pdfs.js
 * Converts each chapter markdown to a styled PDF using Puppeteer.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BOOK_DIR = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.join(BOOK_DIR, 'chapters');
const PDF_DIR = path.join(BOOK_DIR, 'pdfs');

if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

const chapters = [
  { file: 'ch00-preface.md',       title: 'Preface — Why This Book Exists' },
  { file: 'ch01-ai-disruption.md', title: 'Module 1 — Introduction to AI Disruption' },
  { file: 'ch02-value-proposition.md', title: 'Module 2 — Value Proposition' },
  { file: 'ch03-ideal-customer-profile.md', title: 'Module 3 — Ideal Customer Profile' },
  { file: 'ch04-unit-economics.md', title: 'Module 4 — Unit Economics' },
  { file: 'ch05-pitch.md',         title: 'Module 5 — The Pitch' },
  { file: 'ch06-vibe-coding.md',   title: 'Module 6 — Vibe Coding' },
  { file: 'ch07-synthetic-employees.md', title: 'Module 7 — Synthetic Employees' },
  { file: 'ch08-martech.md',       title: 'Module 8 — MarTech & Vibe Marketing' },
  { file: 'ch09-information-tax.md', title: 'Module 9 — The End of the Information Tax' },
  { file: 'appendices.md',         title: 'Appendices' },
];

function mdToHtml(md) {
  // Basic markdown → HTML conversion (headings, bold, italic, lists, code, blockquotes, tables, hr)
  let html = md
    // Strip MyST-specific directives (:::, :::{...}, frontmatter)
    .replace(/^---[\s\S]*?---\n/m, '')
    .replace(/:::\{[^}]*\}[\s\S]*?:::/g, '')
    .replace(/^:::\s*$/gm, '')
    // Fenced code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="${lang}">${code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headings
    .replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // HR
    .replace(/^---+$/gm, '<hr>')
    // Blockquotes
    .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Tables (basic)
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split('|').map(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    })
    .replace(/^[\|\-\s]+$/gm, '') // remove separator rows
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs — wrap lines that aren't already tags
    .split('\n')
    .map(line => {
      if (!line.trim()) return '<br>';
      if (/^<(h[1-6]|li|pre|blockquote|hr|tr|div)/.test(line.trim())) return line;
      return `<p>${line}</p>`;
    })
    .join('\n')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    // Wrap consecutive <tr> in <table>
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, m => `<table>${m}</table>`);

  return html;
}

function buildPage(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Merriweather', Georgia, serif;
    font-size: 11pt;
    line-height: 1.75;
    color: #1a1a2e;
    background: white;
    padding: 0;
  }

  .cover {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    color: white;
    text-align: center;
    padding: 60px;
  }

  .cover .book-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 14pt;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #a8d8ea;
    margin-bottom: 30px;
  }

  .cover h1 {
    font-size: 28pt;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 20px;
    color: white;
    border: none;
  }

  .cover .institution {
    font-family: 'Open Sans', sans-serif;
    font-size: 10pt;
    color: #a8d8ea;
    margin-top: 40px;
    letter-spacing: 1px;
  }

  .cover .divider {
    width: 80px;
    height: 3px;
    background: #a8d8ea;
    margin: 30px auto;
  }

  .content {
    max-width: 720px;
    margin: 0 auto;
    padding: 60px 60px;
  }

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-size: 22pt;
    font-weight: 700;
    color: #0f3460;
    margin-top: 48px;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 3px solid #0f3460;
    page-break-after: avoid;
  }

  h1:first-child { margin-top: 0; }

  h2 {
    font-family: 'Open Sans', sans-serif;
    font-size: 15pt;
    font-weight: 700;
    color: #16213e;
    margin-top: 36px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1.5px solid #d0d8e8;
    page-break-after: avoid;
  }

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-size: 12pt;
    font-weight: 600;
    color: #0f3460;
    margin-top: 28px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }

  h4, h5, h6 {
    font-family: 'Open Sans', sans-serif;
    font-size: 11pt;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  p {
    margin-bottom: 14px;
    orphans: 3;
    widows: 3;
  }

  ul, ol {
    margin: 14px 0 14px 28px;
  }

  li {
    margin-bottom: 6px;
  }

  blockquote {
    border-left: 4px solid #0f3460;
    background: #f0f4ff;
    margin: 20px 0;
    padding: 14px 20px;
    font-style: italic;
    color: #333;
    border-radius: 0 6px 6px 0;
  }

  code {
    font-family: 'Courier New', monospace;
    font-size: 9.5pt;
    background: #f4f6fb;
    padding: 2px 6px;
    border-radius: 3px;
    color: #0f3460;
  }

  pre {
    background: #1a1a2e;
    color: #e8f0fe;
    padding: 20px 24px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
    page-break-inside: avoid;
  }

  pre code {
    background: none;
    padding: 0;
    color: #e8f0fe;
    font-size: 9pt;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }

  td, th {
    border: 1px solid #c8d0e0;
    padding: 10px 14px;
    text-align: left;
  }

  tr:first-child td, th {
    background: #0f3460;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }

  tr:nth-child(even) td {
    background: #f4f6fb;
  }

  hr {
    border: none;
    border-top: 1.5px solid #d0d8e8;
    margin: 32px 0;
  }

  a { color: #0f3460; }

  strong { font-weight: 700; }

  @page {
    size: letter;
    margin: 1in 1in 1in 1in;
    @bottom-center {
      content: counter(page);
      font-family: 'Open Sans', sans-serif;
      font-size: 9pt;
      color: #888;
    }
  }

  @media print {
    .cover { min-height: 100vh; }
  }
</style>
</head>
<body>
  <div class="cover">
    <div class="book-title">Business Applications of AI</div>
    <div class="divider"></div>
    <h1>${title}</h1>
    <div class="divider"></div>
    <div class="institution">Palm Beach Atlantic University · Graduate Program</div>
  </div>
  <div class="content">
    ${bodyHtml}
  </div>
</body>
</html>`;
}

async function run() {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  for (const ch of chapters) {
    const mdPath = path.join(CHAPTERS_DIR, ch.file);
    if (!fs.existsSync(mdPath)) {
      console.warn(`  SKIP (not found): ${ch.file}`);
      continue;
    }
    console.log(`  Processing: ${ch.file}`);
    const md = fs.readFileSync(mdPath, 'utf8');
    const bodyHtml = mdToHtml(md);
    const pageHtml = buildPage(ch.title, bodyHtml);

    const page = await browser.newPage();
    await page.setContent(pageHtml, { waitUntil: 'networkidle0', timeout: 30000 });

    const pdfName = ch.file.replace('.md', '.pdf');
    const pdfPath = path.join(PDF_DIR, pdfName);
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '1in', bottom: '1in', left: '1in', right: '1in' }
    });
    await page.close();
    console.log(`  ✓ ${pdfName}`);
  }

  await browser.close();
  console.log('\nAll PDFs generated in:', PDF_DIR);
}

run().catch(err => { console.error(err); process.exit(1); });
