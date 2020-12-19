import './array';
import twitter from 'twitter-text';
import PDFJSAnnotate from 'pdf-annotate';
import initColorPicker from './initColorPicker';
import { resizeListen, resizeUnlisten } from 'dom-resize';
import UI from './UI';

//const UI = PDFJSAnnotate.UI;
const documentId = resourceId;
const documentUrl = pdfUrl;

const pdfWrapperId = 'pdf-view-wrapper';
const pdfViewId = 'pdf-view';

const TIMEOUT = 300;
const pdfWrapper = document.getElementById(pdfWrapperId);
let pdfWrapperWidth = pdfWrapper.offsetWidth;

let timer;
let PAGE_HEIGHT;
let RENDER_OPTIONS = {
    documentId: documentId,
    pdfUrl: documentUrl,
    pdfDocument: null,
    scale: 1,
    rotate: 0
};
let currentPageNum = 1;

PDFJSAnnotate.setStoreAdapter(new PDFJSAnnotate.LocalStoreAdapter());
PDFJS.workerSrc = '/build/old/pdf.worker.js';

// Render stuff
let NUM_PAGES = 0;
let okToRender = false;
let renderedPages = [];

if (document.getElementById('pdf-editor-save')) {
    document.getElementById('pdf-editor-save').addEventListener('click', function (ev) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl + 'views/' + documentId + '/annotations', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(localStorage.getItem(RENDER_OPTIONS.documentId+'/annotations'));
    });
}

pdfWrapper.addEventListener('scroll', openCurrentPage);

function openCurrentPage(e) {
    if (0 === NUM_PAGES) {
        return;
    }
    let visiblePageNum = Math.round(e.target.scrollTop / PAGE_HEIGHT) + 1;
    if (currentPageNum === visiblePageNum) {
        return;
    }

    let visiblePage = document.querySelector('.page[data-page-number="'+visiblePageNum+'"][data-loaded="false"]');
    currentPageNum = visiblePageNum;

    let okToRender = false;
    if (renderedPages.indexOf(visiblePageNum) === -1) {
        okToRender = true;
        renderedPages.push(visiblePageNum);
    }

    if (visiblePage && okToRender) {
        renderPdfByPageNum(visiblePageNum, false);
    }
}

function render() {
    PDFJS.getDocument(RENDER_OPTIONS.pdfUrl).then(renderPdf);
}

function renderPdf(pdf) {
    RENDER_OPTIONS.pdfDocument = pdf;

    let viewer = document.getElementById(pdfViewId);
    viewer.innerHTML = '';
    NUM_PAGES = pdf.pdfInfo.numPages;
    for (let i=1; i <= NUM_PAGES; i++) {
        let page = UI.createPage(i);
        viewer.appendChild(page);
        renderPdfByPageNum(i, false);
    }
}

function renderPdfByPageNum(pageNum, isNeedToScroll) {
    let pdf = RENDER_OPTIONS.pdfDocument;

    pdf.getPage(pageNum).then(function (page) {
        RENDER_OPTIONS.scale = (pdfWrapper.offsetWidth / page.getViewport(1).width)*0.9;

        if (renderedPages.indexOf(pageNum) !== -1) {
            if (isNeedToScroll) {
                document.querySelector('.page[data-page-number="'+pageNum+'"][data-loaded="true"]').scrollIntoView(true);
            }
            return;
        }
        renderedPages.push(pageNum);

        UI.renderPage(pageNum, RENDER_OPTIONS).then(function (params) {
            let pdfPage = params[0];
            pdfWrapperWidth = pdfWrapper.offsetWidth;
            let viewport = pdfPage.getViewport(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate);
            PAGE_HEIGHT = viewport.height;

            if (isNeedToScroll) {
                document.querySelector('.page[data-page-number="'+pageNum+'"][data-loaded="true"]').scrollIntoView(true);
            }
        });
    });
}

// Subscribe to resize event
resizeListen(pdfWrapper, function() {
    if (pdfWrapper.offsetWidth !== pdfWrapperWidth) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            window.dispatchEvent(new CustomEvent('renderpdf'));
        }, TIMEOUT);
    }
});

