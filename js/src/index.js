'use strict';

// Loading dependencies.
import AppView from './views/AppView.js';

/**
 * Starts the application by instantiating our applications AppView.
 *
 * @return {Object}
 */
function onDOMContentLoaded() {
    return new AppView();
}

// Whenever the document has been loaded and parsed (or if it already has been), trigger onDOMContentLoaded logic.
if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
    onDOMContentLoaded();
} else {
    window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}
