# Chapter 1: First look at Vue

What is Vue.js?

Vue.js \(from here on, Vue\) is a JavaScript framework created by and mantained by Evan You in 2015. It is coined a 'progressive' framework - one that provides a small, yet solid core API, and can be expanded with modules as needed.

This book assumes basic knowledge of HTML, CSS and JavaScript. If you have some background in programming, it should be easy enough, even without much working knowledge in JavaScript.

Let's get write into it. Each chapter will start by building a small applciation to demonstrate different features, and later build a clone of the popular programming news board, hacker news, complete with test driven development, and an NPM powered workflow.

To get started, include Vue from a CDN, and create a simple HTML template to host the Vue app.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
</head>
<body>
  <div id="app"></div>

  <script src="index.js"></script>
</body>
</html>
```

Notice `<div id="app"></div>` on line 9? Vue apps are mounted on single HTML tag - usually a div like this. Line 6 includes the Vue itself, and line 11 includes the script we will write our first application in, which is shown below:

```
new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue.js!'
    }
  }
})

```



