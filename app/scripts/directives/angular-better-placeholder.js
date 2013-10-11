'use strict';

angular.module('PlaceholderDemoApp')
  .directive('betterPlaceholder', function() {
    return {
      restrict: 'C',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        /* get the placeholder */
        var placeholder = '<span class=\"help-block better-placeholder-text\">' + attrs.placeholder + '</span>';
        /* when the user starts typing in the field, add the label */
        element.one('keypress', function() {
          element.before(placeholder);
          $(this).css('padding', '34px 12px 16px 12px');
        });

        // scope.$watch()

      }
    }
  })