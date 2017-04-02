### Chapter 2: Vue Components

#### 2.1 Introduction to components

Vue allows applications to be composed in small, modular parts, called _components. _A component is basically a Vue instance with some predefined methods, data, and so on. As in the previous chapter, start with this basic template:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>

  <title></title>
</head>
<body>
  <div id="app">

  </div>
  <script src="index.js"></script>
</body>
</html>
```

```
new Vue({
  el: '#app'
})
```





