"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _App = require("../../App");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Login = () => {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const API_URL = process.env.REACT_APP_API_URL;
  const handleLogin = () => {
    _axios.default.get("".concat(API_URL, "/login")).then(res => {
      window.location = res.data;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/2 h-1/6 flex align-center justify-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-spotifyGreen text-spotifyWhite font-bold py-2 px-4 rounded-full h-3/4 w-3/4 hover:bg-opacity-95 hover:text-spotifyBlack p-96\"",
    onClick: handleLogin
  }, "Login With Spotify"));
};
exports.Login = Login;