(function ($) {
    $.aspectModal = function (message, setting) {
        var defaultSetting = {
            autoHide: {
                is: false,
                time: 6000
            },
            addClose: true,
            overlay: true
        };
        setting = $.extend(true, defaultSetting, setting);

        function hide_modal(modal) {
            if (overlay.children().length > 1 || !setting.overlay) {
                modal.fadeIn(function () {
                    modal.remove();
                });
            } else {
                overlay.fadeIn(function () {
                    overlay.remove();
                    $('body').css({
                        'overflow':'auto'
                    });
                });
            }
        }

        var modal = $('<div>').addClass('aspect-modal');
        if (setting.addClose) {
            var modalClose = $('<a>').addClass('aspect-modal-close').html('&times;');
            modal.prepend(modalClose);
            modalClose.on('click', function () {
                hide_modal(modal);
            });
            modal.on('click', 'a', function () {
                hide_modal(modal);
            });
        }
        if (setting.autoHide.is) {
            window.setTimeout(hide_modal(modal), setting.autoHide.time);
        }
        modal.append(message);
        if (setting.overlay) {
            var overlay = $('.aspect-modal-overlay');
            if(overlay.length < 1) {
                overlay = $('<div>').addClass('aspect-modal-overlay');
                $('body').append(overlay).css({
                    'overflow':'hidden'
                });
            }
            overlay.append(modal);
        } else {
            $('body').append(modal);
        }
        modal.css({
            'margin-left': ($(window).width() - modal.outerWidth()) / 2,
            'margin-top': ($(window).height() - modal.outerHeight()) / 2
        });
        return modal;
    };
}(jQuery));