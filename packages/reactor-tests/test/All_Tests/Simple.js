describe("Simple", function() {
    it('should render the button', function() {
        ST.navigate('#/Simple')
        ST.component('#button')
            .visible()
            .get('text')
            .and(function() {
                expect(this.future.data.text).toBe('Click Me')
            });
    })
});