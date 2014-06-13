'use strict';

window.onload = function() {
  window.onload = null;
  var example = new window.WorkerMessenger();
  example.init(document.getElementById('received'));

  var messageText = document.getElementById('message');
  var sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', function() {
    example.postMessage(messageText.value);
  });
};
