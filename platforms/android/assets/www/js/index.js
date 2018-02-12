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

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
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
};

app.initialize();
