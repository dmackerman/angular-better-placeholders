'use strict';

angular.module('PlaceholderDemoApp')
  .directive('betterPlaceholder', function() {
    return {
      restrict: 'C',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var origPlaceholderText = attrs.placeholder;
        var placeholder = '<span class=\"help-block better-placeholder-text\">' + attrs.placeholder + '</span>';

        // watch our model for changes
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          else if (newValue == "") {
            element.attr('placeholder', '');
          }
          else if (!element.hasClass('better-placeholder-active')) {
            element.before(placeholder)
            element.addClass('better-placeholder-active');
          }
        });

        // remove the placeholder, and set the default placeholde to blank since we already have one
        element.on('blur', function() {
          if (element.val() == "") {
            element.prev().remove();
            element.removeClass('better-placeholder-active');
            element.attr('placeholder', origPlaceholderText);
          }
        });
      }
    }
  })