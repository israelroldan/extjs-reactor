describe("RelMenu", function() {
    it("should auto-assign Menu to the parent button's menu config", function() {
        ST.navigate('#/RelMenu')
        ST.component('#button').click()
        var menu = ST.component('#menu')
        menu.visible();
        ST.component('menuitem[text="Option 1"]').visible();
        ST.component('menuitem[text="Option 2"]').visible();
        ST.component('menuitem[text="Option 3"]').visible();
    });
});