# Chapter 1: First look at Vue

### 1.1 What is Vue.js?

Vue.js \(from here on, Vue\) is a JavaScript framework created by and mantained by Evan You in 2015. It is coined a 'progressive' framework - one that provides a small, yet solid core API, and can be expanded with modules as needed.

This book assumes basic knowledge of HTML, CSS and JavaScript. If you have some background in programming, it should be easy enough, even without much working knowledge in JavaScript.

Let's get write into it. Each chapter will start by building a small applciation to demonstrate different features, and later build a clone of the popular programming news board, hacker news, complete with test driven development, and an NPM powered workflow.

To get started, include Vue from a CDN, and create a simple HTML called `index.html` template to host the Vue app.

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
</head>
<body>
  <div id="app">

  </div>

  <script src="index.js"></script>
</body>
</html>
```

Notice `<div id="app"></div>` on line 9? Vue apps are mounted on single HTML tag - usually a div like this. Line 6 includes the Vue itself, and line 11 includes the script which you should create in the same directory as `index.html`, called `index.js`. Then insert the following code to `index.js`:

```
// index.js
new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue.js!'
    }
  }
})
```

Now open `index.html` in a web browser and beyond.... nothing! However, to make sure everything is working okay, open the developer tools \(F12 on Windows; cmd + shift + c on macOS\) and you should see a message in the console that says:

> You are running Vue in development mode.
>
> Make sure to turn on production mode when deploying for production.
>
> See more tips at [https://vuejs.org/guide/deployment.html](https://vuejs.org/guide/deployment.html)

This means everything _is_ working correctly! Great. Modify `index.html` and add the following

```
<div id="app">
  {{ message }}
</div>
```

And refresh the page. You should see:

![](/assets/hello-vue.png)

So... _what happened here?_

In a Vue app, anything between `{{ }}` will be _interpolated_ - replaced with relevant variable, function result, or expression.

Line 4 of the app uses one of the most frequently used of Vue's core functions - the `data` function. `data` should always return an object, which can contain variables that will be made directly available to the Vue instance which is attached to the app div. We then use `{{ }}` tags to display the message!

### 1.2 First look at a directive: v-model

Vue provides a number of build in _directives_ which you can use with regular HTML \(or custom components, as explained later\) to achieve different results. Let's see one of the most common, `v-model` in action:

```
<!-- index.html -->
<div id="app">
  <input v-model="message" />
  {{ message }}
</div>
```

`index.js` stays the same. Try refreshing the page, and changing the value of the input field.

![](/assets/import2.png)

The `message` variable updates in sync with the content of the `<input />` tag. Pretty neat! This is one of Vue's strongest points; easy, two way binding between the UI and data.

### 1.3 Now you see me, now you don't: v-show and v-if

`v-show` is another handy directive, that can be used to control the visibility of an element. Update using the following code:

```
<!-- index.html -->
<div id="app">
  <input v-model="message" v-show="visible"/>
  <input v-model="visible" type="checkbox" />
  {{ message }}
</div>
```

```
// index.js
new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue.js!',
      visible: true
    }
  }
})
```

Try clicking the checkbox - the `<input />` field should disappear! You can use `v-model` to bind to boolean values, with a checkbox, as well as to a string value like in the previous example. When the checkbox is unmarked and `visible` becomes false, the first `<input />` field reacts to the change in is automatically hidden.

What is actually happening behind the scene when the element is hidden, is that the CSS is being set to `display: none;`. When `v-show` evaluates to false, the element is still rendered in the DOM, just not visible. You can verify this using your browser's developer tools and observing how the DOM changes when you toggle the checkbox.

`v-if`

### 1.4 Again and again: v-for

Another heavily used directive is `v-for`, which is much like the for loop in most programming languages. But first we need an array of data to loop over! Update `index.js`.

```
// index.js
  new Vue({
    el: '#app',
    data () {
    return {
      message: 'Hello Vue.js!',
      visible: true,
      names: ['Lachlan', 'Chinami', 'Johnny']
    }
  }
})
```

Now we have some data to loop over. In regular JavaScript, it would be done something like this:

```
for (let n in names) {
  console.log(names[n])
}
```

Vue has something very similar. Update `index.html`.

```
<!-- index.html -->
<div id="app>
  <input v-model="message" v-show="visible"/>
  <input v-model="visible" type="checkbox" />
  {{ message }}

  <div v-for="name in names">
    {{ name }}
  </div>
</div>
```

Refreshing the page should display all the names under the `<input />` from the previous example.

### 1.5 Events: v-on

Vue provides an API to react to various events, such as clicks, button presses, and so on: `v-on`. Let's see it action.

```
<!-- index.html -->
<div id="app">
  <input v-model="message" v-show="visible"/>
  <input v-model="visible" type="checkbox" />
  <button v-on:click="reverseNames">Reverse</button>
  {{ message }}

  <div v-for="name in names">
    {{ name }}
  </div>
</div>
```

`v-on` can be followed by a number of built in events, such as

* click
* mouseover
* keyup
* keydown
* and many more

You can also provide custom events, as we will see later. Using `v-on` also let's us introduce a new a new part of the Vue api: the `methods` object, which behaves much like the `data ()` object, but with functions.

```
// index.js
new Vue({
  el: '#app',
  data () {
    return {
      message: 'Hello Vue.js!',
      visible: true,
      names: ['Lachlan', 'Chinami', 'Johnny']
    }
  }, 
  methods: {
    reverseNames () {
      this.names.reverse()
    }
  }
})
```

### 1.6: Bringing it all together: a todo app

Armed with a few simple directives and a small part of the Vue api, we can now build our first application - a classic todo app. The app should:

* Insert a new item
* Mark an item as complete
* Delete an item

```
new Vue({
  el '#app'
})
```

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
</head>
<body>
<div id="app">

</div>

<script src="index.js"></script>
</body>
</html>
```

