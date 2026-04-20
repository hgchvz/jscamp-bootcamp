"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJob = validateJob;
exports.validatePartialJob = validatePartialJob;

var z = _interopRequireWildcard(require("zod"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TypeScript se ejecuta en BUILDTIME
// Zod se ejecuta en RUNTIME
var TechnologyEnum = z["enum"](['react', 'node', 'javascript', 'python', 'postgresql', 'mysql', 'mongodb', 'css', 'html'], {
  error: 'Tecnología no válida'
});
var ModalidadEnum = z["enum"](['remoto', 'cdmx', 'guadalajara', 'barcelona', 'bsas', 'madrid', 'valencia', 'bogota', 'lima', 'santiago', 'monterrey'], {
  error: 'Modalidad no válida'
});
var NivelEnum = z["enum"](['junior', 'mid-level', 'senior'], {
  error: 'Nivel no válido'
});
var ContratoEnum = z["enum"](['jornada-completa', 'medio-tiempo', 'por-hora'], {
  error: 'Tipo de contrato no válido'
});
var jobSchema = z.object({
  titulo: z.string({
    error: 'El titulo es obligatorio'
  }).min(3, 'El titulo debe tener al menos 3 caracteres').max(100, 'El titulo no puede exceder los 100 caracteres'),
  empresa: z.string({
    error: 'La empresa es obligatoria'
  }).min(2, 'La empresa debe tener al menos 2 caracteres'),
  ubicacion: z.string({
    error: 'La ubicación es obligatoria'
  }).min(2, 'La ubicación debe tener al menos 2 caracteres'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(2000, 'La descripción no puede exceder los 2000 caracteres').optional(),
  data: z.object({
    technology: z.array(TechnologyEnum, {
      error: 'La tecnología debe ser un array'
    }).min(1, 'Debe incluir al menos una tecnología'),
    modalidad: ModalidadEnum,
    nivel: NivelEnum,
    contrato: ContratoEnum
  })
});

function validateJob(input) {
  return jobSchema.safeParse(input);
}

function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input);
}
//# sourceMappingURL=jobs.dev.js.map
