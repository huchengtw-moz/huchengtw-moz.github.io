(function(exports) {
  'use strict';
  function WorkerMessenger() {}

  var proto = WorkerMessenger.prototype;

  proto.init = function(messagePane) {
    this.messagePane = messagePane;
    return this;
  };

  proto.createWorker = function() {
    this._logMsg('create or connect to worker');
    this.worker = new SharedWorker('js/worker.js', document.title);
    // listen
    this.worker.addEventListener('error', this);
    this.port = this.worker.port;
    this.port.addEventListener('message', this);
    this.startPort();
    this._logMsg('message port started');
  };

  proto.stopPort = function() {
    this.port.close();
    this.stopped = true;
  };

   proto.startPort = function() {
    this.port.start();
    this.stopped = false;
  };

  proto.handleEvent = function(e) {
    switch (e.type) {
      case 'error':
        this._logMsg('worker error: ' + e.message +
                     ' @' + e.filename + '#' + e.lineno);
        break;
      case 'message':
        this._logMsg(e.data);
        break;
    }
  };

  proto._logMsg = function(message) {
    var div = document.createElement('div');
    div.textContent = message;
    this.messagePane.appendChild(div);
    console.log(message);
  };

  proto.postMessage = function(message) {
    if (!this.port) {
      return;
    }
    this.port.postMessage(message);
  };

  exports.WorkerMessenger = WorkerMessenger;
})(window);
