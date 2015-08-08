(function() {
    'use strict';

    angular
        .module('myApp.customFilters', [])

    .filter('sanitizeHtml', ['$sce', function($sce) {
        return function(text) {

            function decodeUnicode(input) {
                var e = document.createElement('div');
                e.innerHTML = input;
                return e.childNodes[0].nodeValue;
            }

            return $sce.trustAsHtml(decodeUnicode(text));

        };
    }]);

})();