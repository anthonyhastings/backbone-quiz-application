'use strict';

// Loading dependencies.
import { Router } from 'backbone';
import eventBus from './eventBus';

/**
 * Defining routes and route logic.
 *
 * @type {Backbone.Router}
 */
let AppRouter = Router.extend({

    routes: {
        '': 'landing',
        'question/:index': 'question',
        'results': 'results'
    },

    landing: function() {
        eventBus.trigger(eventBus.eventKeys.CHANGE_VIEW, {
            viewKey: 'landing'
        });
    },

    question: function(index) {
        eventBus.trigger(eventBus.eventKeys.CHANGE_VIEW, {
            viewKey: 'question',
            recordIndex: index
        });
    },

    results: function() {
        eventBus.trigger(eventBus.eventKeys.CHANGE_VIEW, {
            viewKey: 'results'
        });
    }

});

export default new AppRouter();
