### Chapter 2: Vue Components

#### 2.1 Introduction to components

Vue allows applications to be composed in small, modular parts, called \_components. \_A component is basically a Vue instance with some predefined methods, data, and so on. Components are then able to be like a regular HTML tag. For example, if I have a Greeting component, I can use it in my app like so:

```
<div>
  <Greeting></Greeting>
</div>
```

Componenets can use all the usual directives, and be extended in other ways, receive arguments \(called _props_\) which we will see soon. 

Declaring a component is easy! A basic component looks like this:

    Vue.component('NameOfComponent', {
      template: `<div></div>`
    })

Where template is inline HTML. You can also use an ID or another and reference the template using an ID, for example:

    Vue.component('NameOfComponent', {
      template: `#componentTemplate`
    })

```
<template id="componentTemplate">
</template>
```

The template can be located in another file. The examples in this chapter will inline the HTML template for simplicity, and we will see a better way to use components in chapter three, using a bundler called webpack \(more on a bundler and webpack later\).

Anyway, into this chapter's example application! As in the previous chapter, start with this basic template:

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>

  <title></title>
</head>
<body>
  <div id="app">
    {{ msg }}
  </div>
  <script src="index.js"></script>
</body>
</html>
```

```
// index.js
new Vue({
  el: '#app',
  data () {
    return {
      msg: 'Hi from Vue.js!"
    }
  }
})
```

This should render the `msg` on the screen. Now, declare another component _above_ the new Vue instance - all components must be declared prior to the Vue instance.

    // index.js
    Vue.component('Hello', {
      template: `
        <div>
          {{ msg }}
        </div>
      `,
      data () {
        return {
          msg: 'Hello from a component!'
        }
      }
    })

    new Vue({
      el: '#app',
      data () {
        return {
          msg: 'Hi from Vue.js!"
        }
      }
    })

Notice by using backticks \( \` \) you can have a string that spans multiple lines. Ouside of the inline HTML template, the rest of the example is review from the previous chapter.

Now update `index.html` \(only the content inside the body tags is shown below\)

```
<!-- index.html -->
<div id="app">
  <Hello></Hello>
</div>
```

And open `index.html` in a web browser. You should have two greetings, one from the main Vue instance, and one from the component.

