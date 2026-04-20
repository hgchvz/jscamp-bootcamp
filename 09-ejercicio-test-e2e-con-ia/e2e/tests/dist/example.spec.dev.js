"use strict";

var _test = require("@playwright/test");

// @ts-check
// 1. lo mas recomendable es usar Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS como último recurso
(0, _test.test)('La aplicación carga correctamente y muestra el buscador', function _callee(_ref) {
  var page, searchInput;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page;
          _context.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173'));

        case 3:
          searchInput = page.getByRole('searchbox');
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _test.expect)(searchInput).toBeVisible());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
(0, _test.test)('Un usuario puede buscar empleos por tecnología', function _callee2(_ref2) {
  var page, searchInput, jobCards;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          page = _ref2.page;
          _context2.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173'));

        case 3:
          searchInput = page.getByRole('searchbox');
          _context2.next = 6;
          return regeneratorRuntime.awrap(searchInput.fill('React'));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(page.getByRole('button', {
            name: 'Buscar'
          }).click());

        case 8:
          jobCards = page.locator('li[data-modalidad]');
          _context2.next = 11;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
});
(0, _test.test)('Buscar empleos y aplicar a una oferta', function _callee3(_ref3) {
  var page, searchInput, jobCards, applyButton;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          page = _ref3.page;
          _context3.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173'));

        case 3:
          searchInput = page.getByRole('searchbox');
          _context3.next = 6;
          return regeneratorRuntime.awrap(searchInput.fill('JavaScript'));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(page.getByRole('button', {
            name: 'Buscar'
          }).click());

        case 8:
          jobCards = page.locator('li[data-modalidad]');
          _context3.next = 11;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(jobCards.first().locator('a[aria-label*="Ver detalles"]').last().click());

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap((0, _test.expect)(page.locator('h1').last()).toBeVisible({
            timeout: 10000
          }));

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(page.getByRole('button', {
            name: 'Iniciar Sesión'
          }).click());

        case 17:
          applyButton = page.getByRole('button', {
            name: 'Aplicar'
          }).first();
          _context3.next = 20;
          return regeneratorRuntime.awrap(applyButton.click());

        case 20:
          _context3.next = 22;
          return regeneratorRuntime.awrap((0, _test.expect)(page.getByRole('button', {
            name: 'Aplicado'
          }).first()).toBeVisible());

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  });
});
(0, _test.test)('Filtrar por ubicación remoto', function _callee4(_ref4) {
  var page, jobCards;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          page = _ref4.page;
          _context4.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173/search'));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(page.locator('select').nth(2).selectOption('remoto'));

        case 5:
          jobCards = page.locator('li[data-modalidad]');
          _context4.next = 8;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toHaveAttribute('data-modalidad', 'remoto'));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
});
(0, _test.test)('Filtrar por nivel senior', function _callee5(_ref5) {
  var page, jobCards;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          page = _ref5.page;
          _context5.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173/search'));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(page.locator('select').nth(1).selectOption('senior'));

        case 5:
          jobCards = page.locator('li[data-modalidad]');
          _context5.next = 8;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toHaveAttribute('data-nivel', 'senior'));

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
});
(0, _test.test)('Aparece paginación y se puede navegar a la siguiente página', function _callee6(_ref6) {
  var page, jobCards, pagination, firstJobBefore, firstJobAfter;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          page = _ref6.page;
          _context6.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173/search'));

        case 3:
          // ← /search
          jobCards = page.locator('li[data-modalidad]');
          _context6.next = 6;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 6:
          pagination = page.locator('nav[class*="pagination"]');
          _context6.next = 9;
          return regeneratorRuntime.awrap((0, _test.expect)(pagination).toBeVisible());

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(jobCards.first().locator('h3').innerText());

        case 11:
          firstJobBefore = _context6.sent;
          _context6.next = 14;
          return regeneratorRuntime.awrap(page.getByRole('link', {
            name: 'Ir a la página siguiente'
          }).click());

        case 14:
          _context6.next = 16;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 16:
          _context6.next = 18;
          return regeneratorRuntime.awrap(jobCards.first().locator('h3').innerText());

        case 18:
          firstJobAfter = _context6.sent;
          (0, _test.expect)(firstJobBefore).not.toBe(firstJobAfter);

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  });
});
(0, _test.test)('Se puede ver el detalle de un empleo y aplicar', function _callee7(_ref7) {
  var page, jobCards, applyButton;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          page = _ref7.page;
          _context7.next = 3;
          return regeneratorRuntime.awrap(page["goto"]('http://localhost:5173/search'));

        case 3:
          jobCards = page.locator('li[data-modalidad]');
          _context7.next = 6;
          return regeneratorRuntime.awrap((0, _test.expect)(jobCards.first()).toBeVisible({
            timeout: 10000
          }));

        case 6:
          _context7.next = 8;
          return regeneratorRuntime.awrap(jobCards.first().locator('a[aria-label*="Ver detalles"]').last().click());

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap((0, _test.expect)(page.locator('h1').last()).toBeVisible({
            timeout: 10000
          }));

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap((0, _test.expect)(page).toHaveURL(/\/jobs\//));

        case 12:
          _context7.next = 14;
          return regeneratorRuntime.awrap(page.getByRole('button', {
            name: 'Iniciar Sesión'
          }).click());

        case 14:
          applyButton = page.getByRole('button', {
            name: 'Aplicar'
          }).first();
          _context7.next = 17;
          return regeneratorRuntime.awrap((0, _test.expect)(applyButton).toBeVisible({
            timeout: 10000
          }));

        case 17:
          _context7.next = 19;
          return regeneratorRuntime.awrap(applyButton.click());

        case 19:
          _context7.next = 21;
          return regeneratorRuntime.awrap((0, _test.expect)(page.getByRole('button', {
            name: 'Aplicado'
          }).first()).toBeVisible());

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  });
});
//# sourceMappingURL=example.spec.dev.js.map
