angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var activate, deactivate, isEmpty, placeholder, required, _placeholder;
      isEmpty = function(value) {
        if (value == null) {
          value = ngModel && (ngModel != null) ? ngModel.$viewValue : element.val();
        }
        return !element[0].validity.badInput && !((value != null) && (!angular.isString(value) || value !== '') && (!angular.isArray(value) || !value.isEmpty()) && (angular.isString(value) || angular.isArray(value) || (element.val().trim().length > 0 || !isNaN(value))));
      };
      if (attrs.ngPlaceholder != null) {
        _placeholder = attrs.ngPlaceholder;
        element.attr('placeholder', _placeholder);
        attrs.$observe('ngPlaceholder', function(val) {
          element.attr('placeholder', val);
          placeholder.html(val);
          if (attrs.required) {
            return placeholder.append(required);
          }
        });
      } else if ((attrs.placeholder != null) && attrs.placeholder !== '') {
        _placeholder = attrs.placeholder;
      } else {
        throw "better-placeholder requires an ng-placeholder or placeholder attribute";
      }
      required = angular.element('<i class="fa fa-asterisk text-danger fa-required"></i>');
      placeholder = angular.element("<span class='help-block better-placeholder-text'>" + _placeholder + "</span>");
      element.after(placeholder);
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
        element.addClass('better-placeholder-active');
        placeholder.addClass('active');
        if ((element.previous() != null) && element.previous().hasClass('input-group-btn')) {
          return element.previous().addClass('better-placeholder-button-active');
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
