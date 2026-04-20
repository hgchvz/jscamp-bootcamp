"use strict";

var _nodeTest = require("node:test");

var _nodeAssert = _interopRequireDefault(require("node:assert"));

var _stagehand = require("@browserbasehq/stagehand");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

process.loadEnvFile();
(0, _nodeTest.test)('Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98', function _callee() {
  var stagehand, _stagehand$context$pa, _stagehand$context$pa2, page, _ref, extraction;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          stagehand = new _stagehand.Stagehand({
            env: 'LOCAL',
            modelName: 'gpt-4o-mini'
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(stagehand.init());

        case 3:
          _stagehand$context$pa = stagehand.context.pages(), _stagehand$context$pa2 = _slicedToArray(_stagehand$context$pa, 1), page = _stagehand$context$pa2[0];
          _context.next = 6;
          return regeneratorRuntime.awrap(page["goto"]('https://jsconf.es'));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(stagehand.act('Clicar en el botón de "Comprar entradas"'));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(stagehand.act('Click en el "+" al lado de "Entrada General" para añadir un ticket'));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(stagehand.act('Click en el "+" al lado de "Entrada General" para añadir un segundo ticket'));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(stagehand.extract("Obtén el subtotal de la página"));

        case 14:
          _ref = _context.sent;
          extraction = _ref.extraction;
          console.log('Subtotal extraido: ', extraction);

          _nodeAssert["default"].strictEqual(extraction, '€287.98');

          _context.next = 20;
          return regeneratorRuntime.awrap(stagehand.close());

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
});
//# sourceMappingURL=test-ai.dev.js.map
