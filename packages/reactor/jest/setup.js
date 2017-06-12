global.__DEV__ = true;

// insert script tag needed by Ext JS for feature detection
var script = document.createElement('script')
document.body.appendChild(script);

// polyfill window.createRange for jsdom
global.Range = function Range() {};

const createContextualFragment = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0]; // so hokey it's not even funny
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