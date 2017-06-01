describe("Components with a defaults prop", function() {
    it("should set props in children", function() {
        ST.navigate('#/Defaults')
        ST.button('#button').text('Button');
    });
});