if (true === isLoadAnnotation) {
    //load annotations from server
    let xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + 'views/' + documentId + '/annotations', true);
    xhr.onload = function () {
        if (this.status == 200) {
            localStorage.setItem(RENDER_OPTIONS.documentId+'/annotations', (typeof this.response === 'string') ? this.response : JSON.stringify(this.response));
            render();
        }
    };
    xhr.send();

    if (document.getElementsByClassName('toolbar').length > 0) {
        // Text stuff
        (function () {
            let textSize;
            let textColor;

            function initText() {
                let size = document.querySelector('.toolbar .text-size');
                [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].forEach(function(s) {
                    size.appendChild(new Option(s, s));
                 });

                setText(
                    localStorage.getItem(RENDER_OPTIONS.documentId + '/text/size') || 10,
                    localStorage.getItem(RENDER_OPTIONS.documentId + '/text/color') || '#000000'
                );

                initColorPicker(document.querySelector('.text-color'), textColor, function (value) {
                    setText(textSize, value);
                });
            }

            function setText(size, color) {
                let modified = false;

                if (textSize !== size) {
                    modified = true;
                    textSize = size;
                    localStorage.setItem(RENDER_OPTIONS.documentId+'/text/size', textSize);
                    document.querySelector('.toolbar .text-size').value = textSize;
                }

                if (textColor !== color) {
                    modified = true;
                    textColor = color;
                    localStorage.setItem(RENDER_OPTIONS.documentId+'/text/color', textColor);

                    let selected = document.querySelector('.toolbar .text-color.color-selected');
                    if (selected) {
                        selected.classList.remove('color-selected');
                        selected.removeAttribute('aria-selected');
                    }

                    selected = document.querySelector('.toolbar .text-color[data-color="'+color+'"]');
                    if (selected) {
                        selected.classList.add('color-selected');
                        selected.setAttribute('aria-selected', true);
                    }
                }

                if (modified) {
                    UI.setText(textSize, textColor);
                }
            }

            function handleTextSizeChange(e) {
                setText(e.target.value, textColor);
            }

            document.querySelector('.toolbar .text-size').addEventListener('change', handleTextSizeChange);

            initText();
        })();

        // Pen stuff
        (function () {
            let penSize;
            let penColor;

            function initPen() {
                let size = document.querySelector('.toolbar .pen-size');
                for (let i = 0; i < 20; i++) {
                    size.appendChild(new Option(i + 1, i + 1));
                }

                setPen(
                    localStorage.getItem(RENDER_OPTIONS.documentId+'/pen/size') || 1,
                    localStorage.getItem(RENDER_OPTIONS.documentId +'/pen/color') || '#000000'
                );

                initColorPicker(document.querySelector('.pen-color'), penColor, function (value) {
                    setPen(penSize, value);
                });
            }

            function setPen(size, color) {
                let modified = false;

                if (penSize !== size) {
                    modified = true;
                    penSize = size;
                    localStorage.setItem(RENDER_OPTIONS.documentId+'/pen/size', penSize);
                    document.querySelector('.toolbar .pen-size').value = penSize;
                }

                if (penColor !== color) {
                    modified = true;
                    penColor = color;
                    localStorage.setItem(RENDER_OPTIONS.documentId+'/pen/color', penColor);

                    let selected = document.querySelector('.toolbar .pen-color.color-selected');
                    if (selected) {
                        selected.classList.remove('color-selected');
                        selected.removeAttribute('aria-selected');
                    }

                    selected = document.querySelector('.toolbar .pen-color[data-color="'+color+'"]');
                    if (selected) {
                        selected.classList.add('color-selected');
                        selected.setAttribute('aria-selected', true);
                    }
                }

                if (modified) {
                    UI.setPen(penSize, penColor);
                }
            }

            function handlePenSizeChange(e) {
                setPen(e.target.value, penColor);
            }

            document.querySelector('.toolbar .pen-size').addEventListener('change', handlePenSizeChange);

            initPen();
        })();

        // Toolbar buttons
        (function () {
            let tooltype = localStorage.getItem(RENDER_OPTIONS.documentId+'/tooltype') || 'cursor';
            if (tooltype) {
                setActiveToolbarItem(tooltype, document.querySelector('.toolbar button[data-tooltype='+tooltype+']'));
            }

            function setActiveToolbarItem(type, button) {
                let active = document.querySelector('.toolbar button.active');
                if (active) {
                    active.classList.remove('active');

                    switch (tooltype) {
                        case 'cursor':
                            UI.disableEdit();
                            break;
                        case 'draw':
                            UI.disablePen();
                            break;
                        case 'text':
                            UI.disableText();
                            break;
                        case 'point':
                            UI.disablePoint();
                            break;
                        case 'area':
                        case 'highlight':
                        case 'strikeout':
                        case 'underline':
                            UI.disableRect();
                            break;
                    }
                }

                if (button) {
                    button.classList.add('active');
                }
                if (tooltype !== type) {
                    localStorage.setItem(RENDER_OPTIONS.documentId+'/tooltype', type);
                }
                tooltype = type;

                switch (type) {
                    case 'cursor':
                        UI.enableEdit();
                        break;
                    case 'draw':
                        UI.enablePen();
                        break;
                    case 'text':
                        UI.enableText();
                        break;
                    case 'point':
                        UI.enablePoint();
                        break;
                    case 'area':
                    case 'highlight':
                    case 'strikeout':
                    case 'underline':
                        UI.enableRect(type);
                        break;
                }
            }

            function handleToolbarClick(e) {
                if (e.target.nodeName === 'BUTTON') {
                    setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
                }
            }

            document.querySelector('.toolbar').addEventListener('click', handleToolbarClick);
        })();

        // Clear toolbar button
        (function () {
            function handleClearClick(e) {
                if (confirm('Are you sure you want to clear annotations?')) {
                    for (let i = 0; i < NUM_PAGES; i++) {
                        document.querySelector('div#pageContainer'+(i + 1)+' svg.annotationLayer').innerHTML = '';
                    }

                    localStorage.removeItem(RENDER_OPTIONS.documentId+'/annotations');
                }
            }

            document.querySelector('a.clear').addEventListener('click', handleClearClick);
        })();
    }
} else {
    localStorage.setItem(RENDER_OPTIONS.documentId+'/annotations', '[]');
    render();
}

window.addEventListener('renderpdf', function (e) {
    renderedPages = [];
    if (RENDER_OPTIONS.pdfDocument) {
        renderPdf(RENDER_OPTIONS.pdfDocument);
    } else {
        render();
    }

    renderPdfByPageNum(currentPageNum, true);

    for (let i = 1; i <= currentPageNum; i++) {
        if (renderedPages.indexOf(i) !== -1) {
            renderPdfByPageNum(i, (i === currentPageNum));
        }
    }
});
