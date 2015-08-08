(function(){
  'use strict';

var comments = function($compile){
  return {
    templateUrl : 'modules/comments/commentsDirective.html',
    restrict:'E',
    scope:{
      collection: '=',
      controller: '='
    },
    link: function(scope, element, attrs){
        if(scope.collection.data.replies){
          var elementResult = angular.element(element[0].getElementsByClassName('comments-placeholder'));
          
          scope.commentLimit = 1;
          
          scope.increaseLimit = function(){
            scope.commentLimit += 5;
          }

          elementResult.replaceWith($compile(
            '<ul ng-show="{{collection.data.replies}}"'                     + 
            'ng-repeat="comment in collection.data.replies.data.children '  +
              '| limitTo:commentLimit" class="comment-reply"> '              + 
            '<comments collection="comment" controller="controller"></comments>'+
            '<div ng-show="collection.data.replies.data.children.length > commentLimit" '+
            ' ng-click="increaseLimit()" class="load-more-button">'                      +
            'load more( {{ (collection.data.replies.data.children.length - commentLimit)}} remaining)</div></ul>'
            )(scope));
        }
    }
  };
};

angular
  .module('myApp')
  .directive('comments', comments);

})();