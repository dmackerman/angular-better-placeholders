angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: 'ngModel',
    scope: true,
    link: function(scope, element, attrs, ngModel) {
      var activate, deactivate, modelChange, placeholder;
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
        if (ngModel.$isEmpty(ngModel.$viewValue)) {
          element.removeClass('better-placeholder-active');
          return placeholder.removeClass('active');
        }
      };
      modelChange = function(value) {
        if (ngModel.$isEmpty(value)) {
          element.removeClass('better-placeholder-active');
          placeholder.removeClass('active');
        } else {
          element.addClass('better-placeholder-active');
          placeholder.addClass('active');
        }
        return value;
      };
      element.on('focus', activate);
      element.on('blur', deactivate);
      element.on('change', modelChange);
      return ngModel.$formatters.push(modelChange);
    }
  };
});
