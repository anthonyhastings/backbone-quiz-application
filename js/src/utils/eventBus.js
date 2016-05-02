'use strict';

// Loading dependencies.
import _ from 'underscore';
import { Events } from 'backbone';

/**
 * Creating an event bus with internal application keys.
 *
 * @type {Backbone.Events}
 */
export default _.extend({}, Events, {

    eventKeys: {
        CHANGE_VIEW: 'app.changeView',
        QUESTION_ANSWERED: 'app.questionAnswered',
        RESTART: 'app.restart'
    }

});
