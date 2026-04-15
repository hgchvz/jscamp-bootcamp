"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuthStore = void 0;

var _zustand = require("zustand");

var useAuthStore = (0, _zustand.create)(function (set) {
  return {
    isLoggedIn: false,
    login: function login() {
      return set({
        isLoggedIn: true
      });
    },
    logout: function logout() {
      return set({
        isLoggedIn: false
      });
    }
  };
});
exports.useAuthStore = useAuthStore;
//# sourceMappingURL=authStore.dev.js.map
