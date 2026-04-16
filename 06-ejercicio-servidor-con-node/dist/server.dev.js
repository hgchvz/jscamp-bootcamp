"use strict";

var _nodeHttp = require("node:http");

var _nodeCrypto = require("node:crypto");

process.loadEnvFile();
var port = process.env.PORT || 3000;
var users = [{
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  name: 'Miguel',
  age: 28
}, {
  id: 'f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b',
  name: 'Mateo',
  age: 34
}, {
  id: '9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d',
  name: 'Pablo',
  age: 22
}, {
  id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
  name: 'Lucía',
  age: 31
}, {
  id: '7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e',
  name: 'Ana',
  age: 26
}, {
  id: '5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a',
  name: 'Juan',
  age: 29
}, {
  id: '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
  name: 'Sofía',
  age: 25
}, {
  id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
  name: 'Carlos',
  age: 37
}, {
  id: '4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f',
  name: 'Elena',
  age: 23
}, {
  id: '0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b',
  name: 'Diego',
  age: 30
}];

var json = function json(req) {
  return new Promise(function (resolve) {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      resolve(JSON.parse(body));
    });
  });
};

var server = (0, _nodeHttp.createServer)(function _callee(req, res) {
  var _ref, pathname, searchParams, nameFilter, minAgeFilter, maxAgeFilter, limitFilter, offsetFilter, filteredUsers, limit, offset, _ref2, name, age, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref = new URL(req.url, "http://localhost:".concat(port)), pathname = _ref.pathname, searchParams = _ref.searchParams; // ===========
          // EJERCICIO 3
          // ===========

          if (!(req.method === 'GET' && pathname === '/health')) {
            _context.next = 5;
            break;
          }

          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({
            status: 'ok',
            uptime: process.uptime()
          }));
          return _context.abrupt("return");

        case 5:
          if (!(req.method === 'GET' && pathname === '/users')) {
            _context.next = 19;
            break;
          }

          nameFilter = searchParams.get('name');
          minAgeFilter = searchParams.get('minAge');
          maxAgeFilter = searchParams.get('maxAge');
          limitFilter = searchParams.get('limit');
          offsetFilter = searchParams.get('offset');
          filteredUsers = [].concat(users);

          if (nameFilter) {
            filteredUsers = filteredUsers.filter(function (user) {
              return user.name.toLowerCase().includes(nameFilter.toLowerCase());
            });
          }

          if (minAgeFilter) {
            filteredUsers = filteredUsers.filter(function (user) {
              return user.age >= Number(minAgeFilter);
            });
          }

          if (maxAgeFilter) {
            filteredUsers = filteredUsers.filter(function (user) {
              return user.age <= Number(maxAgeFilter);
            });
          }

          if (limitFilter && offsetFilter) {
            limit = Number(limitFilter);
            offset = Number(offsetFilter);
            filteredUsers = filteredUsers.slice(offset, offset + limit);
          }

          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(filteredUsers));
          return _context.abrupt("return");

        case 19:
          if (!(req.method === 'POST' && pathname === '/users')) {
            _context.next = 30;
            break;
          }

          _context.next = 22;
          return regeneratorRuntime.awrap(json(req));

        case 22:
          _ref2 = _context.sent;
          name = _ref2.name;
          age = _ref2.age;
          newUser = {
            id: (0, _nodeCrypto.randomUUID)(),
            name: name,
            age: age
          };
          users.push(newUser);
          res.writeHead(201, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(newUser));
          return _context.abrupt("return");

        case 30:
          // ===========
          // EJERCICIO 4
          // ===========
          res.writeHead(404, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({
            error: 'Ruta no encontrada'
          }));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
});
server.listen(port, function () {
  var address = server.address();
  console.log("Servidor escuchando en http://localhost:".concat(address.port));
});
//# sourceMappingURL=server.dev.js.map
