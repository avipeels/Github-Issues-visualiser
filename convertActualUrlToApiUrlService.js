/**
 * This service used to convert the end user's github project/repo url to github api endpoint url
 * For example, if user enters "https://github.com/avipeels/Angular-WebApi", it will be converted to
 * https://api.github.com/repos/avipeels/Angular-WebApi. Since, the api endpoints can be reached via api.github.com from $http
 * calls
 */
(function () {
    'use strict';
    myModule.service('convertActualUrlToApiUrl', [function () {
        var baseUrl = 'https://api.github.com/repos/';
        var apiUrl = ""; //Eg: https://api.github.com/repos/avipeels/Angular-WebApi
        return {
            convert: function (actualUrl) { //Eg: convert  to
                apiUrl = actualUrl.replace(actualUrl.substring(0, 19), baseUrl);
                return apiUrl;
            }
        }
    }]);
}());
