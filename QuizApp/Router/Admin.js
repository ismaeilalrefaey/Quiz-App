const express = require('express');

const Controller = require('../Controller/Controller');

const router = express.Router();

// ------------------------------------ //


router.post('/question' ,Controller.Admin.addQuestion);
/******************************
    Route: Add new question.
    Body Contains: {
        type: string,
        question: string,
        options: list of strings,
        answerId: int
    }
******************************/

router.put('/question' ,Controller.Admin.updateQuestion);
/******************************
    Route: Update a question.
    Body Contains: {
        id: string,
        type: string,
        question: string,
        options: list of strings,
        answerId: int
    }
******************************/

router.delete('/question' ,Controller.Admin.deleteQuestion);
/******************************
    Route: Delete a question.
    Body Contains: {
        id: string
    }
******************************/

router.post('/get_one_question' ,Controller.Admin.getOneQuestions);
/******************************
    Route: Get one question.
    Body Contains: {
        id: string
    }
******************************/

router.get('/get_all_questions' ,Controller.Admin.getAllQuestions);
/******************************
    Route: Get all questions.
******************************/


// ------------------------------------ //

module.exports = router;