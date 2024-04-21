const httpStatus = require("http-status");
const { Certificate } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a Certificate
 * @param {Object} certificateBody
 * @returns {Promise<Certificate>}
 */
const createCertificate = async (certificateBody) => {
  return Certificate.create(certificateBody);
};

const verifyCertificate = async(cerificateId) => {
    return Certificate.findOne({ certificateID: cerificateId })
}

module.exports = {
    createCertificate,
    verifyCertificate
}