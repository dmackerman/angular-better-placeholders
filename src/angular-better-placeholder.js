angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var activate, deactivate, modelChange, placeholder;
      placeholder = angular.element("<span class='help-block better-placeholder-text'>" + attrs.placeholder + "</span>");
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
