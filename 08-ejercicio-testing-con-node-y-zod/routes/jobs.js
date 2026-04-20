import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function validationMiddleware(validateFn) {
    return (request, response, next) => {
        const { success, data, error } = validateFn(request.body)

        if (!success) {
            return response.status(400).json({
                message: 'Datos inválidos',
                errors: error.errors
            })
        }

        request.validatedBody = data
        next()
    }
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
jobsRouter.post('/', validationMiddleware(validateJob), JobController.create)
jobsRouter.put('/:id', validationMiddleware(validateJob), JobController.update)
jobsRouter.patch('/:id', validationMiddleware(validatePartialJob), JobController.partialUpdate)
jobsRouter.delete('/:id', JobController.delete)