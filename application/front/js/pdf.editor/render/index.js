import PDFJSAnnotate from 'pdf-annotate';
import appendChild from './appendChild';
import renderScreenReaderHints from '../a11y/renderScreenReaderHints';

/**
 * Render the response from PDFJSAnnotate.getStoreAdapter().getAnnotations to SVG
 *
 * @param {SVGElement} svg The SVG element to render the annotations to
 * @param {Object} viewport The page viewport data
 * @param {Object} data The response from PDFJSAnnotate.getStoreAdapter().getAnnotations
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: SVGElement
 *    - rejected: Error
 */
export default function render(svg, viewport, data) {
  return new Promise((resolve, reject) => {
    // Reset the content of the SVG
    svg.innerHTML = ''; 
    svg.setAttribute('data-pdf-annotate-container', true);
    svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));
    svg.removeAttribute('data-pdf-annotate-document');
    svg.removeAttribute('data-pdf-annotate-page');

    // If there's no data nothing can be done
    if (!data) {
      return resolve(svg);
    }

    svg.setAttribute('data-pdf-annotate-document', data.documentId);
    svg.setAttribute('data-pdf-annotate-page', data.pageNumber);
    // Make sure annotations is an array
    if (!Array.isArray(data.annotations) || data.annotations.length === 0) {
      return resolve(svg);
    }

    // Append annotation to svg
    data.annotations.forEach((a) => {
      appendChild(svg, a, viewport);
    });

    resolve(svg);
  });
}
