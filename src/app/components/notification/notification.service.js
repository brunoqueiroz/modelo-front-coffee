'use strict';
angular.module('guideline.components.notification',[])
    .service('$noty', function() {
        var defaults, execute;
        defaults = {
            'text': null,
            'layout': 'center',
            'theme': 'noty_theme_twitter',
            'type': null,
            'animateOpen': {
                'height': 'toggle'
            },
            'animateClose': {
                'height': 'toggle'
            },
            'speed': 500,
            'timeout': 2000,
            'closeButton': true,
            'closeOnSelfClick': false,
            'closeOnSelfOver': false,
            'modal': false
        };
        execute = function(text, type, options) {
            var obj;
            if (typeof noty === 'undefined' || noty === null) {
                return;
            }
            obj = {
                text: text,
                type: type
            };
            if (options) {
                _.defaults(obj, options);
            }
            $.noty.closeAll();
            return noty(_.extend(defaults, obj));
        };
        return {
            info: function(text, options) {
                return execute(text, 'information', options);
            },
            error: function(text, options) {
                return execute(text, 'error', options);
            },
            success: function(text, options) {
                return execute(text, 'success', options);
            }
        };
    });