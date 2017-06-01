describe("ReplaceNodeWithMarkup", function() {
    it('add and remove ExtReact components when swapping between null and an ExtReact component in a composite component', function() {
        ST.navigate('#/ReplaceNodeWithMarkup')
        var toggleChild = ST.component('#toggleChild')
        toggleChild.click();
        var child = ST.component('#child');
        child.visible();
        toggleChild.click();
        child.destroyed();
    })
});