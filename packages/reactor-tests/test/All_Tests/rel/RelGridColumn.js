describe("RelGridColumn", function() {
    it("should auto-assign column, nested column, cell, and widget from children", function() {
        ST.navigate('#/RelGridColumn')

        ST.component('#grid').and(grid => {
            const columns = grid.getColumns();
            expect(columns.length).toBe(3);
        });

        ST.component('#grid gridrow #sparkLine').visible();
    });
});