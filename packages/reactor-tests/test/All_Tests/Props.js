describe("Props", () => {
    it("changing a prop should update the corresponding config", () => {
        ST.navigate('#/SimplePropUpdate')
        
        ST.component('#button')
            .text('Count: 0')
            .click()
            .text('Count: 1');
    });
});