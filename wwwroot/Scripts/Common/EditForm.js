(function ($) {
    $.Set.EditForm = function (element) {
        this.element = (element instanceof $) ? element : $(element);
    };
    $.Set.EditForm.prototype = {
        InitEvents: function () {
            var that = this;
            $("#toolbar").kendoToolBar({
                items: [
                    { type: "button", text: "Yeni", imageUrl: "/images/fileplus.png" },
                    { type: "button", text: "Kaydet", imageUrl: "/images/floppydisk.png" },
                    { type: "button", text: "Kaydet&Kapat", imageUrl: "/images/floppydisk2.png" },
                    { type: "button", text: "Sil", imageUrl: "/images/trash.png" },
                ]
            });
            var validationSuccess = $("#validation-success");

            function convertValues(value) {
                var data = {};

                value = $.isArray(value) ? value : [value];

                for (var idx = 0; idx < value.length; idx++) {
                    data["values[" + idx + "]"] = value[idx];
                }

                return data;
            }
            $("#Editform").kendoForm({
                //orientation: "vertical",
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
                    cols: 3,
                    gutter: 10
                },
                items: [
                    {
                        type: "group",
                        label: "Proforma ve Fatura Girişi",
                        layout: "grid",
                        grid: { cols: 2, gutter: 5 },
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
                            { field: "Email125", label: "Geçerelilik Tarihi", },
                            { field: "Email126", label: "Süresiz", },
                            {
                                field: "Email127",
                                editor: "DropDownList",
                                label: "Para Birimi",
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
                            }, {
                                field: "Email128",
                                editor: "DropDownList",
                                label: "Kur Sabitleme",
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
                            }, {
                                field: "Email129",
                                editor: "DropDownList",
                                label: "Kur Belirleme Zamanı",
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
                            }, {
                                field: "Email130",
                                editor: "DropDownList",
                                label: "Kur Belirleme Tipi",
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
                        layout: "grid",
                        label: "-",
                        grid: { cols: 2, gutter: 5 },
                        items: [
                            {
                                field: "Country",
                                editor: "DropDownList",
                                label: "Geçici İhracat",
                                validation: { required: true },
                                colSpan: 1,
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
                            {
                                field: "Country4",
                                editor: "DropDownList",
                                label: "Transit Tic.",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country12",
                                editor: "DropDownList",
                                label: "Çıkış yeri",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country5",
                                editor: "DropDownList",
                                label: "Varış Yeri",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country6",
                                editor: "DropDownList",
                                label: "Satici Ulkesi",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country7",
                                editor: "DropDownList",
                                label: "Menşei Ülke",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country8",
                                editor: "DropDownList",
                                label: "Yeni / 2. El",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country9",
                                editor: "DropDownList",
                                label: "ithal / Yerli",
                                validation: { required: true },
                                colSpan: 1,
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
                            }, {
                                field: "Country10",
                                editor: "DropDownList",
                                label: "İskonto Tipi",
                                validation: { required: true },
                                colSpan: 1,
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
                            {
                                field: "Email12",
                                label: "İskonto Tutarı",
                                editor: "NumericTextBox",
                            }
                            , {
                                field: "Country11",
                                editor: "DropDownList",
                                label: "Teslim Şekli",
                                validation: { required: true },
                                colSpan: 1,
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
                        layout: "grid",
                        label: "-",
                        grid: { cols: 2, gutter: 5 },
                        items: [
                            { field: "Agree", label: "Antrepo Devir" },
                            { field: "Agree1", label: "Serbest Bölge" },
                            { field: "Agree2", label: "Nak. Sigorta Satıcıda" },
                            { field: "Agree3", label: "Nakliye Satıcıda" },
                            { field: "Agree4", label: "Teslim/Yükleme Tarihi", colSpan: 2 },
                            {
                                field: "Country31",
                                editor: "DropDownList",
                                label: "Kira Başlangıcı",
                                validation: { required: true },
                                colSpan: 2,
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
                            {
                                field: "Country32",
                                editor: "DropDownList",
                                label: "Teşvik Durumu",
                                validation: { required: true },
                                colSpan: 2,
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
                            {
                                field: "Country33",
                                editor: "DropDownList",
                                label: "Faiz Destek Durumu",
                                validation: { required: true },
                                colSpan: 2,
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
                    }

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
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    serverPaging: true,
                    serverSorting: true,
                    pageSize: 20,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    }
                },
                height: 300,
                scrollable: {
                    virtual: true
                },
                loaderType: "skeleton",
                sortable: true,
                editable: "incell",
                pageable: true,
                sortable: true,
                navigatable: true,
                resizable: true,
                reorderable: true,
                groupable: true,
                filterable: true,
                toolbar: ["excel", "pdf", "search"],
                columns: [
                    { field: "OrderID", title: "Order ID", width: 110 },
                    { field: "CustomerID", title: "Customer ID", width: 130 },
                    { field: "ShipName", title: "Ship Name", width: 280 },
                    { field: "ShipAddress", title: "Ship Address" },
                    { field: "ShipCity", title: "Ship City", width: 160 },
                    { field: "ShipCountry", title: "Ship Country", width: 160 }
                ]
            });

            var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: crudServiceBaseUrl + "/Products",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            dataType: "jsonp"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            dataType: "jsonp"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return { models: kendo.stringify(options.models) };
                            }
                        }
                    },
                    batch: true,
                    pageSize: 20,
                    schema: {
                        model: {
                            id: "ProductID",
                            fields: {
                                ProductID: { editable: false, nullable: true },
                                ProductName: { validation: { required: true } },
                                UnitPrice: { type: "number", validation: { required: true, min: 1 } },
                                Discontinued: { type: "boolean" },
                                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                            }
                        }
                    }
                });

            $("#grid1").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 300,
                toolbar: ["create"],
                columns: [
                    { field: "ProductName", title: "Product Name" },
                    { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                    { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                    { field: "Discontinued", width: "120px" },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
                editable: "popup"
            });

            $('#brazil').kendoExpansionPanel({
                title: 'Mal Detayı',
                subTitle: '',
                expanded: true
            });

            $('#chile').kendoExpansionPanel({
                title: 'Satıcı Ödeme Planı',
                subTitle: '',
                expanded: true
            });
        }
    };
    if ($.Set.Theme != undefined) {
        var css = $('link[href^="/kendoui-styles/"]')[1];
        css.href = '/kendoui-styles/' + $.cookie('theme') + '.css';
    }


}(jQuery));
var form = new $.Set.EditForm(this.document);
form.InitEvents();


