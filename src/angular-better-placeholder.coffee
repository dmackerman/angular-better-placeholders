# Compile with coffee -c -b --no-header angular-better-placeholder.coffee > angular-better-placeholder.js
angular.module('angularBetterPlaceholder', [])
.directive 'betterPlaceholder', ->
	restrict: 'C'
	require: '?ngModel'
	link: (scope, element, attrs, ngModel) ->
		# if ngModel is invalid then it can occur that the viewValue is empty
		isEmpty = (value= if ngModel and ngModel? then ngModel.$viewValue else element.val()) ->
			(
				not element[0].validity.badInput and # empty if not badInput, if badinput model gets set to undefined but there IS content
				not ( # negate the following test which tests if it has content
					value? and #value is not null/undefined
					(
						not angular.isString(value) or value isnt '' # if it's a string it's not the empty stryng
					) and
					(
						not angular.isArray(value) or not value.isEmpty() # if it's an array (case of using ng-list) it's more than length 0
					) and
					(
						angular.isString(value) or angular.isArray(value) or (
							element.val().trim().length > 0 or # test if the actual content has length, to prevent false positives
							not isNaN(value) # otherwise check it is a number
						)
					)
				)
			)
		if attrs.ngPlaceholder?
			_placeholder = attrs.ngPlaceholder
			element.attr 'placeholder', _placeholder
			attrs.$observe 'ngPlaceholder', (val) ->
				element.attr 'placeholder', val
				placeholder.html val
				if attrs.required then placeholder.append required
		else if attrs.placeholder? and attrs.placeholder isnt '' then _placeholder = attrs.placeholder
		else throw "better-placeholder requires an ng-placeholder or placeholder attribute"
		
		required = angular.element '<i class="fa fa-asterisk text-danger fa-required"></i>'
		placeholder = angular.element "<span class='help-block better-placeholder-text'>#{_placeholder}</span>"
		element.after placeholder
		placeholder.on 'click', -> element[0].focus()
		
		attrs.$observe 'required', (val) ->
			if val then placeholder.append required
			else required.remove()
		
		activate = ->
			element.addClass 'better-placeholder-active'
			placeholder.addClass 'active'
			if element.previous()? and element.previous().hasClass 'input-group-btn' then element.previous().addClass 'better-placeholder-button-active'
		deactivate = ->
			element.removeClass 'better-placeholder-active'
			placeholder.removeClass 'active'
			if element.previous()? and element.previous().hasClass 'input-group-btn' then element.previous().removeClass 'better-placeholder-button-active'
		
		# catch changes from the DOM
		element.on 'focus', activate
		element.on 'blur', -> if isEmpty() then deactivate()
		element.on 'change', ->
			if isEmpty() then deactivate()
			else activate()
		if element.previous()? and element.previous().hasClass 'input-group-btn' then element.previous().addClass 'better-placeholder-button'
		if ngModel? then ngModel.$formatters.push (value) ->
			if isEmpty value then deactivate()
			else activate()
			value
		else if not isEmpty() then activate()