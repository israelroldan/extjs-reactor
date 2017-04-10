describe("RelUpdate", function() {
    it("should add and remove the menu", function() {
        ST.navigate('#/RelUpdate');
        // ST.button('button[text="Toggle Menu"]').click();
        ST.button('button[text="Menu"]').click();
        ST.component('#menu').visible();
        ST.component('menuitem[text="Option 1"]').visible();
        ST.component('menuitem[text="Option 2"]').visible();
        ST.component('menuitem[text="Option 3"]').visible();

        ST.button('button[text="Toggle Menu"]').click();
        ST.component('#menu').destroyed();
    });
});