From now on, only the contents of `<div id="app"></div>` will be shown brievity.

The next code block adds:

1. an input field, bound with `v-model` and `v-on`, for creating a new todo item
2. a `data` object to hold a blank string for the item name, and an todos array
3. a `methods` object, to house a method for adding a new todo item to the todos array

```
// index.html
new Vue({
  el: '#app',
  data () {
    return {
      todo: '',
      id: 0,
      todos: []
    }
  },
  methods: {
    addTodo () {
      this.todos.push({ id: this.id, title: this.todo })
      this.todo = ''
      this.id += 1
    }
  }
})
```

```
// index.js
<div id="app">
  <input v-model="todo" v-on:keydown.enter="addTodo" type="text" />
  {{ todos }}
</div>
```

This should all be familiar. One new thing is `v-on:keydown.enter.` This allows allows us to simply press enter, which calls the `addTodo` method and inserts a new entry to the `todos` array. Notice we also include an `id` when inserting the todo, and a `isDone` variable. These are useful for identifying a todo item uniquely, and the completion functionality later on.

Now you should be able to type some text in the input and press enter to add it to a list.

Next let's add the ability to delete and complete items, finishing the core functionality.

```
// index.js
new Vue({
  el: '#app',
  data () {
    return {
      todo: '',
      id: 0,
      todos: []
    }
  },
  methods: {
    addTodo () {
      this.todos.push({ id: this.id, title: this.todo, isDone: false })
      this.todo = ''
      this.id += 1
    },
    removeById (id) {
      let ind = this.findIndexById(id)
      this.todos.splice(ind, 1)
    },
    findIndexById (id) {
      for (let t in this.todos) {
        if (this.todos[t].id === id) {
          return t
        }
      }
      return -1
    }
  }
})
```

```
<!-- index.html -->
<div id="app">
  <input v-model="todo" v-on:keydown.enter="addTodo" type="text" />
  {{ todos }}
  <div v-for="todo in todos">
    {{ todo.title }} <input type="checkbox" v-model="todo.isDone">
    <button v-on:click="removeById(todo.id)">X</button>
  </div>
</div>
```

Only one extra line in `index.html`! Very concise. This listings adds two new methods, `findIndexById()`and `removeById()` . `findIndexById()` receives the index of the todo item and returns it's location in the `todos` array, and `removeById()` splices it out. The method is called in the same way the `addTodo()` method is called, using `v-on`. We also add a checkbox and bind it to the relevant todo's isDone property.

One important thing to note is how an element is removed from an array in Vue, using the `Array.prototype.splice()` method. Due to JavaScript limitations, Vue cannot detect:

1. Directly setting an item with an index, for example `todos[0] = newTodo` will not be observed, and data bindings will not update
2. When modifying the length of an array, for example `todos.length = 3`

The following array methods trigger updates in Vue:

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

The last thing to do is to draw a line through completed todos, which introduces a new topic: class binding!

### 1.7: Class binding

Using the `v-bind` directive, it is possible to bind a `class` or `style` property to a variable or method. Firstly, make a new file, called `index.css` and include in in `index.html` like this:

```
/* index.css */
.completed {
  text-decoration: line-through;
}
```

Now, any todo with with `class="completed"` will get a line through it. The final application looks as follows:

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
</head>
<body>
<div id="app">
  <input v-model="todo" v-on:keydown.enter="addTodo" type="text" />
  {{ todos }}
  <div v-bind:class="todoStyle(todo.isDone)" v-for="todo in todos">
    {{ todo.title }} <input type="checkbox" v-model="todo.isDone">
    <button v-on:click="removeById(todo.id)">X</button>
  </div>
</div>

<link href="index.css" rel="stylesheet" />
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
      todo: '',
      id: 0,
      todos: []
    }
  },
  methods: {
    addTodo () {
      this.todos.push({ id: this.id, title: this.todo, isDone: false })
      this.todo = ''
      this.id += 1
    },
    removeById (id) {
      let ind = this.findIndexById(id)
      this.todos.splice(ind, 1)
    },
    findIndexById (id) {
      for (let t in this.todos) {
        if (this.todos[t].id === id) {
          return t
        }
      }
      return -1
    },
    todoStyle (isDone) {
      if (isDone) {
        return "completed"
      }
    }
  }
})
```

Note:

`<div v-bind:class="todoStyle(todo.isDone)" v-for="todo in todos">` receives a function, `todoStyle()` and passes it the todo's `isDone` property, which `return "completed"` if `isDone` is true. Because `isDone` is reactive, when the checkbox is clicked, the class is updated, as well as the style. Pretty neat.

### 1.8 Keeping it concise: shorthand directives

You may notice typing things like `v-bind:class` and `v-on:click` gets tiring and makes the code a little difficult to read. Thankfully, there is a better way.

* `v-bind` can be dropped, leaving `:class="todoStyle(todo.isDone)"`
* `v-on` can be replaced with `@`, leaving `@click="removeById(todo.id)"`

Much cleaner! From now on, all code snippets will use the shorthand.

