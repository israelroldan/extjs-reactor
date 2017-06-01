describe("TemplateGrid", function() {
    it('should render React elements returned by cell tpl', function() {
        ST.navigate('#/TemplateGrid')
        ST.element('>> .item')
            .visible()
            .text('Mark Brocato');
    })
});