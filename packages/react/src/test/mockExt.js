import { spy } from 'sinon';

export default function() {
    const Component = function(config) {
        this.config = config;
        this.items = [];
    }

    Component.prototype = {
        render: spy(function(el) {
            const div = document.createElement('div');
            div.className = 'x-' + this.config.xtype;
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
    }

    global.Ext = {
        create: (config) => new Ext.Component(config),
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
        Component
    };
};