"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var typescript_1 = require("typescript");
var REACTIFY = 'reactify';
var REACTOR_MODULE_PATTERN = /^@extjs\/reactor$/;
var COMPONENT_MODULE_PATTERN = /^@extjs\/(ext-react.*|(reactor\/(modern|classic)))$/;
function extractFromTSX(source, compilation, scriptTarget) {
    debugger;
    var sourceFile = ts.createSourceFile('foo.tsx', source, scriptTarget);
    var statements = [];
    var types = {};
    var reactifyNames = [];
    var reactorNames = [];
    traverse(sourceFile);
    function addToTypes(name, arg) {
        if (isSyntaxKind(arg, typescript_1.SyntaxKind.StringLiteral)) {
            var xtype = arg.text;
            if (xtype) {
                types[name] = { xtype: "\"" + xtype.toLowerCase() + "\"" };
            }
        }
        else if (isSyntaxKind(arg, typescript_1.SyntaxKind.Identifier)) {
            types[name] = { xclass: "\"" + arg.text + "\"" };
        }
    }
    function traverse(node) {
        if (isSyntaxKind(node, typescript_1.SyntaxKind.ImportDeclaration)) {
            var moduleTokenName = node.moduleSpecifier.text;
            if (moduleTokenName.match(REACTOR_MODULE_PATTERN) && node.importClause) {
                if (isSyntaxKind(node.importClause.namedBindings, typescript_1.SyntaxKind.NamespaceImport)) {
                    reactorNames.push(node.importClause.namedBindings.name.text);
                    reactifyNames = ['reactify'];
                }
                else if (isSyntaxKind(node.importClause.namedBindings, typescript_1.SyntaxKind.NamedImports)) {
                    var elements = node.importClause.namedBindings.elements;
                    var reactifyNodes = elements.filter(function (e) {
                        return (e.propertyName && e.propertyName.text === REACTIFY) || (e.name.text === REACTIFY);
                    });
                    reactifyNames.push.apply(reactifyNames, reactifyNodes.map(function (n) {
                        return n.name.text;
                    }));
                }
            }
            else if (moduleTokenName.match(COMPONENT_MODULE_PATTERN) && node.importClause) {
                if (isSyntaxKind(node.importClause.namedBindings, typescript_1.SyntaxKind.NamedImports)) {
                    var elements = node.importClause.namedBindings.elements;
                    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                        var e = elements_1[_i];
                        var value = e.propertyName ? e.propertyName.text.toLowerCase() : e.name.text.toLowerCase();
                        types[e.name.text] = { xtype: "\"" + value + "\"" };
                    }
                }
            }
        }
        else if (isSyntaxKind(node, typescript_1.SyntaxKind.VariableDeclaration)) {
            var call = isSyntaxKind(node.initializer, typescript_1.SyntaxKind.CallExpression) ?
                node.initializer :
                (isSyntaxKind(node.initializer, typescript_1.SyntaxKind.AsExpression) &&
                    isSyntaxKind(node.initializer.expression, typescript_1.SyntaxKind.CallExpression)) ?
                    node.initializer.expression :
                    undefined;
            if (call) {
                if ((isSyntaxKind(call.expression, typescript_1.SyntaxKind.PropertyAccessExpression) &&
                    isSyntaxKind(call.expression.expression, typescript_1.SyntaxKind.Identifier) &&
                    ~reactorNames.indexOf(call.expression.expression.text) &&
                    ~reactifyNames.indexOf(call.expression.name.text)) ||
                    (isSyntaxKind(call.expression, typescript_1.SyntaxKind.Identifier) &&
                        ~reactifyNames.indexOf(call.expression.text))) {
                    if (isSyntaxKind(node.name, typescript_1.SyntaxKind.Identifier)) {
                        var varName = node.name.text;
                        var arg = call.arguments[0];
                        if (arg) {
                            addToTypes(varName, arg);
                        }
                    }
                    else if (isSyntaxKind(node.name, typescript_1.SyntaxKind.ArrayBindingPattern)) {
                        for (var i = 0; i < node.name.elements.length; i++) {
                            var element = node.name.elements[i];
                            if (isSyntaxKind(element, typescript_1.SyntaxKind.BindingElement) &&
                                isSyntaxKind(element.name, typescript_1.SyntaxKind.Identifier)) {
                                var tagName = element.name.text;
                                var arg = call.arguments[i];
                                if (tagName && arg) {
                                    addToTypes(tagName, arg);
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (isSyntaxKind(node, typescript_1.SyntaxKind.JsxSelfClosingElement, typescript_1.SyntaxKind.JsxOpeningElement) &&
            isSyntaxKind(node.tagName, typescript_1.SyntaxKind.Identifier)) {
            var type = types[node.tagName.text];
            if (type) {
                var configs_1 = __assign({}, type);
                node.attributes.forEach(function (attribute) {
                    if (isSyntaxKind(attribute, typescript_1.SyntaxKind.JsxAttribute)) {
                        var name_1 = attribute.name.text;
                        if (isSyntaxKind(attribute.initializer, typescript_1.SyntaxKind.StringLiteral)) {
                            configs_1[name_1] = "\"" + attribute.initializer.text + "\"";
                        }
                        else if (isSyntaxKind(attribute.initializer, typescript_1.SyntaxKind.JsxExpression)) {
                            var expression = attribute.initializer.expression;
                            if (expression) {
                                if (isSyntaxKind(expression, typescript_1.SyntaxKind.ObjectLiteralExpression, typescript_1.SyntaxKind.ArrayLiteralExpression)) {
                                    configs_1[name_1] = expression.getText(sourceFile);
                                }
                            }
                        }
                    }
                });
                var values = [];
                for (var name_2 in configs_1) {
                    values.push(name_2 + ": " + configs_1[name_2]);
                }
                statements.push("Ext.create({" + values.join(', ') + "})");
            }
        }
        ts.forEachChild(node, traverse);
    }
    return statements;
}
exports.default = extractFromTSX;
function isSyntaxKind(node) {
    var kinds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        kinds[_i - 1] = arguments[_i];
    }
    return !!node && kinds.some(function (k) { return k === node.kind; });
}
//# sourceMappingURL=extractFromTSX.js.map