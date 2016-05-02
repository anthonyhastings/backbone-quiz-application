'use strict';

// Loading dependencies.
import Backbone from 'backbone';
import dataStore from '../utils/dataStore.js';
import eventBus from '../utils/eventBus.js';
import router from '../utils/router.js';
import LandingView from './LandingView.js';
import QuestionView from './QuestionView.js';
import ResultsView from './ResultsView.js';

export default Backbone.View.extend({

    /**
     * Point to an existing DOM element rather than creating one.
     *
     * @type {String}
     */
    el: '.js-app-container',

    /**
     * A mapping of route strings to view constructors.
     *
     * @type {Object}
     */
    routeToViewMap: {
        landing: LandingView,
        question: QuestionView,
        results: ResultsView
    },

    /**
     * A reference to the currently active view.
     *
     * @type {Backbone.View}
     */
    currentView: null,

    /**
     * Binding event listeners and kick-starting the router.
     */
    initialize: function() {
        this.listenTo(eventBus, eventBus.eventKeys.CHANGE_VIEW, this.onChangeView);
        this.listenTo(eventBus, eventBus.eventKeys.QUESTION_ANSWERED, this.onQuestionAnswered);
        this.listenTo(eventBus, eventBus.eventKeys.RESTART, this.onRestart);
        Backbone.history.start({pushState: true});
    },

    /**
     * Whenever a question is answered the application is either
     * moved onto the next question or the results screen.
     */
    onQuestionAnswered: function() {
        let nextQuestionIndex = dataStore.currentQuestionIndex + 1;
        let nextQuestionModel = dataStore.quiz.get('questions').at(nextQuestionIndex);

        if (nextQuestionModel) {
            dataStore.currentQuestionIndex = nextQuestionIndex;
            router.navigate(`question/${nextQuestionIndex}`, {trigger: true});
        } else {
            router.navigate('results', {trigger: true});
        }
    },

    /**
     * Restarts the application by resetting the relevant
     * dataStore variables and navigate to the router.
     */
    onRestart: function() {
        dataStore.userAnswers = {};
        dataStore.currentQuestionIndex = 0;
        router.navigate('', {trigger: true});
    },

    /**
     * Instantiates the relevant view constructor, passing in any
     * required models, then hands it off to another method for
     * transitioning.
     *
     * @param {Object} routeData - Data about views and models.
     */
    onChangeView: function(routeData) {
        let instantiatedView = null;
        let ViewConstructor = this.routeToViewMap[routeData.viewKey];

        if (routeData.viewKey === 'question') {
            dataStore.currentQuestionIndex = parseInt(routeData.recordIndex, 10);
            instantiatedView = new ViewConstructor({
                model: dataStore.quiz.get('questions').at(dataStore.currentQuestionIndex)
            });
        } else {
            instantiatedView = new ViewConstructor();
        }

        this.transitionViews(instantiatedView);
    },

    /**
     * Transitions out any current view then dispose of it. Afterwards the
     * new view is then rendered, injected to the DOM and transitioned in.
     *
     * @param {Backbone.View} newView
     */
    transitionViews: function(newView) {
        let currentViewDisposed = new Promise((resolve) => {
            if (this.currentView) {
                this.currentView.animateOut().then(() => {
                    this.currentView.dispose();
                    this.currentView = null;
                    resolve();
                });
            } else {
                resolve();
            }
        });

        currentViewDisposed.then(() => {
            this.currentView = newView;
            this.$el.html(this.currentView.render().el);
            this.currentView.animateIn();
        });
    }

});
