"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFavoritesStore = void 0;

var _zustand = require("zustand");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useFavoritesStore = (0, _zustand.create)(function (set, get) {
  return {
    favorites: [],
    clearFavorites: function clearFavorites() {
      set({
        favorites: []
      });
    },
    addFavorite: function addFavorite(jobId) {
      set(function (state) {
        return {
          favorites: state.favorites.includes(jobId) ? state.favorites : [].concat(_toConsumableArray(state.favorites), [jobId])
        };
      });
    },
    removeFavorite: function removeFavorite(jobId) {
      set(function (state) {
        return {
          favorites: state.favorites.filter(function (id) {
            return id !== jobId;
          })
        };
      });
    },
    isFavorite: function isFavorite(jobId) {
      return get().favorites.includes(jobId);
    },
    toggleFavorite: function toggleFavorite(jobId) {
      var _get = get(),
          addFavorite = _get.addFavorite,
          removeFavorite = _get.removeFavorite,
          isFavorite = _get.isFavorite;

      var isFav = isFavorite(jobId);
      isFav ? removeFavorite(jobId) : addFavorite(jobId);
    },
    countFavorites: function countFavorites() {
      return get().favorites.length;
    }
  };
});
exports.useFavoritesStore = useFavoritesStore;
//# sourceMappingURL=favoritesStore.dev.js.map
