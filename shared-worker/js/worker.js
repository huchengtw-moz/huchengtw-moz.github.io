var Messenger = {
  ports: [],

  handleConnect: function(e){
    e.ports.forEach(function(port) {
      Messenger.ports[Messenger.ports.length] = port;
      port.postMessage('You are #' + Messenger.ports.length + ' client.');
      port.addEventListener('message', function(e) {
        Messenger.handleMessage(e);
      });
    });
  },

  handleMessage: function(e) {
    Messenger.ports.forEach(function(port) {
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

