var Messenger = {
  ports: [],

  handleConnect: function(e){
    e.ports.forEach(function(port) {
      this.ports[this.ports.length] = port;
      port.postMessage('You are #' + this.ports.length + ' client.');
      port.addEventListener('message', this);
    });
  },

  handleMessage: function(e) {
    this.ports.forEach(function(port) {
      if (e.ports.indexOf(port) > -1) {
        return;
      }
      port.postMessage(e.data);
    });
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'connect':
        this.handleConnect(e);
        break;
      case 'message':
        this.handleMessage(e);
        break;
    }
  }
};

self.addEventListener('connect', Messenger);

