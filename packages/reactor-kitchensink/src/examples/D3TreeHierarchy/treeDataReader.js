const addTreeLevel = (data, fieldName, fieldsToCopy, notBlank) => {
    const tree = [];
    let currentValue, parentItem;

    data.forEach(item => {
        if (item[fieldName] != currentValue) {
            currentValue = item[fieldName];
            parentItem = {};
            parentItem[fieldName] = currentValue;
            parentItem.text = currentValue;
            fieldsToCopy.forEach(field => {
                parentItem[field] = item[field];
            });
            parentItem.children = [];
            tree.push(Ext.apply(parentItem));
        }
        if (item[notBlank]) {
            if (Ext.isEmpty(item.children)) {
                item.leaf = true;
            }
            if (Ext.isEmpty(item.text)) {
                item.text = item[notBlank];
            }
            tree[tree.length - 1].children.push(item);
        }
    });

    return tree;
};

export default function readTreeData(response) {
    let data = JSON.parse(response.responseText);
    data = addTreeLevel(data, 'industry_type', ['salary', 'state'], 'industry');
    return addTreeLevel(data, 'state', [], 'state');
}