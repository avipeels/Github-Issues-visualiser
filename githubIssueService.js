 myModule.factory('githubIssueService', ['$http', function ($http) {
        var baseUrl = 'https://api.github.com/repos/';
        var dataFactory = {};
        dataFactory.getOpenIssues = function () { //get the open and closed issues from github
            return $http.get(baseUrl + "avipeels/dxThn");
        };
        dataFactory.getClosedIssues = function () { //get the open and closed issues from github
            return $http.get(baseUrl + "avipeels/dxThn/issues/events");
        };
        dataFactory.setOpenClosedItems = function (open, closed) { //setting open, closed item counts to pass on to charts.js which build the charts
            var issues = [{
                "label": "open",
                "value": open
      }, {
                "label": "closed",
                "value": closed
      }];
        };
        return dataFactory;
  }]);
