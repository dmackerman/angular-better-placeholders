angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: '?ngModel',
    scope: {},
    link: function(scope, element, attrs, ngModel) {
      var activate, deactivate, isEmpty, placeholder;
      isEmpty = function(value) {
        if (value == null) {
          value = ngModel && (ngModel != null) ? ngModel.$viewValue : element.val();
        }
        return !element[0].validity.badInput && (!value || value === '');
      };
      if (attrs.ngPlaceholder != null) {
        scope.placeholder = scope.$parent.$eval(attrs.ngPlaceholder);
        element.attr('placeholder', scope.placeholder);
        scope.$parent.$watch(attrs.ngPlaceholder, function(val) {
          element.attr('placeholder', val);
          return placeholder.html(val);
        });
      } else if ((attrs.placeholder != null) && attrs.placeholder !== '') {
        scope.placeholder = attrs.placeholder;
      } else {
        throw "better-placeholder requires an ng-placeholder or placeholder attribute";
      }
      placeholder = angular.element("<span class='help-block better-placeholder-text'>" + scope.placeholder + "</span>");
      element.after(placeholder);
      placeholder.on('click', function() {
        return element[0].focus();
      });
      activate = function() {
        element.addClass('better-placeholder-active');
        return placeholder.addClass('active');
      };
      deactivate = function() {
        if (isEmpty()) {
          element.removeClass('better-placeholder-active');
          return placeholder.removeClass('active');
        }
      };
      element.on('focus', activate);
      element.on('blur', deactivate);
      element.on('change', function() {
        if (isEmpty()) {
          element.removeClass('better-placeholder-active');
          return placeholder.removeClass('active');
        } else {
          element.addClass('better-placeholder-active');
          return placeholder.addClass('active');
        }
      });
      if (ngModel != null) {
        return ngModel.$formatters.push(function(value) {
          if (isEmpty(value)) {
            element.removeClass('better-placeholder-active');
            placeholder.removeClass('active');
          } else {
            element.addClass('better-placeholder-active');
            placeholder.addClass('active');
          }
          return value;
        });
      } else if (!isEmpty()) {
        return activate();
      }
    }
  };
});
