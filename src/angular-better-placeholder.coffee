angular.module('angularBetterPlaceholder', [])
.directive 'betterPlaceholder', ->
	restrict: 'C'
	require: 'ngModel'
	scope: true
	link: (scope, element, attrs, ngModel) ->
		if attrs.ngPlaceholder?
			scope.placeholder = scope.$parent.$eval attrs.ngPlaceholder
			element.attr 'placeholder', scope.placeholder
			scope.$parent.$watch attrs.ngPlaceholder, (val) ->
				element.attr 'placeholder', val
				placeholder.html val
		else if attrs.placeholder? and attrs.placeholder isnt '' then scope.placeholder = attrs.placeholder
		else throw "better-placeholder requires an ng-placeholder or placeholder attribute"
		
		placeholder = angular.element "<span class='help-block better-placeholder-text'>#{scope.placeholder}</span>"
		element.after placeholder
		placeholder.on 'click', -> element[0].focus()
		activate = ->
			element.addClass 'better-placeholder-active'
			placeholder.addClass 'active'
		deactivate = ->
			if ngModel.$isEmpty ngModel.$viewValue
				element.removeClass 'better-placeholder-active'
				placeholder.removeClass 'active'
		
		modelChange = (value) ->
			if ngModel.$isEmpty value
				element.removeClass 'better-placeholder-active'
				placeholder.removeClass 'active'
			else
				element.addClass 'better-placeholder-active'
				placeholder.addClass 'active'
			value
		
		# catch changes from the DOM
		element.on 'focus', activate
		element.on 'blur', deactivate
		element.on 'change', modelChange
		ngModel.$formatters.push modelChange