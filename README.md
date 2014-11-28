angular-round-progress
======================
- A round progress bar using Angular JS

## Quick start

+ Add these libraries to your page:

>
``` html
<link href="angular-round-progress/dist/angular-round-progress.min.css" rel="stylesheet"></link>
...
<script src="angular/angular.js"></script>
<script src="angular-round-progress/dist/angular-round-progress.min.js"></script>
```

+ Inject the `angularRoundProgressBar` module into your app:

>
``` js
angular.module('myApp', ['angularRoundProgressBar']);
```
+ Usage of directive
```
<div round-progress-bar 
  thickness : 20,
	size : 240,
	baseColor : '#5cb85c',
	dangerColor: '#d9534f',
	warningColor: '#f0ad4e',
	dangerLevel: 50,
	warningLevel: 74
	></div>
```

## Settings
* `thickness`: Sets the thickness of the progress bar
* `size`: Length of the diameter of the progress bar
* `baseColor`: String, the main color of the progress bar
* `dangerColor`: String, the color of the progress bar when it reaches the danger level
* `warningColor`: String, the color of the progress bar when it reaches the warning level
* `dangerLevel`: Threshold to activate the danger-color of the progress bar
* `warningLevel`: Threshold to activate the warning-color of the progress bar
