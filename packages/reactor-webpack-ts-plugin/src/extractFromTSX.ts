import * as ts from 'typescript'
import { SyntaxKind } from 'typescript'

const REACTIFY = 'reactify'
const REACTOR_MODULE_PATTERN = /^@extjs\/reactor$/
const COMPONENT_MODULE_PATTERN = /^@extjs\/(ext-react.*|(reactor\/(modern|classic)))$/

/**
 * Extracts Ext.create equivalents from jsx tags so that cmd knows which classes to include in the bundle
 * @param source The code
 * @param compilation The webpack compilation
 * @param scriptTarget The name of the file
 * @returns An array of Ext.create statements
 */
export default function extractFromTSX(source, compilation: any, scriptTarget: ts.ScriptTarget) : string[] {

    debugger;

    // need to specify the filename as *.tsx for tsc to parse JSX tags
    const sourceFile = ts.createSourceFile('foo.tsx', source, scriptTarget)
    const statements: string[] = []
    const types = {}
    let reactifyNames: string[] = []
    let reactorNames: string[] = []
    traverse(sourceFile)

    function addToTypes(name: string, arg: ts.Node) {
        if (isSyntaxKind<ts.StringLiteral>(arg, SyntaxKind.StringLiteral)) {
            const xtype = arg.text
            if (xtype) {
                types[name] = { xtype: `"${xtype.toLowerCase()}"` }
            }
        }
        else if (isSyntaxKind<ts.Identifier>(arg, SyntaxKind.Identifier)) {
            types[name] = { xclass: `"${arg.text}"` }
        }
    }

    function traverse(node: ts.Node) {
        if (isSyntaxKind<ts.ImportDeclaration>(node, SyntaxKind.ImportDeclaration)) {
            // `node.moduleSpecifier` is always `StringLiteral` by language spec.
            const moduleTokenName = (node.moduleSpecifier as ts.StringLiteral).text

            if (moduleTokenName.match(REACTOR_MODULE_PATTERN) && node.importClause) {
                if (isSyntaxKind<ts.NamespaceImport>(node.importClause.namedBindings, SyntaxKind.NamespaceImport)) {
                    // import * as reactor from '@extjs/reactor'
                    reactorNames.push(node.importClause.namedBindings.name.text)
                    reactifyNames = ['reactify']
                }
                else if (isSyntaxKind<ts.NamedImports>(node.importClause.namedBindings, SyntaxKind.NamedImports)) {
                    // import { reactify } from '@extjs/reactor'
                    const elements = node.importClause.namedBindings.elements
                    const reactifyNodes = elements.filter(e => {
                        return (e.propertyName && e.propertyName.text === REACTIFY) || (e.name.text === REACTIFY)
                    })
                    reactifyNames.push(...reactifyNodes.map(n => {
                        return n.name.text
                    }))
                }
            }
            else if (moduleTokenName.match(COMPONENT_MODULE_PATTERN) && node.importClause) {
                // import { Grid } from '@extjs/reactor/?
                if (isSyntaxKind<ts.NamedImports>(node.importClause.namedBindings, SyntaxKind.NamedImports)) {
                    const elements = node.importClause.namedBindings.elements
                    for (let e of elements) {
                        const value = e.propertyName ? e.propertyName.text.toLowerCase() : e.name.text.toLowerCase()
                        types[e.name.text] = { xtype: `"${value}"` }
                    }
                }
            }
        }
        // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
        // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.
        else if (isSyntaxKind<ts.VariableDeclaration>(node, SyntaxKind.VariableDeclaration)) {
            let call = isSyntaxKind<ts.CallExpression>(node.initializer, SyntaxKind.CallExpression) ?
                // reactify(...)
                node.initializer :
                (isSyntaxKind<ts.AsExpression>(node.initializer, SyntaxKind.AsExpression) &&
                    isSyntaxKind<ts.CallExpression>(node.initializer.expression, SyntaxKind.CallExpression)) ?
                    // reactor.reactify(...)
                    node.initializer.expression :
                    undefined

            if (call) {
                if ((isSyntaxKind<ts.PropertyAccessExpression>(call.expression, SyntaxKind.PropertyAccessExpression) &&
                    isSyntaxKind<ts.Identifier>(call.expression.expression, SyntaxKind.Identifier) &&
                    ~reactorNames.indexOf(call.expression.expression.text) &&
                    ~reactifyNames.indexOf(call.expression.name.text)) ||
                    (isSyntaxKind<ts.Identifier>(call.expression, SyntaxKind.Identifier) &&
                        ~reactifyNames.indexOf((call.expression as ts.Identifier).text))) {
                    if (isSyntaxKind<ts.Identifier>(node.name, SyntaxKind.Identifier)) {
                        // example: const Grid = reactify('grid');
                        const varName = node.name.text
                        const arg = call.arguments[0]
                        if (arg) {
                            addToTypes(varName, arg)
                        }
                    }
                    else if (isSyntaxKind<ts.ArrayBindingPattern>(node.name, SyntaxKind.ArrayBindingPattern)) {
                        // example: const [ Grid, Panel ] = reactify('grid', SomePanel);
                        for (let i = 0; i < node.name.elements.length; i++) {
                            const element = node.name.elements[i]
                            if (isSyntaxKind<ts.BindingElement>(element, SyntaxKind.BindingElement) &&
                                isSyntaxKind<ts.Identifier>(element.name, SyntaxKind.Identifier)) {
                                const tagName = element.name.text
                                const arg = call.arguments[i]
                                if (tagName && arg) {
                                    addToTypes(tagName, arg)
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (isSyntaxKind<ts.JsxSelfClosingElement | ts.JsxOpeningElement>(node, SyntaxKind.JsxSelfClosingElement, SyntaxKind.JsxOpeningElement) &&
            isSyntaxKind<ts.Identifier>(node.tagName, SyntaxKind.Identifier)) {
            // convert reactified components to Ext.create calls to put in the manifest
            const type = types[node.tagName.text]
            if (type) {
                const configs = { ...type };

                node.attributes.forEach(attribute => {
                    if (isSyntaxKind<ts.JsxAttribute>(attribute, SyntaxKind.JsxAttribute)) {
                        const name = attribute.name.text
                        if (isSyntaxKind<ts.StringLiteral>(attribute.initializer, SyntaxKind.StringLiteral)) {
                            configs[name] = `"${attribute.initializer.text}"`
                        }
                        else if (isSyntaxKind<ts.JsxExpression>(attribute.initializer, SyntaxKind.JsxExpression)) {
                            const { expression } = attribute.initializer
                            if (expression) {
                                if (isSyntaxKind<ts.ObjectLiteralExpression | ts.ArrayLiteralExpression>(expression, SyntaxKind.ObjectLiteralExpression, SyntaxKind.ArrayLiteralExpression)) {
                                    configs[name] = expression.getText(sourceFile)
                                }
                            }
                        }
                    }
                })

                const values: string[] = []

                for (let name in configs) {
                    values.push(`${name}: ${configs[name]}`)
                }

                statements.push(`Ext.create({${values.join(', ')}})`)
            }
        }
        ts.forEachChild(node, traverse)
    }

    return statements;
}

function isSyntaxKind<T extends ts.Node>(node: ts.Node | undefined, ...kinds: SyntaxKind[]): node is T {
    return !!node && kinds.some(k => k === node.kind)
}
