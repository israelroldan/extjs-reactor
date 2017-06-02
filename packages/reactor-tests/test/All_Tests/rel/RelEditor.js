describe("RelEditor", function() {
    it('should assign child fields as the editor config in columns', function() {
        ST.navigate('#/RelEditor');
        
        ST.play([
            { type: "tap", target: "#ext-gridcell-1", x: 36, y: 20, identifier: 1 },
            { type: "tap", target: "#ext-gridcell-1", x: 36, y: 20, identifier: 1 },
            { type: "dblclick", target: "#ext-gridcell-1", x: 36, y: 20, detail: 2 }
        ]);
        
        ST.grid('#grid').rowAt(0).cellAt(0).and(cell => {
            // cell is still a future. How do I resolve this to an Ext.grid.cell.Cell?
        })
        
        ST.component('.my-field').visible();
    });
});