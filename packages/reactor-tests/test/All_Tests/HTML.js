describe("HTML", function() {
    it("should be rendered inside ExtReact components", function() {
        ST.navigate('#/HTMLInExtReactComponent')
        ST.component('#container').visible();
        ST.element('>> #html').text('test');
    });
});