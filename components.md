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

And open `index.html` in a web browser. You should have two greetings, one from the main Vue instance, and one from the component!

#### 2.2 Be fair and share: passing data from parent to child component

It is possible to pass data from a parent instance to a child component using `props` \(_properties\)._  All you need to do is:

1. Bind the value to the component using a colon `:`
2. Tell the component what data it should expect to receive.

Briefly put:

```
/* some parent vue instance */
new Vue({
  data () { 
    return {
      message: 'Hi'
    }
  }
}

/* markup for some hypothetical child component (component declaration in next code snippet) */ 
<MyComponent :my-message="message"></MyComponent>
```

The above hypothetical component is passed a variable `message`, and expects to receive it as the prop `my-message`. The declaration for the component would looks as follows:

```
Vue.component('MyComponent', {
  props: [myMessage]
})
```

Now MyComponent has access to the data passed down from the main Vue instance! Notice when passing the prop, _kebab case_ is used: `:my-message`, however when the prop is declared in the component, camelCase is used: `myMessage`. Not doing this will cause Vue to throw a warning \(this is a recent change\). The reason is because HTML is case insensitive, so passing a prop like this: `:myMessage="message"` doesn't mean as much, so kebab case is used instead.

Sharing data using props is a bit confusing at first, so here is the current application code with an updated example:

```
<!-- index.html -->
<div id="app">
    {{ msg }}
    <Hello></Hello>
    <Todo :msg-to-pass="msgToPass"></Todo>
</div>
```

    // index.js
    Vue.component('Hello', {
      template: `<div>{{ msg }}</div>`,
      data () {
        return {
          msg: 'Hello from a component!'
        }
      }
    })

    Vue.component('Todo', {
      props: ['msgToPass'],
      template: `<div>{{ msgToPass }}</div>`
    })

    new Vue({
      el: '#app',
      data () {
        return {
          msg: 'Hello from Vue.js!',
          msgToPass: 'A message passed from the main app to a component!'
        }
      }
    })

Now we have two components: `Todo` and `Hello`. `Todo` receives `msgToPass` from the main instance, and renders is using curly braces.

#### 2.3 Listen to me! Emitting data from a child to a parent component

The previous section shows how to pass data from a parent to a child; what about the other way around? To do this, use the `$emit` function, part of the core Vue api. All Vue instances can emit am event with a message and some data, and anyone listening can receive it in the same way we normally listen to events: `v-on:event`. Briefly:

```
<!-- child component who is emitting a message with some data -->
Vue.component('Child', {
  methods: {
    cry () {
      this.$emit('wahwah', 'I am sad')
    }
  }
})

<!-- markup for child in a parent instance -->
<Child v-on:wahwah="haveSympathy"></Child>

new Vue({
  methods: {
    haveSympathy (msg) {
      console.log(msg) // We have access to the "I am sad" message here
    }
  } 
})
```

This is a bit confusing at first. Firstly, notice that the `$emit` method has a `$` in front of it? All the Vue methods are prepended with `$` by convention - it makes it easy to differentiate between a method defined in a specific component, and a globally available method that is part of Vue's api.







