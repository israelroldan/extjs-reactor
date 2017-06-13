global.__DEV__ = true;

// insert script tag needed by Ext JS for feature detection
var script = document.createElement('script')
document.body.appendChild(script);

// quiet warning about missing viewport meta tag in modern
var meta = document.createElement('meta');
meta.setAttribute('name', 'viewport');
meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes');
document.body.appendChild(meta);

// polyfill window.createRange for jsdom
global.Range = function Range() {};

const createContextualFragment = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
};

Range.prototype.createContextualFragment = (html) => createContextualFragment(html);

global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 };
    },
    getClientRects: () => [],
    createContextualFragment,
  };
};