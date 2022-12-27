(function ($) { 
    $.Set.ListForm = function (element) { 
        this.element = (element instanceof $) ? element : $(element);
    };
    $.Set.ListForm.prototype = {
        InitEvents: function () {
            var that = this;
            $("#ListFormToolbar").kendoToolBar({
                items: [
                    { type: "button", text: "Yeni", imageUrl: "/images/fileplus.png" },
                    { type: "button", text: "Değiştir", imageUrl: "/images/fileedit.png" },
                    { type: "button", text: "Sil", imageUrl: "/images/trash.png" },
                    { type: "button", text: "Filtre", imageUrl: "/images/filter.png" },
                    
                ]
            });
            $("#filterform").kendoForm({
                orientation: "horizontal",
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com",
                    Country: "1",
                    City: "Strasbourg",
                    AddressLine: "",
                    Email12: 1654,
                    Agree: false,
                    Agree1: false,
                    Agree2: false,
                    Agree3: false,
                    Agree4: new Date(),
                    Email123: new Date(),
                    Email125: new Date(),
                    Email126: false
                },
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 10
                },
                items: [
                    {
                        type: "group",
                        items: [
                            {
                                field: "FirstName",
                                label: "Proforma No:",
                                validation: { required: true }
                            },
                            { field: "LastName", label: "Proje No:", },
                            { field: "Email", label: "Teklif No", },
                            {
                                field: "Country1",
                                editor: "DropDownList",
                                label: "Statü",
                                validation: { required: true },
                                editorOptions: {
                                    optionLabel: "Select...",
                                    dataSource: [
                                        { Name: "France", Id: 1 },
                                        { Name: "Germany", Id: 2 },
                                        { Name: "Italy", Id: 3 },
                                        { Name: "Spain", Id: 4 }
                                    ],
                                    dataTextField: "Name",
                                    dataValueField: "Id"
                                }
                            },
                          

                        ]
                    },
                    {
                        type: "group",
                        items: [
                            {
                                field: "Country2",
                                editor: "MultiColumnComboBox",
                                label: "Müşteri Adı",
                                colSpan: 2,
                                editorOptions: {
                                    dataTextField: "ShipName",
                                    dataValueField: "OrderID",
                                    filter: "startswith",
                                    columns: [
                                        { field: "OrderID", title: "Order", width: 100 },
                                        { field: "ShipName", title: "Ship", width: 300 },
                                        { field: "ShipCountry", title: "Country", width: 200 }
                                    ],
                                    virtual: {
                                        itemHeight: 33,
                                        valueMapper: function (options) {
                                            $.ajax({
                                                url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                                                type: "GET",
                                                dataType: "jsonp",
                                                data: convertValues(options.value),
                                                success: function (data) {
                                                    options.success(data);
                                                }
                                            })
                                        }
                                    },
                                    height: 300,
                                    dataSource: {
                                        type: "odata",
                                        transport: {
                                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                                        },
                                        schema: {
                                            model: {
                                                fields: {
                                                    OrderID: { type: "number" },
                                                    Freight: { type: "number" },
                                                    ShipName: { type: "string" },
                                                    OrderDate: { type: "date" },
                                                    ShipCity: { type: "string" }
                                                }
                                            }
                                        },
                                        pageSize: 80,
                                        serverPaging: true,
                                        serverFiltering: true
                                    }
                                }
                            },
                            {
                                field: "Country3",
                                editor: "DropDownList",
                                label: "Satıcı Adı",
                                colSpan: 2,
                                editorOptions: {
                                    dataTextField: "ShipName",
                                    dataValueField: "OrderID",
                                    filter: "startswith",
                                    columns: [
                                        { field: "OrderID", title: "Order", width: 100 },
                                        { field: "ShipName", title: "Ship", width: 300 },
                                        { field: "ShipCountry", title: "Country", width: 200 }
                                    ],
                                    virtual: {
                                        itemHeight: 33,
                                        valueMapper: function (options) {
                                            $.ajax({
                                                url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                                                type: "GET",
                                                dataType: "jsonp",
                                                data: convertValues(options.value),
                                                success: function (data) {
                                                    options.success(data);
                                                }
                                            })
                                        }
                                    },
                                    height: 300,
                                    dataSource: {
                                        type: "odata",
                                        transport: {
                                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                                        },
                                        schema: {
                                            model: {
                                                fields: {
                                                    OrderID: { type: "number" },
                                                    Freight: { type: "number" },
                                                    ShipName: { type: "string" },
                                                    OrderDate: { type: "date" },
                                                    ShipCity: { type: "string" }
                                                }
                                            }
                                        },
                                        pageSize: 80,
                                        serverPaging: true,
                                        serverFiltering: true
                                    }
                                }
                            },

                            { field: "Email123", label: "Belge Tarihi", },
                            { field: "Email124", label: "Proforma Seri No", },

                        ]
                    },
                ],
                validateField: function (e) {
                    validationSuccess.html("");
                },
                submit: function (e) {
                    e.preventDefault();
                    validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
                },
                clear: function (ev) {
                    validationSuccess.html("");
                }
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
            var height = window.innerHeight - 170;
            
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

            $('#brazil').kendoExpansionPanel({
                title: 'Filtre',
                subTitle: '',
                expanded: false
            });
        },
        EditRow: function (e) {
            e.preventDefault();
            var entityGrid = $("#grid").data("kendoGrid");
            var data = entityGrid.dataItem(entityGrid.select());
            var page = window.open("/editform?id=" + data.BaseID, data.BaseID, 'width=1500,height=750');
            page.focus();
        },
        DeleteRow: function () {
            alert("Delete");
        }
    };
}(jQuery));

var list = new $.Set.ListForm(this.document);
list.InitEvents();

