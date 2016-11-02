const Missing = {};

export default function expectDOMStructure(domNode, expectedStructure) {
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