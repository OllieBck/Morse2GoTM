cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-tts.tts",
    "file": "plugins/cordova-plugin-tts/www/tts.js",
    "pluginId": "cordova-plugin-tts",
    "clobbers": [
      "TTS"
    ]
  },
  {
    "id": "cordova-plugin-websocket-server.WebSocketServer",
    "file": "plugins/cordova-plugin-websocket-server/www/wsserver.js",
    "pluginId": "cordova-plugin-websocket-server",
    "clobbers": [
      "cordova.plugins.wsserver"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-tts": "0.2.3",
  "cordova-plugin-add-swift-support": "1.7.1",
  "cordova-plugin-websocket-server": "1.4.8"
};
// BOTTOM OF METADATA
});