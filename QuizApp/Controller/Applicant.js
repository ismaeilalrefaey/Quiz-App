const shuffleArray = require('shuffle-array');
const nodeMailer   = require('nodemailer');

const Model = require('../Model/Model');
const Cache = require('./Cache');

// ----------------------------------- //

exports.getQuiz = async (req ,res) => {
    const {type ,numberOfQuestions} = req.body;

    const questions = await Model.Question.find({type: type});
    Cache.setData(type ,questions);

    shuffleArray(questions);

    const response = [];
    for(let i = 0 ; i < Math.min(questions.length ,numberOfQuestions) ; i++){
        response.push(await questions[i].fix());
    }

    return res.status(302).send(response);
}

// ---------------------------------- //

exports.getResult = async (req ,res) => {
    const {questionsId ,answers} = req.body;

    const questions = [];
    for(let i in questionsId){
        questions.push(await Model.Question.findById(questionsId[i]));
    }

    let cnt = 0;
    let total = questions.length;

    for(let i = 0 ; i < total ; i++){
        cnt += (questions[i].answerId === answers[i]);
    }

    let score = (100.0 * cnt) / total;

    if( score >= 60.0 ){
        // Accepted
        return res.sendStatus(202);

        // Here:
        //     frontEnd will redirect to page that ask the applicant
        //     for his information and the gmail account.
        //
        //     then the submit button will send the information to
        //     the backEnd and we will send him an email using gmail
        //     and save his Job Application.
    }
    else{
        // Rejected
        return res.sendStatus(400);
    }
}

// ------------------------------------------ //

exports.postNewApplicant = async (req ,res ,next) => {
    const {firstName ,lastName ,email ,phone} = req.body;

    const applicant = new Model.Applicant({
        firstName   : firstName,
        lastName    : lastName,
        email       : email,
        phone       : phone
    });

    await applicant.save();

    next();
}

// ------------------------------------------ //

exports.sendApprovalEmail = async (req ,res) => {
    const email = req.body.email;

    const transporter = await nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "applicants123321@gmail.com",
            pass: "12312345app"
        }
    });

    transporter.sendMail({
        from: "applicants123321@gmail.com",
        to: email,
        subject: "Accepted!!",
        text: "You got high score in the quiz, So you eligible to the next stage.\nPlease send your CV to this email amd wait our email.\n\nThank you Best regards."
    });

    return  res.sendStatus(201);
}