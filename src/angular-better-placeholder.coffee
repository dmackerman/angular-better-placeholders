angular.module('angularBetterPlaceholder', [])
.directive 'betterPlaceholder', ->
	restrict: 'C'
	require: 'ngModel'
	link: (scope, element, attrs, ngModel) ->
		placeholder = angular.element "<span class='help-block better-placeholder-text'>#{attrs.placeholder}</span>"
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