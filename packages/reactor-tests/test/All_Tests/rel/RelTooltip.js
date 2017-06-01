describe("RelTooltip", function() {
    it("should auto-assign tooltip from children", function() {
        ST.navigate('#/RelTooltip')
        
        ST.play([
            {target: '#button', type: 'mouseover'}
        ]);

        ST.component('#tooltip')
            .visible()
            .text('I am a tooltip');
    });
});