describe("RelMenu", function() {
    it("should auto-assign Menu to the parent button's menu config", function() {
        // ST.button('#button').click()
        // ST.component('#menu').visible();
        // ST.component('menuitem[text="Option 1"]').visible();
        // ST.component('menuitem[text="Option 2"]').visible();
        // ST.component('menuitem[text="Option 3"]').visible();
        
        ST.LOGME=true
        ST.navigate('#/RelMenu');
        // ST.component('button[text="Menu"]').click();   

        var menu = ST.component('#menu');

        menu.and(function(menu) {
            debugger
            console.log(menu.isVisible());
        })

        menu.visible();

        menu.and(function(menu) {
            debugger
            console.log(menu.isVisible());
        })
    });
});