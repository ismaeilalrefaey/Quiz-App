const express = require('express');

const Controller = require('../Controller/Controller');

const router = express.Router();

// ------------------------------------ //


router.post('/get_quiz' ,Controller.Cache.getData ,Controller.Applicant.getQuiz);
/*************************************
    Route: Get quiz to the applicant.
    Body Contains: {
        type: string,
        numberOfQuestions: int
    }
*************************************/

router.post('/get_result' ,Controller.Applicant.getResult);
/*************************************
    Route: Get the result of the quiz.
    Body Contains: {
        answers: list of int,
        questionsId: list of strings
    }
*************************************/

router.post('/new_applicant' ,Controller.Applicant.postNewApplicant ,Controller.Applicant.sendApprovalEmail);
/*************************************
    Route: Accepted applicant info.
    Body Contains: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    }
*************************************/


// ------------------------------------ //

module.exports = router;