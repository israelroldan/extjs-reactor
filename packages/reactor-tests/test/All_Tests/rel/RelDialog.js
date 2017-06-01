describe("RelDialog", function() {
    it('should assign child Buttons as the buttons config', function() {
        ST.navigate('#/RelDialog');

        ST.component('dialog').and(dialog => {
            expect(dialog.getButtons().items.length).toBe(1);
            ST.button('#button').click();
        });
    });
});