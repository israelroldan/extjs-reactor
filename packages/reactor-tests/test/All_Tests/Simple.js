describe("Simple", function() {
    ST.navigate('#/Simple')

    it('should render the button', function() {
        ST.component('#button')
            .visible()
            .get('text')
            .and(function() {
                expect(this.future.data.text).toBe('Click Me')
            });
    })
});