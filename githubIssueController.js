/**
 * Main controller for the application
 */
(function () {
    'use strict';
    myModule.controller('myCtrl', ['$scope', 'githubIssueService', '$timeout', 'convertActualUrlToApiUrl', function ($scope, githubIssueService, $timeout, convertActualUrlToApiUrl) {
        var _githubrepoUrl = "";
        $scope.searchGithub = function () { // search initialisation
            $("#errors").html(""); //vars initialisation
            var _openIssueCount = "";
            var _closedIssueCount = "";
            _githubrepoUrl = convertActualUrlToApiUrl.convert($scope.githubAccount.githubUrl); //convert the repositary url to api end point url
            githubIssueService.getOpenIssues(_githubrepoUrl) //get open issues count
                .then(function (response) {
                    $scope.openIssueCount = (response.data.open_issues);
                    _openIssueCount = $scope.openIssueCount;
                }, function (error) {
                    var errorMessage1 = "Requested repo not found or invalid"; //returns when there is no project found with input repo
                    $("#errors").html(errorMessage1);
                });
            githubIssueService.getClosedIssues(_githubrepoUrl) //get closed issues count
                .then(function (response) {
                    $scope.closedIssueCount = (Object.keys(response.data).length);
                    _closedIssueCount = $scope.closedIssueCount;
                })
                .then(function () {
                    //data input for the pie-chart and bar graph
                    $scope.labels = ["Open Issues", "Closed Issues"];
                    $timeout(function () { //to handle delay in getting resolved promise
                        $scope.issueCollection = [_openIssueCount, _closedIssueCount]; //actual data to be depicted on diagrams
                    }, 1000);
                    $scope.series = ["Open Issues", "Closed Issues"]; //used for bar graph
                });
        };
        $scope.openIssueCount = ""; //post call garbage collection
        $scope.closedIssueCount = "";
        }]);
}());
