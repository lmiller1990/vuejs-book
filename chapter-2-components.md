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

Next, there are two arguments to the `$emit` method: the first is the event that will be emitted, and the second is a _payload_ - basically, some data that will also be emitted. It can be anything - often you will find yourself emitting an object, like this:

```
this.$emit('emitting', { name: 'Taro', age: 16 })
```

Next, to listen for the event, you simply use `v-on` to listen, in the same way you would respond to a keypress, mouse click, and so on. In the previous example:

```
v-on:wahwah="haveSympathy"
```

Will call the method `haveSympathy` whenever `wahwah` is emitted by the child component. Normally you will call a method in response to an event, but you could do something like set a variable value `v-on:wahwah="msg = 'stop crying'"`, or anything else. Notice that when listening to the event `v-on:wahwah="haveSympathy"` we do not need to append brackets to the method we are calling, or care about the arguments. However, we do need to declare them in the method definition, to be able to access them: `haveSympathy (msg)`. A little bit of Vue magic, which seems a bit counter intuitive at first - we will see in more depth how this works, later on.

Below is a full working example of the simplified example above \(create a fresh `index.js` and `index.html`:

    // index.js```
    Vue.component('Child', {
      template: `
      <div>
        <button @click="cry">Cry</button>
      </div>`,
      methods: {
        cry () {
          this.$emit('wahwah', 'I am sad')
        }
      }
    })

    new Vue({
      el: '#app',
      methods: {
        haveSympathy (msg) {
          console.log('Stop crying and smile :)')
        }
      }
    })

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
    <Child @wahwah="haveSympathy"></Child>
  </div>

  <script src="index.js"></script>
</body>
</html>
```

Remember that `@` is shorthand for `v-on`. It's only a few lines of code, but a lot happens - if you don't understand what's going on at first, try playing around with the code until you do - it's important to have a solid understand of how components communicate. To see this app in action, open `index.html` in your browser and also open the browser developer tools, and note the console output when clicking the button.

#### 2.4 Improved Todo app with components

Armed with our new knowledge of components, we can make a much more modular version of the todo app from the previous chapter. Start with a fresh `index.html` and `index.js` as usual. To get going, we will render a list of todos, using `v-for` on our custom component.

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
    <Todo v-for="todo in todos" :todo="todo">
    </Todo>
  </div>

  <script src="index.js"></script>
</body>
</html>
```

    // index.js
    Vue.component('Todo', {
      props: ['todo'],
      template: `
      <div>
        {{ todo.title }}
      </div>`
    })

    new Vue({
      el: '#app',
      data () {
        return {
          todos: [
            { id: 0, title: 'Learn Vue.js', isDone: false },
            { id: 1, title: 'Write some tests', isDone: false },
            { id: 2, title: 'Take a break', isDone: false }
          ]
        }
      }
    })

Short and concise. Notice the `todos` array is looped over using `v-for`, as as the loop executes, the current `todo` is passed as a prop to the Todo component. This is a common pattern, not only in Vue but Angular, React, and other front end frameworks, and one you will be using a lot - so make sure you understand what's happening.

Now we should add the ability to mark a todo as complete.

    // index.js
    Vue.component('Todo', {
      props: ['todo'],
      template: `
      <div :style="todoStyle">
        {{ todo.title }}
        <input v-model="todo.isDone" type="checkbox" />
      </div>`,
      computed: {
        todoStyle () {
          if (this.todo.isDone) {
            return { 'text-decoration': 'line-through' }
          }
        }
      }
    })

    new Vue({ 
      // no changes here
    })

`index.html` remains the same. As previously, `v-model` is used to bind the checkbox value to `todo.isDone`.

There is a new part of the Vue api exposed here though - _computed properties_. Inside the `computed` object, methods can be defined - with one restriction - no arguments. Whenever a value a computed property changes, the computed property will update automatically. In this case, when `todo.isDone` changes, the computed property goes from returning nothing to returning `{ 'text-decoration': 'line-through' }`, and updating the style of the todo.

We used a method to do something similar in the previous example. The reason we used a method was because in the previous example, we passed a paramter - the id of the todo - because we didn't have any components in that example, so we had to have other way to identify which `todo` should have the linethrough style applied. Now each todo has it's own component, that is no longer necessary.

Lastly, deleting a todo! The strategy is as follows:

1. Create an \[X\] button, that calls a function `deleteTodo` 
2. `deleteTodo` should `$emit` a `delete` event, with the id of the todo to delete
3. listen for the `delete` event using `v-on` \(or the shorthand `@`\) and call a function on the Vue instance, that will splice the todo from the `todos` array

Steps 1 and 2 are implemented in the `Todo` component, and the markup in `index.html`:

    // index.js
    Vue.component('Todo', {
      props: ['todo'],
      template: `
      <div :style="todoStyle">
        {{ todo.title }}
        <input v-model="todo.isDone" type="checkbox" />
        <button @click="deleteTodo">X</button>
      </div>`,
      computed: {
        todoStyle () {
          if (this.todo.isDone) {
            return { 'text-decoration': 'line-through' }
          }
        }
      },
      methods: {
        deleteTodo () {
          this.$emit('delete', this.todo.id)
        }
      }
    })

    new Vue({ 
      // no changes here
    })

When the button is clicked, `deleteTodo` will emit a `delete` event, and the id of the todo. Next, we need to listen for the `delete` event:

```
<!-- index.html -->
<div id="app">
  <Todo v-for="todo in todos" :todo="todo" @delete="deleteTodo">
  </Todo>
</div>
```

The above snippet responds to the emitted `delete` event by calling a `deleteTodo` method on the main instance, which we will now define:

```
// index.js
Vue.component('Todo', {
  // see previous snippet, no changes here
})

new Vue({
  el: '#app',
  data () {
    return {
      todos: [
        { id: 0, title: 'Learn Vue.js', isDone: true },
        { id: 1, title: 'Write some tests', isDone: false },
        { id: 2, title: 'Take a break', isDone: false }
      ]
    }
  },
  methods: {
    deleteTodo (id) {
      for (let i in this.todos) {
        if (this.todos[i].id === id) {
          this.todos.splice(i, 1)
        }
      }
    }
  }
})
```

Simply loop though the `todos` array, and remove the todo with the matching id. Now we have the same application as built in the previous chapter, but split across two components, which makes developing and maintaining an application much easier, especially which your applications start to get large.

If you have had the console open, you may have noticed the following error message:

> \[Vue tip\] &lt;todo v-for="todo in todos"&gt;: component lists rendered with v-for should have explicit keys. See [https://vuejs.org/guide/list.html\#key](https://vuejs.org/guide/list.html#key) for more information.

The link to the official documentation explains it well - by providing a key, Vue can track each node in the DOM better. Something unique is an ideal candidate for a key - such as the id of each todo. Update the for loop as follows to finish this chapter's application.

```
<div id="app">
  <Todo v-for="todo in todos" :todo="todo" key="todo.id" @delete="deleteTodo">
  </Todo>
</div>
```



