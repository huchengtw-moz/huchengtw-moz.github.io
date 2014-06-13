var Messenger = {
  ports: [],

  handleConnect: function(e){
    e.ports.forEach(function(port) {
      this.ports[this.ports.length] = port;
      port.postMessage('You are #' + this.ports.length + ' client.');
      port.addEventListener('message', function(e) {
        Messenger.handleMessage(e);
      });
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
};

self.addEventListener('connect', function(e) {
  Messenger.handleConnect(e);
});

