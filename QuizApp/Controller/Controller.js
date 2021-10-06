// One Controller Manages All Controllers Of The App "my way of typing a clear code :)".

const Applicant = require('./Applicant');
const Admin     = require('./Admin');
const Cache     = require('./Cache');

// ---------------------------------- //

module.exports = {
    Applicant   : Applicant,
    Admin       : Admin,
    Cache       : Cache
}