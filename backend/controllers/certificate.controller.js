const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { certificateService } = require('../services');

const createCertificate = catchAsync(async(req, res) => {
    const certificate = await certificateService.createCertificate(req.body);
    res.status(httpStatus.CREATED).send(certificate);
})

const verifyCertificate = catchAsync(async(req, res)=> {
    const certificate = await certificateService.verifyCertificate(req.params.certificateId);
    if (!certificate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Certificate not verified');
    }
    res.send(certificate);
})

module.exports = {
    createCertificate,
    verifyCertificate
}