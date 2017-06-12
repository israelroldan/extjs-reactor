const OLD_MODULE_PATTERN = /^@extjs\/reactor\/modern$/;
const MODULE_PATTERN = /^@extjs\/(ext-react.*|reactor\/classic)$/;

module.exports = function(babel) {
    const t = babel.types;

    return {
        visitor: {
            ImportDeclaration: function(path) {
                const { node } = path;

                if (node.source && node.source.type === 'StringLiteral' && (node.source.value.match(MODULE_PATTERN) || node.source.value.match(OLD_MODULE_PATTERN))) {
                    const declarations = [];
                    let transform = false;

                    node.specifiers.forEach(spec => {
                        const imported = spec.imported.name;
                        const local = spec.local.name;

                        declarations.push(
                            t.variableDeclaration('const', [
                                t.variableDeclarator(
                                    t.identifier(local),
                                    t.callExpression(
                                        t.identifier('reactify'),
                                        [t.stringLiteral(imported)]
                                    )
                                )
                            ])
                        );
                    });

                    if (declarations.length) {
                        if (!path.scope.hasBinding('reactify')) {
                            path.insertBefore(
                                t.importDeclaration(
                                    [t.importSpecifier(t.identifier('reactify'), t.identifier('reactify'))],
                                    t.stringLiteral('@extjs/reactor')
                                )
                            )
                        }

                        path.replaceWithMultiple(declarations);
                    }
                }
            }
        }
    }
}