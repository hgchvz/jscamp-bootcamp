"use strict";

var _nodeTest = require("node:test");

var _nodeAssert = _interopRequireDefault(require("node:assert"));

var _app = _interopRequireDefault(require("./app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server;
var PORT = 5678;
var BASE_URL = "http://localhost:".concat(PORT);
var VALID_ID = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57';
var ID_PARA_PATCH_Y_DELETE = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405';
var INVALID_ID = 'id-que-no-existe';
(0, _nodeTest.before)(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            server = _app["default"].listen(PORT, function () {
              return resolve();
            });
            server.on('error', reject);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
(0, _nodeTest.after)(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            server.close(function (err) {
              if (err) return reject(err);
              resolve();
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
(0, _nodeTest.describe)('GET /jobs', function () {
  (0, _nodeTest.test)('debe responder con 200 y un array de trabajos', function _callee3() {
    var response, json;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs")));

          case 2:
            response = _context3.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context3.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            json = _context3.sent;

            _nodeAssert["default"].ok(Array.isArray(json.data), 'json.data debe ser un array');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe filtrar trabajos por tecnología', function _callee4() {
    var tech, response, json;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tech = 'react';
            _context4.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs?technology=").concat(tech)));

          case 3:
            response = _context4.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context4.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            json = _context4.sent;

            _nodeAssert["default"].ok(json.data.every(function (job) {
              return job.data.technology.includes(tech);
            }), "Todos los trabajos deben incluir la tecnolog\xEDa ".concat(tech));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe respetar el límite de resultados', function _callee5() {
    var response, json;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs?limit=2")));

          case 2:
            response = _context5.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context5.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            json = _context5.sent;

            _nodeAssert["default"].strictEqual(json.limit, 2);

            _nodeAssert["default"].strictEqual(json.data.length, 2);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe aplicar offset correctamente', function _callee6() {
    var response, json;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs?offset=1")));

          case 2:
            response = _context6.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context6.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            json = _context6.sent;

            _nodeAssert["default"].strictEqual(json.data[0].id, VALID_ID, 'El primer resultado debe ser el segundo job del JSON');

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
});
(0, _nodeTest.describe)('GET /jobs/:id', function () {
  (0, _nodeTest.test)('debe devolver el trabajo con el ID especificado', function _callee7() {
    var response, json;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(VALID_ID)));

          case 2:
            response = _context7.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context7.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            json = _context7.sent;

            _nodeAssert["default"].strictEqual(json.id, VALID_ID);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 404 cuando el ID no existe', function _callee8() {
    var response, json;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(INVALID_ID)));

          case 2:
            response = _context8.sent;

            _nodeAssert["default"].strictEqual(response.status, 404);

            _context8.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            json = _context8.sent;

            _nodeAssert["default"].ok(json.message, 'La respuesta debe contener un campo message');

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
});
(0, _nodeTest.describe)('POST /jobs', function () {
  (0, _nodeTest.test)('debe crear un nuevo trabajo y responder con 201', function _callee9() {
    var newJob, response, json;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            newJob = {
              titulo: 'Frontend Developer',
              empresa: 'Test Company',
              ubicacion: 'Remoto',
              data: {
                technology: ['react', 'javascript'],
                modalidad: 'remoto',
                nivel: 'junior',
                contrato: 'jornada-completa'
              }
            };
            _context9.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newJob)
            }));

          case 3:
            response = _context9.sent;

            _nodeAssert["default"].strictEqual(response.status, 201);

            _context9.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            json = _context9.sent;

            _nodeAssert["default"].ok(json.id, 'El trabajo creado debe tener un id');

            _nodeAssert["default"].strictEqual(json.titulo, newJob.titulo);

            _nodeAssert["default"].strictEqual(json.empresa, newJob.empresa);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 400 si el título tiene menos de 3 caracteres', function _callee10() {
    var response;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 'ab',
                empresa: 'Test',
                ubicacion: 'Remoto',
                data: {}
              })
            }));

          case 2:
            response = _context10.sent;

            _nodeAssert["default"].strictEqual(response.status, 400);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 400 si el título tiene más de 100 caracteres', function _callee11() {
    var response;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 'a'.repeat(101),
                empresa: 'Test',
                ubicacion: 'Remoto',
                data: {}
              })
            }));

          case 2:
            response = _context11.sent;

            _nodeAssert["default"].strictEqual(response.status, 400);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 400 si falta el campo título', function _callee12() {
    var response;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                empresa: 'Test',
                ubicacion: 'Remoto',
                data: {}
              })
            }));

          case 2:
            response = _context12.sent;

            _nodeAssert["default"].strictEqual(response.status, 400);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 400 si el título no es un string', function _callee13() {
    var response;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 123,
                empresa: 'Test',
                ubicacion: 'Remoto',
                data: {}
              })
            }));

          case 2:
            response = _context13.sent;

            _nodeAssert["default"].strictEqual(response.status, 400);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 201 si falta el campo descripción (es opcional)', function _callee14() {
    var response;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 'Job sin descripción',
                empresa: 'Test Company',
                ubicacion: 'Remoto',
                data: {
                  technology: ['javascript'],
                  modalidad: 'remoto',
                  nivel: 'junior',
                  contrato: 'jornada-completa'
                }
              })
            }));

          case 2:
            response = _context14.sent;

            _nodeAssert["default"].strictEqual(response.status, 201);

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    });
  });
});
(0, _nodeTest.describe)('PUT /jobs/:id', function () {
  (0, _nodeTest.test)('debe actualizar el trabajo y responder con 200', function _callee15() {
    var updatedJob, response, getResponse, json;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            updatedJob = {
              titulo: 'Puesto Actualizado PUT',
              empresa: 'Empresa Actualizada',
              ubicacion: 'Presencial',
              data: {
                technology: ['node'],
                modalidad: 'remoto',
                nivel: 'senior',
                contrato: 'jornada-completa'
              }
            };
            _context15.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(VALID_ID), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedJob)
            }));

          case 3:
            response = _context15.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context15.next = 7;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(VALID_ID)));

          case 7:
            getResponse = _context15.sent;
            _context15.next = 10;
            return regeneratorRuntime.awrap(getResponse.json());

          case 10:
            json = _context15.sent;

            _nodeAssert["default"].strictEqual(json.titulo, updatedJob.titulo);

            _nodeAssert["default"].strictEqual(json.empresa, updatedJob.empresa);

          case 13:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 404 cuando el ID no existe', function _callee16() {
    var response;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(INVALID_ID), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 'Test',
                empresa: 'Test',
                ubicacion: 'Test',
                data: {
                  technology: ['javascript'],
                  modalidad: 'remoto',
                  nivel: 'junior',
                  contrato: 'jornada-completa'
                }
              })
            }));

          case 2:
            response = _context16.sent;

            _nodeAssert["default"].strictEqual(response.status, 404);

          case 4:
          case "end":
            return _context16.stop();
        }
      }
    });
  });
});
(0, _nodeTest.describe)('PATCH /jobs/:id', function () {
  (0, _nodeTest.test)('debe actualizar solo los campos enviados y responder con 200', function _callee17() {
    var patch, response, getResponse, json;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            patch = {
              titulo: 'Titulo Parcheado',
              ubicacion: 'Barcelona'
            };
            _context17.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(ID_PARA_PATCH_Y_DELETE), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(patch)
            }));

          case 3:
            response = _context17.sent;

            _nodeAssert["default"].strictEqual(response.status, 200);

            _context17.next = 7;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(ID_PARA_PATCH_Y_DELETE)));

          case 7:
            getResponse = _context17.sent;
            _context17.next = 10;
            return regeneratorRuntime.awrap(getResponse.json());

          case 10:
            json = _context17.sent;

            _nodeAssert["default"].strictEqual(json.titulo, patch.titulo);

            _nodeAssert["default"].strictEqual(json.ubicacion, patch.ubicacion);

            _nodeAssert["default"].ok(json.empresa, 'El campo empresa debe seguir existiendo');

          case 14:
          case "end":
            return _context17.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 404 cuando el ID no existe', function _callee18() {
    var response;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(INVALID_ID), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                titulo: 'Test'
              })
            }));

          case 2:
            response = _context18.sent;

            _nodeAssert["default"].strictEqual(response.status, 404);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    });
  });
});
(0, _nodeTest.describe)('DELETE /jobs/:id', function () {
  (0, _nodeTest.test)('debe eliminar el trabajo y responder con 204', function _callee19() {
    var response, getResponse;
    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(ID_PARA_PATCH_Y_DELETE), {
              method: 'DELETE'
            }));

          case 2:
            response = _context19.sent;

            _nodeAssert["default"].strictEqual(response.status, 204);

            _context19.next = 6;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(ID_PARA_PATCH_Y_DELETE)));

          case 6:
            getResponse = _context19.sent;

            _nodeAssert["default"].strictEqual(getResponse.status, 404);

          case 8:
          case "end":
            return _context19.stop();
        }
      }
    });
  });
  (0, _nodeTest.test)('debe responder con 404 cuando el ID no existe', function _callee20() {
    var response;
    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return regeneratorRuntime.awrap(fetch("".concat(BASE_URL, "/jobs/").concat(INVALID_ID), {
              method: 'DELETE'
            }));

          case 2:
            response = _context20.sent;

            _nodeAssert["default"].strictEqual(response.status, 404);

          case 4:
          case "end":
            return _context20.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=app.test.dev.js.map
