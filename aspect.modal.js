jQuery(function ($) {
    $.aspectModal = function (message, setting) {
        var defaultSetting = {
            autoHide: {
                is: false,
                time: 6000
            },
            addClose: true
        };
        setting = $.extend(true, defaultSetting, setting);

        function hide_modal(modal) {
            modal.fadeIn(function() {
                modal.remove();
            });
        }

        var modal = $('<div>').addClass('aspect-modal');
        if(setting.addClose) {
            var modalClose = $('<a>').addClass('aspect-modal-close').html('&times;');
            modal.prepend(modalClose);
            modalClose.on('click', function() {
                hide_modal(modal);
            });
            modal.on('click', 'a', function() {
                hide_modal(modal);
            });
        }
        if(setting.autoHide.is) {
            window.setTimeout(hide_modal(modal), setting.autoHide.time);
        }
        modal.append(message);
        $('body').append(modal);
        modal.css({
            'margin-left': -modal.outerWidth() / 2,
            'margin-top': -modal.outerHeight() / 2
        });
        return modal;
    };
});