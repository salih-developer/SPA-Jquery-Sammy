(function ($) { 
    $.Set.ListForm = function (element) { 
        this.element = (element instanceof $) ? element : $(element);
    };
    $.Set.ListForm.prototype = {
        InitEvents: function () {
            var that = this;
            $("#ListFormToolbar").kendoToolBar({
                items: [
                    { type: "button", text: "Yeni" },
                    { type: "button", text: "Değiştir" },
                    { type: "button", text: "Sil" },
                    
                ]
            });

           

            var dataSource = new kendo.data.DataSource({
                type: "json",
                transport: {
                    read: "http://localhost:12667/edit-form-data/alpha"
                },
                serverFiltering: true,
                schema: {
                    model: {
                        id: "BaseID",
                        fields: {
                            ProformaID: { type: "string" },
                            BelgeTarihi: { type: "string" },
                            BelgeSeriNumarasi: { type: "string" },
                            MalAdi: { type: "string" }
                        }
                    }
                },
                pageSize: 20
            });

            //$("#filter").kendoFilter({
            //    dataSource: dataSource,
            //    expressionPreview: false,
            //    applyButton: true,
            //    expression: {
            //        logic: "or",
            //        filters: [
            //            { field: "ContactTitle", value: "Sales Representative", operator: "eq" }
            //        ]
            //    }
            //});
            var height = window.innerHeight - 100;
            
            $("#grid").kendoGrid({
                dataSource: dataSource,
                resizable: true,
                sortable: true,
                height: height,
                scrollable: true,
                excel: {
                    allPages: true,
                    filterable: true
                },
                pdf: {
                    allPages: true,
                    filterable: true
                },
                pageable: {
                    alwaysVisible: true,
                    pageSizes: [10, 50, 100, 250, 500]
                },
                persistSelection: true,
                navigatable: true,
                selectable: "row",
                filterable: {
                    mode: "row",
                    ignoreCase: true
                },
                columnMenu: true,
                reorderable: true,
                columns: [
                    { command: [{ click: function (e) { that.EditRow(e); }, name: "Değiştir", iconClass: "k-icon k-i-edit", text: "" }, { click: function (e) { that.DeleteRow(e); }, name: "sil", iconClass: "k-icon k-i-delete", text: "" }], width: 100 },
                    {
                        field: "BaseID",
                        title: "BaseID",
                        hidden: true
                    }, 
                    {
                        field: "ProformaID",
                        title: "ProformaID"
                }, {
                        field: "MalAdi",
                        title: "MalAdi"
                }, {
                        field: "BelgeTarihi",
                        title: "BelgeTarihi"
                }, {
                        field: "BelgeSeriNumarasi"
                    }],
                dataBound: function (e) {
                    var items = e.sender.items();
                    items.each(function (idx, item) {
                        if (e.sender.dataItem(item).rowColor !== undefined) {
                            $(item).addClass(e.sender.dataItem(item).rowColor);
                        }
                    });

                    e.sender.select("tr:eq(0)");
                    var height = window.innerHeight;
                    e.sender.options.height = height;
                    $("#grid").data("kendoGrid").resize();
                },
            });

            //var filter = $("#filter").getKendoFilter();
            //filter.applyFilter();

            //$("#save").click(function (e) {
            //    e.preventDefault();
            //    localStorage["kendo-filter-options"] = kendo.stringify(filter.getOptions());
            //});

            $("#load").click(function (e) {
                e.preventDefault();
                var options = localStorage["kendo-filter-options"];
                if (options) {
                    options = JSON.parse(options);
                    options.dataSource = dataSource;
                    filter.setOptions(options);
                    filter.applyFilter();
                    
                }
            });
            $("#grid").on("dblclick", "tr.k-master-row.k-selected", function (e) {
                that.EditRow(e);
            });
            $("#grid").kendoTooltip({
                show: function (e) {
                    if (this.content.text().trim().length != "") {
                        this.content.parent().css('visibility', 'visible');
                    } else {
                        this.content.parent().css('visibility', 'hidden');
                    }
                },
                hide: function (e) {
                    this.content.parent().css("visibility", "hidden");
                },
                filter: "td:not(.k-detail-cell)", //this filter selects the second column's cells
                position: "top",
                width: "auto",
                content: function (e) {
                    var content = e.target.text();
                    if (content == "")
                        return null;
                    return content;
                }
            }).data("kendoTooltip");
        },
        EditRow: function (e) {
            e.preventDefault();
            var entityGrid = $("#grid").data("kendoGrid");
            var data = entityGrid.dataItem(entityGrid.select());
            var page = window.open("/editform?id=" + data.BaseID, data.BaseID, 'width=1000,height=1000');
            page.focus();
        },
        DeleteRow: function () {
            alert("Delete");
        }
    };
}(jQuery));



