module.exports = function(babel) {
    const t = babel.types;

    return {
        visitor: {
            ImportDeclaration: function(path) {
                const { node } = path;

                if (node.source && node.source.type === 'StringLiteral' && node.source.value === '@extjs/reactor') {
                    const declarations = [];

                    node.specifiers.forEach(spec => {
                        const imported = spec.imported.name;
                        const local = spec.local.name;

                        if (['reactify', 'install'].indexOf(imported) === -1) {
                            declarations.push(
                                t.variableDeclaration('const', [
                                    t.variableDeclarator(
                                        t.identifier(local),
                                        t.callExpression(
                                            t.identifier('reactify'),
                                            [t.stringLiteral(imported.toLowerCase())]
                                        )
                                    )
                                ])
                            );
                        }
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