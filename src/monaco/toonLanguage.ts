// TOON language configuration
export const toonLanguageConfig = {
    comments: {
        lineComment: '#',
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    folding: {
        offSide: true
    }
};

// TOON Monarch tokenizer definition
export const toonMonarchLanguage = {
    tokenizer: {
        root: [
            // Comments
            [/#.*$/, 'comment'],
            
            // Array headers with count [N] and field definitions {fields} (multiline arrays) - MUST come before regular keys
            [/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\[)(\d+)(\])(\s*)(\{)([^}]*)(\})(\s*)(:)(\s*)$/, ['', 'array.key', 'array.bracket', 'array.count', 'array.bracket', '', 'array.brace', 'array.fields', 'array.brace', '', 'delimiter', '']],
            
            // Simple inline arrays with count [N]: values - MUST come before regular keys
            [/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\[)(\d+)(\])(\s*)(:)(\s*)(.+)$/, ['', 'array.key', 'array.bracket', 'array.count', 'array.bracket', '', 'delimiter', '', 'string']],
            
            // Array headers with count [N] only (multiline arrays) - MUST come before regular keys
            [/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\[)(\d+)(\])(\s*)(:)(\s*)$/, ['', 'array.key', 'array.bracket', 'array.count', 'array.bracket', '', 'delimiter', '']],
            
            // Regular key-value pairs - MUST come after array patterns
            [/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/, 'key'],
            
            // Strings (quoted)
            [/"([^"\\]|\\.)*"/, 'string'],
            [/'([^'\\]|\\.)*'/, 'string'],
            
            // Numbers
            [/-?\d+\.?\d*([eE][+-]?\d+)?/, 'number'],
            
            // Booleans
            [/\b(true|false)\b/, 'keyword'],
            
            // Null
            [/\bnull\b/, 'keyword'],
            
            // Field names in tabular format (within {})
            [/\{/, { token: 'delimiter.curly', bracket: '@open', next: '@fields' }],
            
            // Array brackets
            [/\[/, { token: 'delimiter.square', bracket: '@open' }],
            [/\]/, { token: 'delimiter.square', bracket: '@close' }],
            
            // Delimiters
            [/:/, 'delimiter'],
            [/,/, 'delimiter'],
            
            // Whitespace
            [/[ \t\r\n]+/, 'white'],
            
            // Unquoted strings (everything else)
            [/[^\s:,\[\]{}]+/, 'string.unquoted']
        ],
        
        fields: [
            [/[a-zA-Z_][a-zA-Z0-9_]*/, 'variable'],
            [/,/, 'delimiter'],
            [/\s+/, 'white'],
            [/\}/, { token: 'delimiter.curly', bracket: '@close', next: '@pop' }]
        ]
    }
};

// TOON theme definition
export const toonTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'key', foreground: '9CDCFE' }, // Light blue for regular keys
        { token: 'array.key', foreground: 'FF79C6' }, // Bright pink for array keys
        { token: 'array.bracket', foreground: 'F1FA8C' }, // Bright yellow for array brackets
        { token: 'array.brace', foreground: 'BD93F9' }, // Purple for curly braces
        { token: 'array.count', foreground: '50FA7B' }, // Bright green for array count
        { token: 'array.fields', foreground: '8BE9FD' }, // Cyan for field definitions
        { token: 'string', foreground: 'CE9178' }, // Orange for strings
        { token: 'string.unquoted', foreground: 'D4D4D4' }, // Light gray for unquoted strings
        { token: 'number', foreground: 'B5CEA8' }, // Light green for numbers
        { token: 'keyword', foreground: 'C586C0' }, // Purple for booleans/null
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' }, // Green for comments
        { token: 'delimiter', foreground: 'D4D4D4' }, // Light gray for delimiters
        { token: 'delimiter.curly', foreground: 'FFD700' }, // Gold for curly braces
        { token: 'delimiter.square', foreground: 'FFD700' }, // Gold for square brackets
        { token: 'variable', foreground: '4FC1FF' }, // Light blue for field names
        { token: 'type', foreground: '4EC9B0' } // Teal for type annotations
    ],
    colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4'
    }
};

// Function to register TOON language
export function registerToonLanguage(monaco: any) {
    // Check if TOON language is already registered
    const languages = monaco.languages.getLanguages();
    const toonExists = languages.some((lang: any) => lang.id === 'toon');
    
    if (!toonExists) {
        // Register the language
        monaco.languages.register({ id: 'toon' });
    }
    
    // Always set/update the language configuration
    monaco.languages.setLanguageConfiguration('toon', toonLanguageConfig);
    
    // Always set/update the tokens provider
    monaco.languages.setMonarchTokensProvider('toon', toonMonarchLanguage);
    
    // Always define/update the theme
    monaco.editor.defineTheme('toon-dark', toonTheme);
}