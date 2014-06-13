(function(exports) {
  'use strict';
  function WorkerMessenger() {}

  var proto = WorkerMessenger.prototype;

  proto.init = function(messagePane) {
    this.messagePane = messagePane;
    this._logMsg('create or connect to worker');
    this.worker = new SharedWorker('worker.js', document.title);
    // listen
    this.wokker.addEventListener('error', this);
    this.port = this.worker.port;
    this.port.addEventListener('message', this);
    this.port.start();
    this._logMsg('message port started');
    return this;
  };

  proto._handleMessage = function(e) {
    switch (e.type) {
      case 'error':
        this._logMsg('worker error: ' + e.message +
                     ' @' + e.filename + '#' + e.lineno);
        break;
      case 'message':
        this._logMsg('message from worker received: ' + e.data + ', origin: ' +
                     e.origin + ', lastEventId: ' + e.lastEventId);
        break;
    }
  };

  proto._logMsg = function(message) {
    var div = document.createElement('div');
    div.innerText = message;
    this.messagePane.appendChild(div);
    console.log(message);
  };

  proto.postMessage = function(message) {
    this.port.postMessage(message);
  };

  exports.WorkerMessenger = WorkerMessenger;
})(window);
