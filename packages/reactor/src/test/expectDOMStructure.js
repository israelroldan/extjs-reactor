const Missing = {};

export default function expectDOMStructure(domNode, expectedStructure) {
    // console.log('expected:\n' + JSON.stringify(expectedStructure, null, '\t'));
    // console.log('actual:\n' + domNode.outerHTML);
    expect(domNode).toBeDefined();
    expect(domNode.nodeName).toBe(expectedStructure.nodeName);

    for (let prop in expectedStructure) {
        if (!expectedStructure.hasOwnProperty(prop)) continue;
        if (prop != 'nodeName' && prop != 'children') {
            if (expectedStructure[prop] === Missing) {
                expect(domNode.hasAttribute(prop)).toBe(false);
            } else {
                expect(domNode.getAttribute(prop)).toBe(expectedStructure[prop]);
            }
        }
    }

    if (expectedStructure.children) {
        expectedStructure.children.forEach((subTree, index) => {
            expectDOMStructure(domNode.childNodes[index], subTree);
        });
    }
}