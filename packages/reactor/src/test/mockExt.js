import { spy } from 'sinon';

export default function() {

    class Base {

    }

    class Component extends Base {
        constructor(config) {
            super()
            this.config = config;
            this.items = [];
            this.events = {};
            this.init();
            
            if (config.renderTo) {
                this.render(config.renderTo);
            }
        }

        init() {
            Object.assign(this, {
                render: spy(function(el) {
                    const div = document.createElement('div');
                    div.className = this.getClsName();
                    div._extCmp = this;
                    if (el) el.appendChild(div);
                    this.el = this.renderElement = { dom: div };

                    if (this.config.html) {
                        div.innerHTML = this.config.html;
                    }

                    if (this.config.items) for (let item of this.config.items) {
                        div.appendChild(item.render());
                    }

                    const events = this.events['afterrender'] || this.events['painted'];

                    if (events) for (let handler of events) {
                        handler(this.el || this.renderElement);
                    }

                    return div;
                }),

                destroy: spy(function() {
                    const el = this.el || this.renderElement;
                    el.dom.parentNode && el.dom.parentNode.removeChild(el.dom);
                }),

                insert: spy(function(index, child) {
                    const el = this.el.dom;
                    const target = el.childNodes[index+1];
                    const childEl = child.render();
                    if (target) {
                        el.insertBefore(childEl, target);
                    } else {
                        el.appendChild(childEl);
                    }
                    child.ownerCt = this;
                    this.items.splice(index, 0, child);
                }),

                add: spy(function(child) {
                    child.render(this.el.dom);
                    child.ownerCt = this;
                    this.items.push(child);
                }),

                setConfig: spy(function(config) {
                    this.config = config;
                })
            });
        }

        on(event, handler, scope) {
            const events = this.events[event] || (this.events[event] = []);
            events.push(handler.bind(scope));
        }

        getClsName() {
            return 'x-component';
        }
    }

    global.Ext = {
        ClassManager: {
            getByAlias(alias) {
                return class extends Component {
                    getClsName() {
                        return 'x-' + alias.replace(/^widget\./, '');
                    }
                };
            }
        },
        Array: {
            union: function(a, b) {
                const result = Array.from(a);
                for (let item of b) if (result.indexOf(item) !== -1) result.push(b);
                return result;
            }
        },
        String: {
            capitalize: function(str) {
                return str[0].toUpperCase() + str.slice(1);
            }
        },
        Base,
        Component
    };
};