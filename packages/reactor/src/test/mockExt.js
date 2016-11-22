import { spy } from 'sinon';

export default function() {

    function Base () {

    }

    function Component (config) {
        this.config = config;
        this.items = [];
        this.events = [];
        this.render(config.renderTo);
    }

    Component.prototype = {

        on(event, handler, scope) {
            if (event === 'afterrender' || event === 'painted') {
                handler.call(scope, this.el);
            }
        },

        render: spy(function(el) {
            const div = document.createElement('div');
            div.className = this.getClsName();
            if (el) el.appendChild(div);
            this.el = { dom: div };

            if (this.config.html) {
                div.innerHTML = this.config.html;
            }

            if (this.config.items) for (let item of this.config.items) {
                div.appendChild(item.render());
            }

            return div;
        }),

        getClsName() {
            return 'x-component';
        },

        destroy: spy(function() {
            if (this.el.dom.parentNode) {
                this.el.dom.parentNode.removeChild(this.el.dom);
            }
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
    };

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