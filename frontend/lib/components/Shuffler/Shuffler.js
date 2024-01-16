"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Shuffler = () => {
  const [userToken, setUserToken] = (0, _react.useState)(null);
  const [playlist, setPlaylist] = (0, _react.useState)('');
  const [songs, setSongs] = (0, _react.useState)([]);
  const [isListening, setIsListening] = (0, _react.useState)(true);
  const [isDoneShuffling, setIsDoneShuffling] = (0, _react.useState)(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchTokenAndPlayBack = async () => {
    try {
      if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
        setUserToken(localStorage.getItem('token'));
        const playbackResponse = await _axios.default.get("".concat(API_URL, "/playback?token=").concat(localStorage.getItem('token')));
        setIsListening(true);
        handlePlaylist(playbackResponse.data, localStorage.getItem('token'));
      } else if (!userToken) {
        const code = new URL(window.location.href).searchParams.get('code');
        const {
          data
        } = await _axios.default.get("".concat(API_URL, "/token?code=").concat(code));
        setUserToken(data.access_token);
        localStorage.setItem('token', data.access_token);
      } else {
        const playbackResponse = await await _axios.default.get("".concat(API_URL, "/playback?token=").concat(userToken));
        setIsListening(true);
        handlePlaylist(playbackResponse.data, userToken);
      }
    } catch (error) {
      console.error(error);
      setIsListening(false);
      setTimeout(() => {
        setIsListening(true);
      }, [5000]);
    }
  };
  const handlePlaylist = async (playbackData, accessToken) => {
    if (playbackData && playbackData.context && playbackData.context.type === 'playlist') {
      const playlistId = playbackData.context.uri.split(':')[2];
      setPlaylist(playlistId);
      try {
        setIsDoneShuffling(false);
        const {
          data
        } = await _axios.default.get("".concat(API_URL, "/getTracks?playlistId=").concat(playlistId, "&token=").concat(accessToken));
        const trackUris = data.items.map(item => item.track.uri.split(':')[2]);
        setSongs(trackUris);
        const shuffledSongs = shuffle(trackUris);
        await _axios.default.post("".concat(API_URL, "/addQueue"), {
          token: accessToken,
          songs: shuffledSongs
        }).then(setIsDoneShuffling(true));
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsListening(false);
      setTimeout(() => {
        setIsListening(true);
      }, [5000]);
    }
  };
  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full h-full flex flex-col font-sans justify-evenly items-center bg-spotifyBlack overflow-auto"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col items-center justify-center h-1/4 bg-spotifyGreen w-4/5 mt-4 rounded-2xl min-h-233 overflow-auto"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-spotifyWhite "
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "font-bold text-xl sm:text-3xl"
  }, "Shuffle Your Playlist!"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col items-center justify-center bg-spotifyGreen w-4/5 my-4 rounded-2xl p-4 overflow-auto"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-spotifyWhite text-center"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-md sm:text-lg md:text-2xl font-bold"
  }, "Instructions:"), /*#__PURE__*/_react.default.createElement("p", {
    className: "font-medium text-sm my-1"
  }, "1. Open Spotify on your phone or computer"), /*#__PURE__*/_react.default.createElement("p", {
    className: "font-medium text-xs my-1 sm:text-base"
  }, "2. Play a playlist ", /*#__PURE__*/_react.default.createElement("span", {
    className: "font-thin text-xs italic"
  }, "Can't be an album or liked songs")), /*#__PURE__*/_react.default.createElement("p", {
    className: "font-medium text-xs my-1 sm:text-base"
  }, "3. Click the shuffle button below on this page ", /*#__PURE__*/_react.default.createElement("span", {
    className: "font-thin text-xs italic"
  }, "Shuffled songs are added to queue")), /*#__PURE__*/_react.default.createElement("p", {
    className: "font-medium text-xs my-1 sm:text-base"
  }, "4. Enjoy! ", /*#__PURE__*/_react.default.createElement("span", {
    className: "font-thin text-xs italic"
  }, "For shuffle to work intentionally make sure your queue is clear")), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-thin text-xs italic"
  }, "Unfortunately due to Spotify limiting the size of a queue only 50 songs in your playlist can be shuffled at a time"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col items-center justify-center h-1/4 bg-spotifyGreen w-4/5 mt-4 rounded-2xl min-h-233 overflow-auto"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-spotifyWhite text-center font-medium text-base my-1 ".concat(isListening ? 'hidden' : '')
  }, "Please play a playlist on Spotify"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-spotifyWhite text-center font-medium text-base my-1 ".concat(isDoneShuffling ? 'hidden' : '')
  }, "Shuffling..."), /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-spotifyBlack text-spotifyWhite font-bold py-2 px-4 rounded-full h-3/4 w-1/2 hover:bg-opacity-95 hover:text-spotifyGreen md:text-2xl",
    onClick: fetchTokenAndPlayBack
  }, "Shuffle")));
};
var _default = exports.default = Shuffler;