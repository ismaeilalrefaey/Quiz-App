const Model = require('../Model/Model');
const Cache = require('./Cache');

// ----------------------------------------- //
exports.addQuestion = async (req ,res) => {
    const {type ,question ,options ,answerId} = req.body;

    const instance = new Model.Question({
        type        : type,
        question    : question,
        options     : options,
        answerId    : answerId
    });

    instance.save()
        .then(() => {
            Cache.deleteData(type);
            return res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        });
}

// ----------------------------------------- //
exports.updateQuestion = async (req ,res) => {
    const {id ,type ,question ,options ,answerId} = req.body;

    Model.Question.findById(id)
        .then(async instance => {
            Cache.deleteData(type);
            Cache.deleteData(instance.type);

            instance.type        = type;
            instance.question    = question;
            instance.options     = options;
            instance.answerId    = answerId;

            await instance.save();
            return res.status(200).send(instance.fix());
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        });
}

// ----------------------------------------- //
exports.deleteQuestion = async (req ,res) => {
    const {id} = req.body;

    Model.Question
        .findByIdAndRemove(id)
        .then(question => {
            Cache.deleteData(question.type);
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500);
        });
}

// ----------------------------------------- //
exports.getAllQuestions = async (req ,res) => {
    const questions = await Model.Question.find();

    const response = [];
    for(let i in questions){
        response.push(await questions[i].fix());
    }

    return res.status(302).send(response);
}

// ----------------------------------------- //
exports.getOneQuestions = async (req ,res) => {
    const {id} = req.body;

    const question = await Model.Question.findById(id);

    return res.status(302).send(await question.fix());
}

