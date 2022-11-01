var app = Sammy('#content', function () {
    //this.use('Mustache');

    this.get('#/', function (ctx) {
        ctx.redirect('#/');
    });

    this.get('#/ListForm/:id', function (ctx) {
        /*//ctx.redirect('#/contact');*/
        //var content = { user: 'henriquegogo', gender: 'male' }
        //ctx.partial('#/contact', user);
        ctx.partial('#/ListForm');
    });

    this.get('#/EditForm', function (ctx) {
        /*//ctx.redirect('#/contact');*/
        //var content = { user: 'henriquegogo', gender: 'male' }
        //ctx.partial('#/contact', user);
        ctx.partial('#/EditForm');
    });
    this.get('#/contact', function (ctx) {
        /*//ctx.redirect('#/contact');*/
        //var content = { user: 'henriquegogo', gender: 'male' }
        //ctx.partial('#/contact', user);
        ctx.partial('#/contact');
    });
    this.get('#/api/test', function (context) {
        $.ajax({
            url: "http://localhost:8080/home/stats",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                context.app.swap('');
                context.load('partials/home.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        getFunctionality();

                    });
            }
        });
    });
    this.post('#/send', function (ctx) {
        $.post('send.rb', ctx.params, function () {
            ctx.redirect('#/home');
        });
    });
}).run('#/');
