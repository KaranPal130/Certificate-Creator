const express = require('express');
const validate = require('../../middlewares/validate');
const certificateValidation = require('../../validations/certificate.validation');
const certificateController = require('../../controllers/certificate.controller');

const router = express.Router();

router.route('/create').post(validate(certificateValidation.createCertificate), certificateController.createCertificate);
router.route('/verify/:certificateId').get(validate(certificateValidation.verifyCertificate), certificateController.verifyCertificate);

module.exports = router
