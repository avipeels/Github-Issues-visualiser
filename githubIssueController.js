(function () {

    myModule.service('convertActualUrlToApiUrl', [function () {
        var baseUrl = 'https://api.github.com/repos/';
        var apiUrl = ""; //Eg: https://api.github.com/repos/avipeels/Angular-WebApi
        return {
            convert: function (actualUrl) { //Eg: convert https://github.com/avipeels/Angular-WebApi to https://api.github.com/repos/avipeels/Angular-WebApi
                apiUrl = actualUrl.replace(actualUrl.substring(0, 19), baseUrl);
                return apiUrl;
            },
            isValidRepo: function (url) {

            }
        }
    }]);

    myModule.factory('githubIssueService', ['$http', function ($http) {

        var dataFactory = {};
        dataFactory.getOpenIssues = function (githubUrl) { //get the open and closed issues from github
            return $http.get(githubUrl);
        };
        dataFactory.getClosedIssues = function (githubUrl) { //get the open and closed issues from github
            return $http.get(githubUrl + "/issues/events");
        };

        //        dataFactory.isValidRepo=function(githubUrl){ // check if the repositary entered is valid or not
        //            if($http.get(githubUrl).then(function(response){
        //
        //            }));
        //        }
        return dataFactory;
  }]);

    myModule.controller('myCtrl', ['$scope', 'githubIssueService', '$timeout', 'convertActualUrlToApiUrl', function ($scope, githubIssueService, $timeout, convertActualUrlToApiUrl) {

            var _githubrepoUrl = "";

            $scope.searchGithub = function () {
                var _openIssueCount = "";
                var _closedIssueCount = "";

                _githubrepoUrl = convertActualUrlToApiUrl.convert($scope.githubAccount.githubUrl); //comment why doing this
                // githubIssueService.isValidRepo(_githubrepoUrl);
                githubIssueService.getOpenIssues(_githubrepoUrl) //get open issues count
                    .then(function (response) {
                        $scope.openIssueCount = (response.data.open_issues);
                        _openIssueCount = $scope.openIssueCount;
                    }, function (error) {
                        //to do
                        console.log("No project found");
                        var errorMessage1 = "Requested repo not found";

                        if (error.Errors) {
                            // show list of errors
                            errorMessage1 += '<ul>';
                            for (var i = 0; i < error.Errors.length; i++) {
                                errorMessage1 += '<li>' + error.Errors[i].Message + error.Errors[i].FieldName + " " + error.Errors[i].Detail + '</li>';
                            }
                            errorMessage1 += '</ul>';
                        } else {
                            // no explicit messages, just report status code
                            errorMessage1 += " status code " + error.status;
                        }

                        $("#viewOrganisation_formResult").addClass("alert-danger").html(errorMessage1);
                    });
                githubIssueService.getClosedIssues(_githubrepoUrl) //get closed issues count
                    .then(function (response) {
                        $scope.closedIssueCount = (Object.keys(response.data).length);
                        _closedIssueCount = $scope.closedIssueCount;
                    })
                    .then(function () {
                        $scope.labels = ["Open Issues", "Closed Issues"];
                        $timeout(function () {
                            $scope.issueCollection = [_openIssueCount, _closedIssueCount];
                        }, 1000);
                        $scope.series = ["Open Issues", "Closed Issues"];
                    });

            };
            $scope.openIssueCount = "";
            $scope.closedIssueCount = "";

        }
                                  ])

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
