'use strict';

// Loading dependencies.
import QuizModel from '../models/QuizModel.js';

// Creating object to house data models.
let dataStore = {};

/**
 * Indicates the index of the current question.
 *
 * @type {Number}
 */
dataStore.currentQuestionIndex = 0;

/**
 * A mapping of Question IDs to Answer IDs.
 *
 * @type {Object}
 */
dataStore.userAnswers = {};

/**
 * Base data for the quiz.
 *
 * @type {Backbone.Model}
 */
dataStore.quiz = new QuizModel({
    screens: {
        landing: {
            title: 'Fake Quiz',
            description: 'Answer the questions and get to the end. Simples.',
            proceedButtonLabel: 'Start Quiz'
        },
        results: {
            title: 'TITLE',
            successDescription: 'SUCCESS DESCRIPTION',
            failDescription: 'FAIL DESCRIPTION',
            restartButtonLabel: 'RESTART BUTTON LABEL'
        }
    },
    questions: [
        {
            id: 'q01',
            question: 'Which of these is a superhero?',
            correctAnswer: 'q01a03',
            answers: [
                {id: 'q01a01', text: 'Jim Gordon'},
                {id: 'q01a02', text: 'Rick Grimes'},
                {id: 'q01a03', text: 'Matt Murdock'}
            ]
        },
        {
            id: 'q02',
            question: 'What show involves zombies?',
            correctAnswer: 'q02a02',
            answers: [
                {id: 'q02a01', text: 'Gotham'},
                {id: 'q02a02', text: 'Walking Dead'},
                {id: 'q02a03', text: 'Daredevil'}
            ]
        },
        {
            id: 'q03',
            question: 'Daredevil is a Netflix exclusive',
            correctAnswer: 'q03a01',
            answers: [
                {id: 'q03a01', text: 'True'},
                {id: 'q03a02', text: 'False'}
            ]
        }
    ]
}, {parse: true});

export default dataStore;
