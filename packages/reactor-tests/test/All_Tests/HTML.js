describe("HTML", () => {
    it("should be rendered inside ExtReact components", () => {
        ST.navigate('#/HTMLInExtReactComponent')
        ST.component('#container').visible();
        ST.element('>> #html').text('test');
    });
});