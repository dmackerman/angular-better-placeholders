# Compile with coffee -c -b --no-header angular-better-placeholder.coffee > angular-better-placeholder.js
angular.module('angularBetterPlaceholder', [])
.directive 'betterPlaceholder', ->
	restrict: 'C'
	require: '?ngModel'
	link: (scope, element, attrs, ngModel) ->
		isEmpty = (value= if ngModel and ngModel? then ngModel.$viewValue else element.val()) -> (not element[0].validity.badInput and (not value or value is ''))
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
			if isEmpty()
				element.removeClass 'better-placeholder-active'
				placeholder.removeClass 'active'

		# catch changes from the DOM
		element.on 'focus', activate
		element.on 'blur', deactivate
		element.on 'change', ->
			if isEmpty()
				element.removeClass 'better-placeholder-active'
				placeholder.removeClass 'active'
			else
				element.addClass 'better-placeholder-active'
				placeholder.addClass 'active'
		if ngModel? then ngModel.$formatters.push (value) ->
			if isEmpty value
				element.removeClass 'better-placeholder-active'
				placeholder.removeClass 'active'
			else
				element.addClass 'better-placeholder-active'
				placeholder.addClass 'active'
			value
		else if not isEmpty() then activate()