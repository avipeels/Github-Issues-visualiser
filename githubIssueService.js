/**
 * $http calls made through the factory, injected to controller
 */
(function () {
    myModule.factory('githubIssueService', ['$http', function ($http) {
        'use strict';
        var dataFactory = {};
        dataFactory.getOpenIssues = function (githubUrl) { //get the open and closed issues from github
            return $http.get(githubUrl);
        };
        dataFactory.getClosedIssues = function (githubUrl) { //get the open and closed issues from github
            return $http.get(githubUrl + "/issues/events");
        };
        return dataFactory;
  }]);
}());
