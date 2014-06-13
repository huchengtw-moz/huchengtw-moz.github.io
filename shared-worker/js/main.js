'use strict';

window.onload = function() {
  window.onload = null;
  var example = new window.WorkerMessenger();
  example.init(document.getElementById('received'));
  example.createWorker();

  var messageText = document.getElementById('message');
  var sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', function() {
    example.postMessage(messageText.value);
  });
  var enableButton = document.getElementById('enable-button');
  enableButton.addEventListener('click', function() {
    if (example.stopped) {
      example.startPort();
      enableButton.textContent = 'Stop';
    } else {
      example.stopPort();
      enableButton.textContent = 'Start';
    }
  });
};
