(function() {
    'use strict';


    var View1Ctrl = function($timeout, getPageJsonService, $state, $stateParams, $location, $localStorage, $log) {

        var parent = this;
        this.sub = 'pics'; //default subreddit
        this.urlSubreddit = $stateParams.subreddit;


        if (this.urlSubreddit !== undefined) {
            this.sub = this.urlSubreddit;
        }

        //used to load subreddits
        this.loadPage = function() {
            var self = this;
            var sub = parent.sub;
            
            if (this.sub !== '') {
                sub = 'r/' + this.sub
            }
            this.postItems = {};
            this.onlineItems = {};

            $timeout(function() {
                getPageJsonService.getPage(sub)
                    .then(function(response) {

                        self.onlineItems = response.data.data.children;
                        self.postItems = self.onlineItems;
                    });
            }, 10);
        };

        this.loadSubreddit = function() {
            if($location.path() === '/view1/r/' + this.sub){
                $state.go($state.current, {}, {reload: true});
            }else{
                $location.path('/view1/r/' + this.sub);
            }
        }

        this.viewComments = function(url) {
            $state.go('view2', {
                link: (url)
            });
        }

        //init offline storage
        this.$offlineStorage = $localStorage.$default({
            offlinePostItems : []
        });
        
        this.saveOffline = function(collection){
            if(collection !== null){
                this.$offlineStorage.offlinePostItems.push(collection);
                console.log('saved');
            }
        }
        
        this.toggleOfflineCollection = function(){
          this.postItems = $localStorage.offlinePostItems;
        }
        
        this.toggleOnlineCollection = function(){
          this.postItems = this.onlineItems;
        }
        
        this.deleteSavedPost = function(index){
          $localStorage.offlinePostItems.splice(index, 1);
        }
        
        this.postAlreadySaved =  function(id){
          var found = $localStorage.offlinePostItems.some(function(item){
            return item.data.id === id;
          });
          return found;
        }
        
        this.$log = $log;
        
        //load view1 on app load
        this.loadPage();

    };


    
    angular
        .module('myApp.view1', [])


    .config(['$stateProvider', function($stateProvider) {
        $stateProvider

            .state('view1', {
            url: '/view1/r/:subreddit',
            templateUrl: 'view1/view1.html',
            controllerAs: 'View1',
            controller: 'View1Ctrl'
        })
    }])

    .controller('View1Ctrl', [
        '$timeout',
        'getPageJsonService',
        '$state',
        '$stateParams',
        '$location',
        '$localStorage',
        '$log',
        View1Ctrl
    ]);

})();