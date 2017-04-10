describe("Rel", function() {
    ST.navigate('#/Rel')

    it('should assign an element to a config when a rel prop is present', function() {
        // ST.component('#button').click()
        var menu = ST.component('#menu')
        
        menu.and(function(m) {
            console.log(m.isVisible());
            debugger;
        });
        
        debugger;
        menu.visible();
        ST.component('menuitem[text="Option 1"]').visible();
        ST.component('menuitem[text="Option 2"]').visible();
        ST.component('menuitem[text="Option 3"]').visible();
    });
});