import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked for GitHub-style rendering
marked.setOptions({
    breaks: true,
    gfm: true,
});

// Set up the renderer for syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function({ text, lang, escaped }) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            const highlighted = hljs.highlight(text, { language: lang }).value;
            return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
        } catch (err) {
            console.error('Highlight error:', err);
        }
    }
    const escapedText = escaped ? text : text.replace(/[&<>"']/g, (match) => {
        const escapeMap: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
    return `<pre><code>${escapedText}</code></pre>`;
};

// GitHub-style CSS for PDF (based on vscode-md-to-pdf)
const GITHUB_PDF_STYLES = `
<style>
* { box-sizing: border-box; }

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #24292f;
    background-color: #ffffff;
    max-width: 100%;
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}

h1 { font-size: 2em; padding-bottom: 0.3em; border-bottom: 1px solid #d0d7de; }
h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #d0d7de; }
h3 { font-size: 1.25em; }
h4 { font-size: 1em; }
h5 { font-size: 0.875em; }
h6 { font-size: 0.85em; color: #57606a; }

p { margin-top: 0; margin-bottom: 16px; }

code {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    font-size: 85%;
    padding: 0.2em 0.4em;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
}

pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
    margin-bottom: 16px;
}

pre code {
    display: inline;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    background-color: transparent;
    border: 0;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
    margin-bottom: 16px;
    width: 100%;
}

table th {
    font-weight: 600;
    padding: 6px 13px;
    border: 1px solid #d0d7de;
    background-color: #f6f8fa;
}

table td {
    padding: 6px 13px;
    border: 1px solid #d0d7de;
}

ul, ol {
    margin-top: 0;
    margin-bottom: 16px;
    padding-left: 2em;
}

li { margin-top: 0.25em; }

blockquote {
    margin: 0 0 16px 0;
    padding: 0 1em;
    color: #57606a;
    border-left: 0.25em solid #d0d7de;
}

a { color: #0969da; text-decoration: none; }
a:hover { text-decoration: underline; }

img { max-width: 100%; }

hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #d0d7de;
    border: 0;
}

/* Syntax highlighting */
.hljs { background: #f6f8fa; color: #24292f; }
.hljs-keyword { color: #cf222e; }
.hljs-string { color: #0a3069; }
.hljs-comment { color: #6e7781; }
.hljs-number { color: #0550ae; }
.hljs-title { color: #8250df; }
.hljs-function { color: #8250df; }
.hljs-params { color: #24292f; }

.markdown-body {
    padding: 40px;
}
</style>
`;

export async function exportToPdf() {
    // Detect current file type from URL
    const path = window.location.pathname;
    const fileType = path.substring(1) || 'json'; // Remove leading slash

    if (fileType === 'markdown') {
        await exportMarkdownToPdf();
    } else {
        await exportViewerToPdf();
    }
}

// Markdown-specific PDF export with proper page breaks
async function exportMarkdownToPdf() {
    console.log('🎨 Using Markdown-to-PDF export with GitHub styling');

    // Get the markdown content from the editor
    const editorElement = document.querySelector('.monaco-editor');
    if (!editorElement) {
        console.error('Editor not found');
        return;
    }

    // Get the Monaco editor instance
    const monacoWindow = window as { monaco?: { editor?: { getModels?: () => Array<{ getValue?: () => string }> } } };
    const models = monacoWindow.monaco?.editor?.getModels?.();
    const editor = models?.[0];
    const markdownContent = editor?.getValue?.() || '';

    if (!markdownContent) {
        console.error('No markdown content found');
        return;
    }

    try {
        // Convert markdown to HTML
        const htmlContent = marked(markdownContent, { renderer });

        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '180mm'; // A4 width minus margins
        tempContainer.style.backgroundColor = '#ffffff';
        tempContainer.innerHTML = `
            ${GITHUB_PDF_STYLES}
            <div class="markdown-body">
                ${htmlContent}
            </div>
        `;

        document.body.appendChild(tempContainer);

        // Wait a bit for styles to apply
        await new Promise(resolve => setTimeout(resolve, 200));

        // Create canvas from the rendered markdown
        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });

        // Remove temporary container
        document.body.removeChild(tempContainer);

        // A4 dimensions in mm
        const a4Width = 210;
        const a4Height = 297;
        const margin = 15;
        const contentWidth = a4Width - (2 * margin);

        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Calculate dimensions
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        const pageContentHeight = a4Height - (2 * margin);

        // Calculate how many pages we need
        const totalPages = Math.ceil(imgHeight / pageContentHeight);

        // Calculate the scale factor between canvas pixels and PDF mm
        const pxToMm = contentWidth / canvas.width;
        const pageHeightPx = pageContentHeight / pxToMm;

        // Add pages by cropping the canvas
        for (let pageNum = 0; pageNum < totalPages; pageNum++) {
            if (pageNum > 0) {
                pdf.addPage();
            }

            // Calculate the source rectangle in the canvas
            const sourceY = pageNum * pageHeightPx;
            const sourceHeight = Math.min(pageHeightPx, canvas.height - sourceY);

            // Create a temporary canvas for this page
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = sourceHeight;

            const pageCtx = pageCanvas.getContext('2d');
            if (pageCtx) {
                // Draw the relevant portion of the original canvas
                pageCtx.drawImage(
                    canvas,
                    0, sourceY,  // source x, y
                    canvas.width, sourceHeight,  // source width, height
                    0, 0,  // dest x, y
                    canvas.width, sourceHeight  // dest width, height
                );

                // Convert this page's canvas to image
                const pageImgData = pageCanvas.toDataURL('image/png');
                const pageImgHeight = (sourceHeight * contentWidth) / canvas.width;

                // Add to PDF
                pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeight);
            }
        }

        pdf.save('document.pdf');
        console.log('✅ PDF exported successfully');
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
}

// Viewer-based PDF export for other formats (JSON, YAML, XML, CSV)
async function exportViewerToPdf() {
    console.log('📄 Using viewer-based PDF export');
    const element = document.getElementById('viewer-container');
    if (!element) return;

    try {
        // Store original styles
        const originalOverflow = element.style.overflow;
        const originalHeight = element.style.height;

        // Temporarily remove scrolling constraints to capture full content
        element.style.overflow = 'visible';
        element.style.height = 'auto';

        // Create canvas from the entire viewer content
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#1f2937',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        // Restore original styles
        element.style.overflow = originalOverflow;
        element.style.height = originalHeight;

        // A4 dimensions in mm
        const a4Width = 210;
        const a4Height = 297;

        // Create PDF with A4 size
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Calculate dimensions to fit content on A4 (no margins)
        const imgWidth = a4Width;
        const imgHeight = (canvas.height * a4Width) / canvas.width;

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png');

        // If content fits on one page
        if (imgHeight <= a4Height) {
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
            // Split content across multiple pages
            let heightLeft = imgHeight;
            let pageNumber = 0;

            while (heightLeft > 0) {
                if (pageNumber > 0) {
                    pdf.addPage();
                }

                const yPosition = -(pageNumber * a4Height);
                pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);

                heightLeft -= a4Height;
                pageNumber++;
            }
        }

        pdf.save('document.pdf');
        console.log('✅ PDF exported successfully');
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
}

export async function exportToImage(elementId: string, fileName: string) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#1e1e1e',
        });

        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Export failed:', error);
    }
}
