const shuffleArray  = require('shuffle-array');
const redis         = require('redis');
const util          = require('util');

const keys  = require('../dev/keys');

// ------------------------------------ //

const client = redis.createClient(keys.REDIS_PORT);
client.get   = util.promisify(client.get);

// ------------------------------------ //

exports.getData = async (req ,res ,next) => {
    const {type ,numberOfQuestions} = req.body;

    const questions = await JSON.parse(await client.get(type));

    if( questions !== null ){
        shuffleArray(questions);

        const response = [];
        for(let i = 0 ; i < Math.min(questions.length ,numberOfQuestions) ; i++){
            questions[i].id = questions[i]._id;
            questions[i]._id = undefined;

            response.push(await questions[i]);
        }

        return res.status(302).send(response);
    }

    next();
}

// ------------------------------------ //

exports.setData = (key ,val) => {
    client.set(key ,JSON.stringify(val) ,'EX' ,60 * 60);
    // data wil expire after 1 hour
}

exports.deleteData = (key) => {
    client.del(key);
}
