export const JSON_SAMPLE = `{
  "project": "JsonFormatStudio",
  "version": "1.0.0",
  "description": "Professional JSON Editor & Data Format Viewer",
  "features": [
    "JSON Editor & Validator",
    "YAML Parser & Viewer", 
    "XML Parser & Formatter",
    "CSV Data Viewer",
    "Markdown Renderer",
    "Syntax Highlighting",
    "Tree View Visualization",
    "Export to PDF/Image",
    "Privacy-First Design"
  ],
  "settings": {
    "theme": "dark",
    "fontSize": 14,
    "autoSave": true,
    "treeView": true,
    "syntaxHighlighting": true
  },
  "developers": [
    {
      "name": "JsonFormatStudio Team",
      "role": "Full-Stack Development",
      "focus": "Developer Tools"
    }
  ],
  "keywords": [
    "json editor",
    "yaml viewer", 
    "xml parser",
    "csv formatter",
    "developer tools"
  ]
}`;

export const YAML_SAMPLE = `name: JsonFormatStudio
version: 1.0.0
description: Professional JSON Editor, YAML Viewer, XML Parser & CSV Formatter
keywords:
  - json editor
  - yaml viewer
  - xml parser
  - csv formatter
  - developer tools
dependencies:
  react: ^19.2.0
  monaco-editor: ^4.7.0
  tailwindcss: ^3.4.17
  vite: ^7.2.4
features:
  - JSON Editor with validation
  - YAML parsing and formatting
  - XML structure visualization
  - CSV data tables
  - Markdown rendering
  - Export capabilities
scripts:
  dev: vite
  build: tsc -b && vite build
  lint: eslint .
environment:
  NODE_ENV: development
  PORT: 5173
`;

export const XML_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<jsonFormatStudio>
  <project>
    <name>JsonFormatStudio</name>
    <version>1.0.0</version>
    <description>Professional Data Format Tools</description>
  </project>
  <tools>
    <tool id="json">
      <name>JSON Editor & Validator</name>
      <features>
        <feature>Syntax highlighting</feature>
        <feature>Tree view visualization</feature>
        <feature>Real-time validation</feature>
      </features>
      <category>Data Editing</category>
    </tool>
    <tool id="yaml">
      <name>YAML Parser & Viewer</name>
      <features>
        <feature>Format validation</feature>
        <feature>Error detection</feature>
      </features>
      <category>Configuration</category>
    </tool>
    <tool id="xml">
      <name>XML Parser & Formatter</name>
      <features>
        <feature>Structure visualization</feature>
        <feature>Pretty printing</feature>
      </features>
      <category>Markup Language</category>
    </tool>
  </tools>
  <keywords>json editor, yaml viewer, xml parser, csv formatter, developer tools</keywords>
</jsonFormatStudio>`;

export const CSV_SAMPLE = `tool,name,category,features,developer_friendly
JSON,JSON Editor & Validator,Data Editing,"Syntax highlighting, Tree view, Validation",Yes
YAML,YAML Parser & Viewer,Configuration,"Format validation, Error detection",Yes
XML,XML Parser & Formatter,Markup Language,"Structure visualization, Pretty printing",Yes
CSV,CSV Data Viewer,Data Analysis,"Table view, Export options",Yes
Markdown,Markdown Renderer,Documentation,"Live preview, GitHub-flavored support",Yes
JsonFormatStudio,Professional Data Format Tools,Developer Tools,"Multi-format support, Privacy-first",Yes
`;

export const MARKDOWN_SAMPLE = `# JsonFormatStudio

Welcome to **JsonFormatStudio** - the professional data format editor and visualization tool for developers! This markdown demonstrates our advanced rendering capabilities.

## Professional Data Format Tools

- **JSON Editor & Validator** with syntax highlighting
- **YAML Parser & Viewer** with real-time validation  
- **XML Parser & Formatter** with structure visualization
- **CSV Data Viewer** with table formatting
- [JsonFormatStudio](https://jsonformatstudio.com) - Professional developer tools
- \`Inline code\` highlighting and formatting

> "The best tools are invisible - they just work." – JsonFormatStudio Team

## Code Examples

\`\`\`javascript
// JSON validation example
function validateJson(data) {
  try {
    JSON.parse(data);
    return { valid: true, message: "Valid JSON" };
  } catch (error) {
    return { valid: false, message: error.message };
  }
}

console.log(validateJson('{"project": "JsonFormatStudio"}'));
\`\`\`

## Feature Comparison

| Tool | Format | Validation | Tree View | Export |
| :--- | :---: | :---: | :---: | ---: |
| JSON Editor | ✅ | ✅ | ✅ | ✅ |
| YAML Viewer | ✅ | ✅ | ✅ | ✅ |
| XML Parser | ✅ | ✅ | ✅ | ✅ |
| CSV Formatter | ✅ | ✅ | 📊 | ✅ |
| Markdown Renderer | ✅ | ✅ | 📝 | ✅ |

## Development Roadmap

1. **Core Features** ✅
   - Multi-format support
   - Real-time validation
   - Syntax highlighting
2. **Advanced Features** ✅
   - Tree view visualization
   - Export capabilities  
   - Privacy-first design
3. **Future Enhancements**
   - [ ] Plugin system
   - [ ] Collaborative editing
   - [ ] Advanced themes

## JsonFormatStudio Logo

\`\`\`
     ██╗███████╗ ██████╗ ███╗   ██╗
     ██║██╔════╝██╔═══██╗████╗  ██║
     ██║███████╗██║   ██║██╔██╗ ██║
██   ██║╚════██║██║   ██║██║╚██╗██║
╚█████╔╝███████║╚██████╔╝██║ ╚████║
 ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
    Professional Data Format Tools
\`\`\`

**Built for developers, by developers.** 🚀
`;

export const TOON_SAMPLE = `project: JsonFormatStudio
version: 1.0.0
description: Professional JSON Editor & Data Format Viewer

features[9]{name,category}:
  JSON Editor & Validator,Data Editing
  YAML Parser & Viewer,Configuration
  XML Parser & Formatter,Markup Language
  CSV Data Viewer,Data Analysis
  Markdown Renderer,Documentation
  Syntax Highlighting,Core Feature
  Tree View Visualization,Core Feature
  Export to PDF/Image,Export
  Privacy-First Design,Architecture

settings:
  theme: dark
  fontSize: 14
  autoSave: true
  treeView: true
  syntaxHighlighting: true

developers[1]{name,role,focus}:
  JsonFormatStudio Team,Full-Stack Development,Developer Tools

keywords[5]: json editor,yaml viewer,xml parser,csv formatter,developer tools

stats:
  totalUsers: 1500
  isActive: true
  lastUpdate: null
  rating: 4.8`;
