// version 0.3.0
angular.module('angularBetterPlaceholder', []).directive('betterPlaceholder', function() {
  return {
    restrict: 'C',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var activate, customId, deactivate, isEmpty, placeholder, required;
      if (!element.prev) {
        element.prev = function() {
          var p;
          p = element;
          while (true) {
            p = p.previousSibling;
            if (!(p && p.nodeType !== 1)) {
              break;
            }
          }
          return p;
        };
      }
      isEmpty = function(value) {
        if (value == null) {
          value = ngModel && (ngModel != null) ? ngModel.$viewValue : element.val();
        }
        return !element[0].validity.badInput && !((value != null) && (!angular.isString(value) || value !== '') && (!angular.isArray(value) || !value.isEmpty()) && (angular.isString(value) || angular.isArray(value) || (element.val().trim().length > 0 || !isNaN(value))));
      };
      required = angular.element('<i class="fa fa-asterisk text-danger fa-required"></i>');
      placeholder = angular.element("<label class='help-block better-placeholder-text'></label>");
      if (element.attr('id') != null) {
        placeholder.attr('for', element.attr('id'));
      } else {
        customId = 'placeholderid_' + (Math.random() * 10000000000000000);
        element.attr('id', customId);
        placeholder.attr('for', customId);
      }
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
          if ((element.prev() != null) && element.prev().hasClass('input-group-btn')) {
            return element.prev().addClass('better-placeholder-button-active');
          }
        }
      };
      deactivate = function() {
        element.removeClass('better-placeholder-active');
        placeholder.removeClass('active');
        if ((element.prev() != null) && element.prev().hasClass('input-group-btn')) {
          return element.prev().removeClass('better-placeholder-button-active');
        }
      };
      element.on('blur', function() {
        if (isEmpty()) {
          return deactivate();
        }
      });
      element.on('change input', function() {
        if (isEmpty()) {
          return deactivate();
        } else {
          return activate();
        }
      });
      if ((element.prev() != null) && element.prev().hasClass('input-group-btn')) {
        element.prev().addClass('better-placeholder-button');
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
