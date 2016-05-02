'use strict';

// Loading dependencies.
import { View } from 'backbone';
import router from '../utils/router.js';
import dataStore from '../utils/dataStore.js';
import template from '../templates/landing.hbs';

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
        'click .js-proceed-btn': 'onProceedClick'
    },

    /**
     * Injects the compiled template into the views DOM element.
     *
     * @return {Backbone.View}
     */
    render: function() {
        this.$el.html(template({
            screenData: dataStore.quiz.get('screens').landing
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
     * Upon clicking proceed, navigate the application to the
     * first question.
     */
    onProceedClick: function() {
        router.navigate('question/0', {trigger: true});
    },

    /**
     * Removes the views element from the DOM and cancels out
     * any custom logic that won't automatically clean up.
     */
    dispose: function() {
        this.$el.remove();
    }

});
