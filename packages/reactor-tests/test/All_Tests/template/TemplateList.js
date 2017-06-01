describe("TemplateList", function() {
    it('should render React elements returned by itemTpl', function() {
        ST.navigate('#/TemplateList')
        ST.element('.item').visible();
    })
});