import * as z from 'zod'

// TypeScript se ejecuta en BUILDTIME
// Zod se ejecuta en RUNTIME

const TechnologyEnum = z.enum([
    'react',
    'node',
    'javascript',
    'python',
    'postgresql',
    'mysql',
    'mongodb',
    'css',
    'html',
], {
    error: 'Tecnología no válida'
})

const ModalidadEnum = z.enum([
    'remoto',
    'cdmx',
    'guadalajara',
    'barcelona',
    'bsas',
    'madrid',
    'valencia',
    'bogota',
    'lima',
    'santiago',
    'monterrey',
], {
    error: 'Modalidad no válida'
})

const NivelEnum = z.enum([
    'junior',
    'mid-level',
    'senior',
], {
    error: 'Nivel no válido'
})

const ContratoEnum = z.enum([
    'jornada-completa',
    'medio-tiempo',
    'por-hora',
], {
    error: 'Tipo de contrato no válido'
})

const jobSchema = z.object({
    titulo: z.string({
        error: 'El titulo es obligatorio'
    })
    .min(3, 'El titulo debe tener al menos 3 caracteres')
    .max(100, 'El titulo no puede exceder los 100 caracteres'),

    empresa: z.string({
        error: 'La empresa es obligatoria'
    }).min(2, 'La empresa debe tener al menos 2 caracteres'),

    ubicacion: z.string({
        error: 'La ubicación es obligatoria'
    }).min(2, 'La ubicación debe tener al menos 2 caracteres'),

    descripcion: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder los 2000 caracteres')
    .optional(),

    data: z.object({
        technology: z.array(TechnologyEnum, {
            error: 'La tecnología debe ser un array'
        }).min(1, 'Debe incluir al menos una tecnología'),

        modalidad: ModalidadEnum,
        nivel: NivelEnum,
        contrato: ContratoEnum,
    }),
})

export function validateJob(input) {
    return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
    return jobSchema.partial().safeParse(input)
}