$(function () {
    $("#drawer").kendoDrawer({
        template: "  <input class='form-control k- textbox' placeholder='Search' /> <div id='treeview-left'></div>",
        mode: "push",
        mini: false,
        itemClick: function (e) {
        },
        autoCollapse: false,
        position: 'left',
        swipeToOpen: true
    });
    function toggleDrawer() {
        var drawerInstance = $("#drawer").data().kendoDrawer;
        var drawerContainer = drawerInstance.drawerContainer;

        if (drawerContainer.hasClass("k-drawer-expanded")) {
            drawerInstance.hide();
        } else {
            drawerInstance.show();
        }
    }

    $("#toolbar").kendoToolBar({
        items: [
            { type: "button", icon: "menu", attributes: { "class": "k-flat" }, click: toggleDrawer },
            { template: "<h3 style='margin-left: 20px;'>Set Project</h3>" },
            { template: "<label>Theme:</label><input id='themeShape' />", overflow: "never" },
        ]
    });
    $("#themeShape").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Bootstrap", value: "kendo.bootstrap.min" },
            { text: "Bootstrap-urban", value: "kendo.bootstrap-urban.min" },
            { text: "Fiori", value: "kendo.fiori.min" },
            { text: "Flat", value: "kendo.flat.min" },
            { text: "High Constrast", value: "kendo.highcontrast.min" },
            { text: "Office", value: "kendo.office365.min" },
            { text: "material", value: "kendo.material-v2.min" },
            { text: "Set", value: "Set" },
            //{ text: "Rectangle", value: "" },
            //{ text: "Rectangle", value: "" },
            //{ text: "Rectangle", value: "" },
        ],
        change: function () {
            var css = $('link[href^="/kendoui-styles/"]')[1];
            css.href = '/kendoui-styles/' + this.value() + '.css';
            $.cookie('theme', this.value());
        }
    });
    var inlineDefault = new kendo.data.HierarchicalDataSource({
        data: [
            {
                "text": "Onay Süreci", "items": [
                    { "text": "Onay Havuzu", "id": "1" },
                    { "text": "Onay Süreç Tanımları", "id": "2" },
                    { "text": "Kontrol Listesi Tanımı", "id": "3" }
                ]
            },
            {
                "text": "Satış", "items": [
                    {
                        "text": "Teklif Başvuru",
                        "items": [
                            { "text": "Proforma Girişi", "id": "4" },
                            { "text": "Proforma Arama Tarihçesi", "id": "5" }]
                    },

                ]
            }
        ]
    });
    $("input").on("input", function () {
        var query = this.value.toLowerCase();
        var dataSource = $("#treeview-left").data("kendoTreeView").dataSource;

        filter(dataSource, query);
    });
    $("#treeview-left").kendoTreeView({
        dataSource: inlineDefault,
        select: function (e) {
            var node = e.node;
            var treeview = $("#treeview-left").data("kendoTreeView");
            var dataItem = treeview.dataItem(node);
            if (dataItem.id !== undefined && dataItem.id !=="")
                app.setLocation("#/ListForm/" + dataItem.id);
        }
    });
    // Sets the "hidden" field on items that match the query.
    function filter(dataSource, query) {
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var text = item.text.toLowerCase();
            var itemVisible =
                query === true // parent already matches
                || query === "" // query is empty
                || text.indexOf(query) >= 0; // item text matches query

            var anyVisibleChildren = filter(item.children, itemVisible || query); // pass true if parent matches

            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

            item.hidden = !itemVisible && !anyVisibleChildren;
        }

        if (data) {
            // Re-apply the filter on the children.
            dataSource.filter({ field: "hidden", operator: "neq", value: true });
        }

        return hasVisibleChildren;
    }
    $("#drawer").data().kendoDrawer.show();
});