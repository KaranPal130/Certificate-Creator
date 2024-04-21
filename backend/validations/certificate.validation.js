const Joi = require("joi");

const createCertificate = {
  body: Joi.object().keys({
    recipientName: Joi.string(),
    courseName: Joi.string(),
    issuerName: Joi.string(),
    dateOfIssue: Joi.date(),
  }),
};

const verifyCertificate = {
  params: Joi.object().keys({
    certificateId: Joi.string(),
  }),
};

module.exports = {
    createCertificate,
    verifyCertificate
}