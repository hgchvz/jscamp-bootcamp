"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobsRouter = void 0;

var _express = require("express");

var _jobs = require("../controllers/jobs.js");

var _jobs2 = require("../schemas/jobs.js");

var jobsRouter = (0, _express.Router)();
exports.jobsRouter = jobsRouter;

function validationMiddleware(validateFn) {
  return function (request, response, next) {
    var _validateFn = validateFn(request.body),
        success = _validateFn.success,
        data = _validateFn.data,
        error = _validateFn.error;

    if (!success) {
      return response.status(400).json({
        message: 'Datos inválidos',
        errors: error.errors
      });
    }

    request.validatedBody = data;
    next();
  };
}

jobsRouter.get('/', _jobs.JobController.getAll);
jobsRouter.get('/:id', _jobs.JobController.getId);
jobsRouter.post('/', validationMiddleware(_jobs2.validateJob), _jobs.JobController.create);
jobsRouter.put('/:id', validationMiddleware(_jobs2.validateJob), _jobs.JobController.update);
jobsRouter.patch('/:id', validationMiddleware(_jobs2.validatePartialJob), _jobs.JobController.partialUpdate);
jobsRouter["delete"]('/:id', _jobs.JobController["delete"]);
//# sourceMappingURL=jobs.dev.js.map
