angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var activate, deactivate, isEmpty, placeholder, required;
      isEmpty = function(value) {
        if (value == null) {
          value = ngModel && (ngModel != null) ? ngModel.$viewValue : element.val();
        }
        return !element[0].validity.badInput && !((value != null) && (!angular.isString(value) || value !== '') && (!angular.isArray(value) || !value.isEmpty()) && (angular.isString(value) || angular.isArray(value) || (element.val().trim().length > 0 || !isNaN(value))));
      };
      required = angular.element('<i class="fa fa-asterisk text-danger fa-required"></i>');
      placeholder = angular.element("<span class='help-block better-placeholder-text'></span>");
      element.after(placeholder);
      placeholder.html(attrs.placeholder);
      if ((attrs.placeholder == null) || attrs.placeholder.trim() === '') {
        placeholder.addClass('ng-hide');
        element.removeClass('better-placeholder');
      }
      if (attrs.required) {
        placeholder.append(required);
      }
      attrs.$observe('placeholder', function(val) {
        placeholder.html(val);
        if (attrs.required) {
          placeholder.append(required);
        }
        if ((val == null) || val.trim() === '') {
          placeholder.addClass('ng-hide');
          return element.removeClass('better-placeholder');
        } else {
          placeholder.removeClass('ng-hide');
          return element.addClass('better-placeholder');
        }
      });
      placeholder.on('click', function() {
        return element[0].focus();
      });
      attrs.$observe('required', function(val) {
        if (val) {
          return placeholder.append(required);
        } else {
          return required.remove();
        }
      });
      activate = function() {
        if ((attrs.placeholder != null) && attrs.placeholder.trim() !== '') {
          element.addClass('better-placeholder-active');
          placeholder.addClass('active');
          if ((element.previous() != null) && element.previous().hasClass('input-group-btn')) {
            return element.previous().addClass('better-placeholder-button-active');
          }
        }
      };
      deactivate = function() {
        element.removeClass('better-placeholder-active');
        placeholder.removeClass('active');
        if ((element.previous() != null) && element.previous().hasClass('input-group-btn')) {
          return element.previous().removeClass('better-placeholder-button-active');
        }
      };
      element.on('focus', activate);
      element.on('blur', function() {
        if (isEmpty()) {
          return deactivate();
        }
      });
      element.on('change', function() {
        if (isEmpty()) {
          return deactivate();
        } else {
          return activate();
        }
      });
      if ((element.previous() != null) && element.previous().hasClass('input-group-btn')) {
        element.previous().addClass('better-placeholder-button');
      }
      if (ngModel != null) {
        return ngModel.$formatters.push(function(value) {
          if (isEmpty(value)) {
            deactivate();
          } else {
            activate();
          }
          return value;
        });
      } else if (!isEmpty()) {
        return activate();
      }
    }
  };
});
