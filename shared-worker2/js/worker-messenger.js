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

  proto._handleCmdMessage = function(data) {
    switch(data.type) {
      case 'master-role':
        this._slaves = [];
        this._logMsg('I am master page.');
        break;
      case 'slave-role':
        document.getElementById('tool-bar').hidden = true;
        this._logMsg('I am slave page.');
        break;
      case 'slave-port':
        this._slaves[this._slaves.length] = data.port;
        this._logMsg('New slave is coming: ' + this._slaves.length);
        break;
    }
  };

  proto.handleEvent = function(e) {
    switch (e.type) {
      case 'error':
        this._logMsg('worker error: ' + e.message +
                     ' @' + e.filename + '#' + e.lineno);
        break;
      case 'message':
        if (typeof e.data !== 'string') {
          this._handleCmdMessage(e.data);
        } else {
          this._logMsg(e.data);
        }
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
    if (this._slaves) {
      this._slaves.forEach(function(p) {
        p.postMessage(message);
      });
    }
  };

  exports.WorkerMessenger = WorkerMessenger;
})(window);
