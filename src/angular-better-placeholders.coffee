# version 0.3.0
# Compile with coffee -c -b --no-header angular-better-placeholders.coffee > angular-better-placeholders.js
angular.module('angularBetterPlaceholder', [])
.directive 'betterPlaceholder', ->
	restrict: 'C'
	require: '?ngModel'
	link: (scope, element, attrs, ngModel) ->
		if not element.prev then element.prev = ->
			p = element
			loop
				p = p.previousSibling
				break unless p and p.nodeType isnt 1
			return p
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
		required = angular.element '<i class="fa fa-asterisk text-danger fa-required"></i>'
		placeholder = angular.element "<label class='help-block better-placeholder-text'></label>"
		if element.attr('id')? then placeholder.attr 'for', element.attr 'id'
		else
			customId = 'placeholderid_' + (Math.random() * 10000000000000000)
			element.attr 'id', customId
			placeholder.attr 'for', customId
		element.after placeholder

		placeholder.html attrs.placeholder
		if not attrs.placeholder? or attrs.placeholder.trim() is '' # if there is no placeholder then don't show the animations
			placeholder.addClass 'ng-hide'
			element.removeClass 'better-placeholder'
		if attrs.required then placeholder.append required
		attrs.$observe 'placeholder', (val) ->
			placeholder.html val
			if attrs.required then placeholder.append required
			if not val? or val.trim() is '' # if there is no placeholder then don't show the animations
				placeholder.addClass 'ng-hide'
				element.removeClass 'better-placeholder'
			else # if there is a placeholder then make sure the class for the animations is re-added if it's been removed
				placeholder.removeClass 'ng-hide'
				element.addClass 'better-placeholder'

		placeholder.on 'click', -> element[0].focus()

		attrs.$observe 'required', (val) ->
			if val then placeholder.append required
			else required.remove()

		activate = ->
			if attrs.placeholder? and attrs.placeholder.trim() isnt ''
				element.addClass 'better-placeholder-active'
				placeholder.addClass 'active'
				if element.prev()? and element.prev().hasClass 'input-group-btn' then element.prev().addClass 'better-placeholder-button-active'
		deactivate = ->
			element.removeClass 'better-placeholder-active'
			placeholder.removeClass 'active'
			if element.prev()? and element.prev().hasClass 'input-group-btn' then element.prev().removeClass 'better-placeholder-button-active'

		# catch changes from the DOM
		element.on 'blur', -> if isEmpty() then deactivate()
		element.on 'change input', ->
			if isEmpty() then deactivate()
			else activate()
		if element.prev()? and element.prev().hasClass 'input-group-btn' then element.prev().addClass 'better-placeholder-button'
		if ngModel? then ngModel.$formatters.push (value) ->
			if isEmpty value then deactivate()
			else activate()
			value
		else if not isEmpty() then activate()
