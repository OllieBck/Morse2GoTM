/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var lastSpoken;
var connectedAddress = [];

var app = {
    initialize: function(){
      document.addEventListener('deviceready', function(){
      var wsserver = cordova.plugins.wsserver;
      wsserver.start(8787, {
   // WebSocket Server handlers
      'onFailure' : function(addr, port, reason) {
        //alert('Stopped listening on ' + addr + ":" + port + ". Reason: " + reason);
        app.morse2goNoWs();
   },
   // WebSocket Connection handlers
      'onOpen' : function(conn) {
       /* conn: {
        'uuid' : '8e176b14-a1af-70a7-3e3d-8b341977a16e',
        'remoteAddr' : '192.168.1.10',
        'acceptedProtocol' : 'my-protocol-v1',
        'httpFields' : {...},
        'resource' : '/?param1=value1&param2=value2'
        } */
       //alert('A user connected from ' + conn.remoteAddr);
       connectedAddress.push(conn.uuid);
       //alert(connectedAddress[0]);
     },
      'onMessage' : function(conn, msg) {
       //alert(msg);
     },
      'onClose' : function(conn, code, reason, wasClean) {
       //alert('A user disconnected from ' + conn.remoteAddr);
       var arrayRemove = connectedAddress.indexOf(conn.uuid);
       if (arrayRemove > -1){
         connectedAddress.splice(arrayRemove, 1);
       }
       if (connectedAddress.length == 0){
         app.morse2goNoWs();
       }
     },
   // Other options
   /*
      'origins' : [ 'file://' ], // validates the 'Origin' HTTP Header.
      'protocols' : [ 'my-protocol-v1', 'my-protocol-v2' ], // validates the 'Sec-WebSocket-Protocol' HTTP Header.
      'tcpNoDelay' : true // disables Nagle's algorithm. */
      }, function onStart(addr, port) {
        //alert('Listening on ' + addr + ' ' + port);
        app.morse2go(wsserver);
      }, function onDidNotStart(reason) {
        //alert('Did not start. Reason: ' + reason);
        app.morse2goNoWs();
      });
      }, false);
    },

    onDeviceReady: function() {
      //alert("device ready");
      this.morse2go();
    },

    morse2go: function(ws) {
        app.focusElement(); // force focus to input box
        window.addEventListener('keyup', function(event){
          var textToSpeak = document.getElementById('TextField').value;
          //alert(event.keyCode);
          if (event.keyCode == 13 || event.keyCode == 38){
            //responsiveVoice.speak(textToSpeak, "US English Male");
            lastSpoken = textToSpeak;
            document.getElementById('TextField').value = '';
            app.displayPhrase(lastSpoken);
            ws.send({'uuid':connectedAddress[0]}, textToSpeak);
            TTS.speak({text: textToSpeak, locale: 'en-GB'});
          }

          if (event.keyCode == 40){
            //event.preventDefault();
            //responsiveVoice.speak(lastSpoken, "US English Male");
            TTS.speak({text: lastSpoken, locale: 'en-GB'});
          }
        });
    },

    morse2goNoWs: function() {
        app.focusElement(); // force focus to input box
        window.addEventListener('keyup', function(event){
          var textToSpeak = document.getElementById('TextField').value;
          //alert(event.keyCode);
          if (event.keyCode == 13 || event.keyCode == 38){
            //responsiveVoice.speak(textToSpeak, "US English Male");
            lastSpoken = textToSpeak;
            document.getElementById('TextField').value = '';
            app.displayPhrase(lastSpoken);
            TTS.speak({text: textToSpeak, locale: 'en-GB'});
          }

          if (event.keyCode == 40){
            //event.preventDefault();
            //responsiveVoice.speak(lastSpoken, "US English Male");
            TTS.speak({text: lastSpoken, locale: 'en-GB'});
          }
        });
    },

    focusElement: function(){
      document.getElementById('TextField').focus();
    },

    displayPhrase: function(storedPhrase) {
      var phraseField = document.getElementById('decode');
      app.removeTextNodes(phraseField);
      var storedExpression = document.createTextNode(storedPhrase);
      phraseField.appendChild(storedExpression);
      return storedExpression;
    },

    removeTextNodes: function(phraseField){
      var nodesToRemove = phraseField.childNodes;
      for (var i = 0; i < nodesToRemove.length; i++){
          phraseField.removeChild(nodesToRemove[i]);
      }
    }
};

app.initialize();
