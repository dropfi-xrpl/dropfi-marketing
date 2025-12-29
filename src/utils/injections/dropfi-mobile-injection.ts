export const dropfiMobileInjection = `
(function () {
    if (!window.ReactNativeWebView) return;
    if (window.xrpl && window.xrpl.isDropFi) { true; return; }
  
    console.log('[DropFi] Injected XRPL provider');
    const XRPLProvider = {
      isDropFi: true,
      selectedAddress: null,
      selectedNetwork: null,
      connectedAccounts: [],
      network: null,
      endpoint: null,
      listeners: {},
      resolvers: {},
  
      _emit(event, payload) {
        (this.listeners[event] || []).forEach((fn) => fn(payload));
      },
  
      on(event, cb) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(cb);
      },
  
      off(event, cb) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter((fn) => fn !== cb);
      },
  
      createXRPLPromise(method, data = {}) {
        return new Promise((resolve) => {
          this.resolvers[method] = (result) => {
            if (method === 'xrpl_stateRequest' && result) {
              this.selectedAddress = result.selectedAddress;
              this.connectedAccounts = result.connectedAccounts;
              this.network = result.network;
              this.endpoint = result.endpoint;
              this._emit('xrpl_selectedAddress', result.selectedAddress);
              this._emit('xrpl_connectedAccounts', result.connectedAccounts);
              this._emit('xrpl_selectedNetwork', result.network);
            } else if (method === 'xrpl_connect' && result) {
              this.selectedAddress = result;
              this.connectedAccounts = [result];
              this._emit('xrpl_selectedAddress', result);
              this._emit('xrpl_connectedAccounts', [result]);
            } else if (method === 'xrpl_disconnect') {
              const old = this.selectedAddress;
              this.selectedAddress = null;
              this.connectedAccounts = [];
              this._emit('xrpl_selectedAddress', null);
              this._emit('xrpl_connectedAccounts', []);
              this._emit('xrpl_disconnect', old);
            } else if (method === 'xrpl_switchNetwork' && result) {
              this.network = result.network;
              this.endpoint = result.endpoint;
              this._emit('xrpl_selectedNetwork', result.network);
            }
  
            resolve(result);
          };
  
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ method, params: data })
          );
        });
      },
  
      handleHostResponse(message) {
        try {
          const { method, payload } = JSON.parse(message?.data || '{}');
          if (this.resolvers[method]) {
            this.resolvers[method](payload);
          }
        } catch (err) {
          console.warn('[DropFi] Failed to handle host response', err);
        }
      },
  
      connect: (data) => XRPLProvider.createXRPLPromise('xrpl_connect', { data }),
      disconnect: () => XRPLProvider.createXRPLPromise('xrpl_disconnect'),
      signMessage: (message) => XRPLProvider.createXRPLPromise('xrpl_signMessage', { message }),
      sendTransaction: (tx) => XRPLProvider.createXRPLPromise('xrpl_sendTransaction', { tx }),
      switchNetwork: (networkId) => XRPLProvider.createXRPLPromise('xrpl_switchNetwork', { networkId }),
      changeAccount: (account) => XRPLProvider.createXRPLPromise('xrpl_changeAccount', { account }),
      initialize: () => XRPLProvider.createXRPLPromise('xrpl_stateRequest'),
  
      isConnected: () => !!XRPLProvider.selectedAddress,
    };
  
    window.addEventListener('message', (event) => {
      XRPLProvider.handleHostResponse(event);
    });
  
    window.xrpl = XRPLProvider;
  })();
`;
