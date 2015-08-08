(function() {
    'use strict';


    var View2Ctrl = function($scope, $stateParams, $timeout, getPageJsonService, $localStorage) {
        this.commentLimit = 10;
        this.currentDate = (new Date).getTime();
        //
        this.sub = $stateParams.link; //passed by view1
        var parent = this;

        this.loadPage = function() {
            var self = this;

            this.sub = parent.sub;
            this.postItems = {};
            this.articleProperties = {};

            $timeout(function() {
                getPageJsonService.getPage(self.sub)
                    .then(function(response) {

                        self.postItems = response.data[1].data.children;
                        self.articleProperties = response.data[0].data.children[0].data;

                    });
            }, 10);
        };

        this.loadPage();

        this.viewComments = function(url) {
            $state.go('view2', {
                link: (url)
            });
        }

        this.raiseCommentLimit = function() {
            parent.commentLimit += 10;
        }
        
        this.getPostAge = function(utc_date) {
            var milliseconds = parent.currentDate - utc_date;
            var seconds = Math.round(milliseconds / 1000);
            var minutes = Math.round(seconds / 60);
            var hours = Math.round(minutes / 60);
            var days = Math.round(hours / 24);
            var months = Math.round(days / 30);
            var years = Math.round(months / 12);

            if (years != 0) {
                return (years + "years ago.");

            } else if (months != 0) {
                return (months + "months ago.");

            } else if (days != 0) {
                return (days + "days ago.");

            } else if (hours != 0) {
                return (hours + "hours ago.");

            } else if (minutes != 0) {
                return (minutes + "minutes ago.");

            } else if (seconds != 0) {
                return (seconds + "seconds ago.");

            }
            return ("error");
        }
    }


    angular
        .module('myApp.view2', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('view2', {
                params: {
                    link: null
                },
                url: '/view2/',
                templateUrl: 'view2/view2.html',
                controllerAs: 'View2',
                controller: 'View2Ctrl'
            })
    }])

    .controller('View2Ctrl', [
        '$scope',
        '$stateParams',
        '$timeout',
        'getPageJsonService',
        '$localStorage',
        View2Ctrl
    ]);



})();