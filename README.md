[![Stories in Ready](https://badge.waffle.io/dmackerman/angular-better-placeholders.png?label=ready&title=Ready)](https://waffle.io/dmackerman/angular-better-placeholders)
# Angular Better Placeholders

An [AngularJS](http://angularjs.org/) directive to improve `input` placeholders. Based on a concept found on Dribble:
http://dribbble.com/shots/1254439--GIF-Mobile-Form-Interaction?list=users

![Dribble GIF](http://dribbble.s3.amazonaws.com/users/6410/screenshots/1254439/form-animation-_gif_.gif)

[Check out the website](http://dmackerman.github.io/angular-better-placeholders/#/)

## Installation
``` bash
$ bower install angular-better-placeholders
```


## Usage
Simple include the `better-place-holder` directive as a class on your input fields.

``` html
<input type="text" ng-model="user.firstName" class="form-control better-placeholder" placeholder="First Name" />
```

Include the following CSS snipets:

``` css
.better-placeholder {
  transition: all .2s ease;
}
.better-placeholder.better-placeholder-active {
  padding: 34px 12px 16px 12px;
}
.better-placeholder-text {
  position: absolute;
  top: 5px; left: 28px;
  font-size: 10px;
  font-weight: bold;
}
```    

## Todo
- probably shouldn't be a class directive, an attribute instead?
- create a module

## Example
- http://dmackerman.github.io/angular-better-placeholders/
