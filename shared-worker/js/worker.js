var Messenger = {
  ports: [],

  handleConnect: function(e){
    e.ports.forEach(function(port) {
      this.ports[this.ports.length] = port;
      port.postMessage('You are #' + this.ports.length + ' client.');
      port.addEventListener('message', this);
      port.start();
    }.bind(this));
  },

  handleMessage: function(e) {
    var portIdx = this.ports.indexOf(e.target) + 1;
    this.ports.forEach(function(port) {
      port.postMessage('#' + portIdx + ':' + e.data);
    }.bind(this));
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'connect':
        this.handleConnect(e);
        break;
      case 'message':
        this.handleMessage(e);
        break;
      case 'online':
      case 'offline':
        // How to show it is online/offline, XHR?
        break;
    }
  }
};

self.addEventListener('connect', Messenger);
self.addEventListener('online', Messenger);
self.addEventListener('offline', Messenger);
