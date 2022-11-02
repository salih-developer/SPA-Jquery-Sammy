(function ($) { 
    $.Set = function (element) { 
        this.element = (element instanceof $) ? element : $(element);
    };
    $.Set.prototype = {
        InitEvents: function () {
           
        }
    };
    Object.defineProperty($.Set, 'ServiceUrl', { value: "", writable: true });
    Object.defineProperty($.Set, 'Theme', { value: "", writable: true });
    if ($.cookie('theme') === '')
        $.cookie('theme', 'kendo.bootstrap.min');
}(jQuery));



