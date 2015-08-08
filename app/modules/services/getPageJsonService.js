(function(){
'use strict';

var getPageJsonService = function($http){
  this.getPage = function(subreddit){
    subreddit = typeof subreddit !== 'undefined' ? subreddit : '';
    
    return $http.get('http://www.reddit.com/' + subreddit + '.json');
  };
    

};

angular
  .module('myApp')
  .service('getPageJsonService', [
    '$http',
    getPageJsonService
  ]);
  
})();