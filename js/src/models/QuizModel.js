'use strict';

// Loading dependencies.
import { Model, Collection } from 'backbone';

export default Model.extend({

    /**
     * Creates the nested collection for questions inside of the quiz.
     *
     * @param {Object} rawData
     * @return {Object}
     */
    parse: function(rawData) {
        rawData.questions = new Collection(rawData.questions);
        return rawData;
    }

});
