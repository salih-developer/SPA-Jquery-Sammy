$(function () {
    $("#drawer").kendoDrawer({
        template: " <div id='treeview-left'></div>",
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
            //{ text: "Rectangle", value: "" },
            //{ text: "Rectangle", value: "" },
            //{ text: "Rectangle", value: "" },
        ],
        change: function () {
            var css = $('link[href^="/kendoui-styles/"]')[1];
            css.href = '/kendoui-styles/' + this.value() + '.css';
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

    $("#drawer").data().kendoDrawer.show();
});