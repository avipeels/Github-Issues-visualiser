/**
 * Directive used to validate the url entered by the user is in valid format or not
 */
(function () {
    'use strict';
    myModule.directive('github-url-validator', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.email = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return function (value) {
                        var validUrl = "https://github.com/" + /^.$/;
                        if (validUrl.test(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }]);
}());
