var masterPort;
self.addEventListener('connect', function(e){
  e.ports.forEach(function(port) {
    if (!masterPort) {
      masterPort = port;
      port.postMessage({
        type: 'master-role'
      });
    } else {
      port.postMessage({
        type: 'slave-role'
      });
      masterPort.postMessage({
        type: 'slave-port',
        port: port
      }, [port]);
    }
  });
});
