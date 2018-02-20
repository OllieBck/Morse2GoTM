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
//var wsserver = cordova.plugins.wsserver;
//var host = "192.168.1.9";
//var ws = new WebSocket('ws://' + host + ':8787');

var app = {
    // Application Constructor
    initialize: function() {
        alert('here');
        document.addEventListener('deviceready', function(){
          /*var wsserver = cordova.plugins.wsserver;
          wsserver.start(8787, {
           // WebSocket Server handlers
             'onFailure' :  function(addr, port, reason) {
               alert('Stopped listening on %s:%d. Reason: %s', addr, port, reason);
             },
           // WebSocket Connection handlers
           'onOpen' : function(conn) {
             alert('A user connected from %s', conn.remoteAddr);
           },
           'onMessage' : function(conn, msg) {
               alert(conn, msg);
           },
           'onClose' : function(conn, code, reason, wasClean) {
               alert('A user disconnected from %s', conn.remoteAddr);
           },
           // Other options
           // 'origins' : [ 'file://' ], // validates the 'Origin' HTTP Header.
           // 'protocols' : [ 'my-protocol-v1', 'my-protocol-v2' ], // validates the 'Sec-WebSocket-Protocol' HTTP Header.
           // 'tcpNoDelay' : true // disables Nagle's algorithm.
           }, function onStart(addr, port) {
               alert('Listening on ' + addr + ':' port);
           }, function onDidNotStart(reason) {
               alert('Did not start. Reason: %s', reason);
           });
        */ alert('now here');}, false);
      },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        alert("here now");
        this.morse2go();
    },

    // Update DOM on a Received Event
    morse2go: function() {
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
    /*
    startServer: function(){
        var wsserver = cordova.plugins.wsserver;
        wsserver.start(8787, {
         // WebSocket Server handlers
           'onFailure' :  function(addr, port, reason) {
             alert('Stopped listening on %s:%d. Reason: %s', addr, port, reason);
           },
         // WebSocket Connection handlers
         'onOpen' : function(conn) {
           alert('A user connected from %s', conn.remoteAddr);
         },
         'onMessage' : function(conn, msg) {
             alert(conn, msg);
         },
         'onClose' : function(conn, code, reason, wasClean) {
             alert('A user disconnected from %s', conn.remoteAddr);
         },
         // Other options
         // 'origins' : [ 'file://' ], // validates the 'Origin' HTTP Header.
         // 'protocols' : [ 'my-protocol-v1', 'my-protocol-v2' ], // validates the 'Sec-WebSocket-Protocol' HTTP Header.
         // 'tcpNoDelay' : true // disables Nagle's algorithm.
         }, function onStart(addr, port) {
             alert('Listening on ' + addr + ':' port);
         }, function onDidNotStart(reason) {
             alert('Did not start. Reason: %s', reason);
         });
       }*/
};

app.initialize();
