"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Login = require("./Login");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LandingPage = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full h-full flex flex-col font-sans justify-evenly items-center bg-spotifyBlack"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full text-center text-4xl text-spotifyGreen font-black md:text-6xl"
  }, "SHUFFLPLAY"), /*#__PURE__*/_react.default.createElement(_Login.Login, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/2 text-center text-xl text-spotifyGreen font-bold"
  }, "Unlocking Your Whole Playlist"));
};
var _default = exports.default = LandingPage;