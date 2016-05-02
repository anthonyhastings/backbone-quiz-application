'use strict';

// Loading dependencies.
import { View } from 'backbone';
import eventBus from '../utils/eventBus.js';
import dataStore from '../utils/dataStore.js';
import template from '../templates/results.hbs';

export default View.extend({

    /**
     * Class names to apply as an attribute to the
     * DOM element.
     *
     * @type {String}
     */
    className: 'page',

    /**
     * DOM Events mapping to logic methods.
     *
     * @type {Object}
     */
    events: {
        'click .js-restart-btn': 'onRestartClick'
    },

    /**
     * Checks the answers given to see if they are correct.
     *
     * @type {Boolean}
     */
    getQuizStatus: function() {
        let questionsCollection = dataStore.quiz.get('questions');
        let quizPassed = true;

        questionsCollection.each(function(model) {
            let userAnswerID = dataStore.userAnswers[model.id];
            let realAnswerID = model.get('correctAnswer');

            if (userAnswerID !== realAnswerID) {
                quizPassed = false;
            }
        });

        return quizPassed;
    },

    /**
     * Injects the compiled template into the views DOM element.
     *
     * @return {Backbone.View}
     */
    render: function() {
        this.$el.html(template({
            screenData: dataStore.quiz.get('screens').results,
            quizStatus: this.getQuizStatus()
        }));

        return this;
    },

    /**
     * Animates the view off screen.
     *
     * @return {Promise}
     */
    animateOut: function() {
        return new Promise((resolve) => {
            this.$el.one('transitionend', function() {
                resolve();
            });

            this.$el.addClass('transition-out');
        });
    },

    /**
     * Animates the view on screen.
     *
     * @return {Promise}
     */
    animateIn: function() {
        return new Promise((resolve) => {
            this.$el.one('transitionend', () => {
                resolve();
            });

            this.$el.addClass('transition-in');

            // Triggering a reflow to propagate style changes via classes.
            let transitionWorkaround = window.getComputedStyle(this.el).opacity;
            transitionWorkaround = null;

            this.$el.removeClass('transition-in');
        });
    },

    /**
     * The restart button will trigger an internal event
     * for restarting the application.
     */
    onRestartClick: function() {
        eventBus.trigger(eventBus.eventKeys.RESTART);
    },

    /**
     * Removes the views element from the DOM and cancels out
     * any custom logic that won't automatically clean up.
     */
    dispose: function() {
        this.$el.remove();
    }

});
