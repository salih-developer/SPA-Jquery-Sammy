(function ($) { 
    $.Set = function (element) { 
        this.element = (element instanceof $) ? element : $(element);
    };
    $.Set.prototype = {
        InitEvents: function () {
           
        }
    };
    Object.defineProperty($.Set, 'ServiceUrl', { value: "" });
}(jQuery));



