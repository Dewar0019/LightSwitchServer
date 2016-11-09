var searchVisible = 0;
var transparent = true;
var addTabOpen = false;
var deleteTabOpen = false;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;


$(document).ready(function() {
    console.log("documentloaded");



    
    var authenticate = function() {
        var username = document.getElementById("login-name").value;
        var password = document.getElementById("login-pass").value;
        if (username == "admin" && password == "1234") {
            document.location.href = "success";
        } else {
            alert("Your Username and Password combination was not recognized. Please try again");
        }
    }


    // $("#addButton").click(function() {
    //     if (!deleteTabOpen) {
    //         $("#addDeviceInput").slideDown();
    //     }
    //     addTabOpen = true;
    // })

    // $("#subtractButton").click(function() {
    //     if (!addTabOpen) {
    //         $("#deleteDevice").slideDown();
    //     }
    //     deleteTabOpen = true;
    // })

    // $("#cancelAdd").click(function() {
    //     $("#addDeviceInput").slideUp();
    //     addTabOpen = false;
    // })

    // $("#cancelDelete").click(function() {
    //     $("#deleteDevice").slideUp();
    //     deleteTabOpen = false;
    // })


    $('.rooms').click(function() {
        console.log("navigating to other room");
        var data = {};

        data.number = $(this).attr('room-id') + "";
        $.ajax({
            url: "/navigate",
            type: "POST",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            success: function(data, textStatus, jqXHR) {
                console.log("success");
                $(".result").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });

    $('#addroombutton').click(function() {
        console.log("click");
        var data = {};
        $.ajax({
            url: "/addRoom",
            type: "POST",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            success: function(data, textStatus, jqXHR) {
                $(".result").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });





    $(document).on('click', '#submitToDatabase', function(event) {
        console.log("click");
        var data = {};
        data.displayName = $("#roomname").val();
        data.building = $("#buildingname").val();
        data.roomLocation = $("#roomnumber").val();
        data.piName = $("#piname").val();
        data.piAddress = $("#piadd").val();
        data.devices = [];
        console.log(data);
        $.ajax({
            url: "/addRoomDatabase",
            type: "POST",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            success: function(data, textStatus, jqXHR) {
                console.log("Added new room to database");
                console.log(data);
                window.location.reload();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });


    $(document).on('click', '#deleteRoom', function(event) {
        var data = {};
        data.roomId = $('#addDevice').attr('current-room-id') + "";
        if (confirm("Are you sure you want to delete this room?")) {
            $.ajax({
                url: "/deleteRoom",
                type: "POST",
                data: data,
                contentType: "application/x-www-form-urlencoded",
                success: function(data, textStatus, jqXHR) {
                    console.log("Room succesfully removed");
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    });


    $("#toggle").click(function() {
        console.log("toggle");
        $("#scheduleForm").toggle("slow");
        $("#datepicker").datepicker();
    });



    //For adding a device
    $(document).on('click', '#addDevice', function(event) {
        event.preventDefault();
        var data = {};
        var info = $('#macInfo').val();
        //TODO: Apply mac address regex pattern here later
        if (info.length == 0) {
            alert("You must enter a value");
        } else {
            data.macAddress = info;
            data.id = $(this).attr('current-room-id') + "";
            $('#macInfo').val("");
        }
        console.log(data);
        $.ajax({
            url: "/addDevice",
            type: "POST",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            success: function(data, textStatus, jqXHR) {
                console.log("success");
                $(".result").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
                console.log(errorThrown);

            }
        });
    });



    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    // Init navigation toggle for small screens
    if (window_width <= 991) {
        lbd.initRightMenu();
    }

    //  Activate the tooltips
    // $('[rel="tooltip"]').tooltip();

    //      Activate the switches with icons
    if ($('.switch').length != 0) {
        $('.switch')['bootstrapSwitch']();
    }
    //      Activate regular switches
    if ($("[data-toggle='switch']").length != 0) {
        $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
    }

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

});

// activate collapse right menu when the windows is resized
$(window).resize(function() {
    if ($(window).width() <= 991) {
        lbd.initRightMenu();
    }
});

lbd = {
    misc: {
        navbar_menu_visible: 0
    },

    checkSidebarImage: function() {
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if (image_src !== undefined) {
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        }
    },
    initRightMenu: function() {
        if (!navbar_initialized) {
            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            $sidebar = $('.sidebar');
            sidebar_color = $sidebar.data('color');

            $logo = $sidebar.find('.logo').first();
            logo_content = $logo[0].outerHTML;

            ul_content = '';

            $navbar.attr('data-color', sidebar_color);

            // add the content from the sidebar to the right menu
            content_buff = $sidebar.find('.nav').html();
            ul_content = ul_content + content_buff;

            //add the content from the regular header to the right menu
            $navbar.children('ul').each(function() {
                content_buff = $(this).html();
                ul_content = ul_content + content_buff;
            });

            ul_content = '<ul class="nav navbar-nav">' + ul_content + '</ul>';

            navbar_content = logo_content + ul_content;

            $navbar.html(navbar_content);

            $('body').append($navbar);

            background_image = $sidebar.data('image');
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .addClass('has-image');
            }


            $toggle = $('.navbar-toggle');

            $navbar.find('a').removeClass('btn btn-round btn-default');
            $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
            $navbar.find('button').addClass('btn-simple btn-block');

            $toggle.click(function() {
                if (lbd.misc.navbar_menu_visible == 1) {
                    $('html').removeClass('nav-open');
                    lbd.misc.navbar_menu_visible = 0;
                    $('#bodyClick').remove();
                    setTimeout(function() {
                        $toggle.removeClass('toggled');
                    }, 400);

                } else {
                    setTimeout(function() {
                        $toggle.addClass('toggled');
                    }, 430);

                    div = '<div id="bodyClick"></div>';
                    $(div).appendTo("body").click(function() {
                        $('html').removeClass('nav-open');
                        lbd.misc.navbar_menu_visible = 0;
                        $('#bodyClick').remove();
                        setTimeout(function() {
                            $toggle.removeClass('toggled');
                        }, 400);
                    });

                    $('html').addClass('nav-open');
                    lbd.misc.navbar_menu_visible = 1;

                }
            });
            navbar_initialized = true;
        }

    }
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};