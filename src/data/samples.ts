export const JSON_SAMPLE = `{
  "project": "Live Document Viewer",
  "version": "1.0.0",
  "features": [
    "Multi-format support",
    "Live editing",
    "Export to PDF/Image",
    "Local storage persistence"
  ],
  "settings": {
    "theme": "dark",
    "fontSize": 14,
    "autoSave": true
  },
  "contributors": [
    {
      "name": "Alice",
      "role": "Frontend"
    },
    {
      "name": "Bob",
      "role": "Design"
    }
  ]
}`;

export const YAML_SAMPLE = `name: Live Document Viewer
version: 1.0.0
description: A super pretty live document viewer and editor.
dependencies:
  react: ^18.2.0
  vite: ^5.0.0
  tailwindcss: ^3.4.0
scripts:
  dev: vite
  build: tsc && vite build
environment:
  NODE_ENV: development
  PORT: 3000
`;

export const XML_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1">
    <title>The Pragmatic Programmer</title>
    <author>Andrew Hunt</author>
    <author>David Thomas</author>
    <year>1999</year>
    <category>Programming</category>
  </book>
  <book id="2">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <year>2008</year>
    <category>Software Engineering</category>
  </book>
  <book id="3">
    <title>Design Patterns</title>
    <author>Erich Gamma</author>
    <author>Richard Helm</author>
    <author>Ralph Johnson</author>
    <author>John Vlissides</author>
    <year>1994</year>
    <category>Computer Science</category>
  </book>
</library>`;

export const CSV_SAMPLE = `id,name,role,department,status
1,John Doe,Developer,Engineering,Active
2,Jane Smith,Designer,Product,Active
3,Bob Johnson,Manager,Sales,On Leave
4,Alice Williams,Developer,Engineering,Active
5,Charlie Brown,Analyst,Marketing,Inactive
6,Diana Prince,Director,Operations,Active
`;

export const MARKDOWN_SAMPLE = `# Live Document Viewer

Welcome to the **Live Document Viewer**! This is a sample Markdown file to demonstrate the capabilities of the viewer.

## Features

- **Bold** and *Italic* text support
- [Links](https://github.com)
- \`Inline Code\`
- Blockquotes

> "Code is like humor. When you have to explain it, it’s bad." – Cory House

## Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Tables

| Feature | Status | Priority |
| :--- | :---: | ---: |
| JSON Support | ✅ | High |
| YAML Support | ✅ | High |
| XML Support | ✅ | Medium |
| CSV Support | ✅ | Medium |
| Markdown | ✅ | High |

## Lists

1. First item
2. Second item
   - Subitem A
   - Subitem B
3. Third item

## Task List

- [x] Create Project
- [x] Implement UI
- [ ] Add Persistence
- [ ] Deploy

## ASCII Art

\`\`\`
      /\\
     /  \\
    /____\\
   /\\    /\\
  /  \\  /  \\
 /____\\/____\\
\`\`\`
`;
