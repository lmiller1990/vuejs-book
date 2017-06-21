### Chapter 4: Slideshow application with Test Driven Development

No more boring todo apps! Or learning non-Vue things! It's time to make a real app. We will use TDD, _test driven development,_ to ensure the application functions correctly, and because we are good developers; in this day and age, with the amount of tools, frameworks and resources for testing, there is really no reason to not do it.

#### 4.1: Let's Get Going: Setup

The vue-cli - _command line interface -_ allows us to set up an entire project, with linting, tests, and everything, in a single line. Install it by opening your terminal and running `npm -g install vue-cli`. There are a handful of templates available. We will use the fully featured webpack template. Using your terminal navigate to where you want to create the project and run `vue init webpack slideshow-app`. Answer the questions as such:

```
Project name powerpoint-app
Project description Powerpoint app.
Author [Your name]
Vue build standalone
Install vue-router? No
Use ESLint to lint your code? Yes
Pick an ESLint preset Standard
Setup unit tests with Karma + Mocha? Yes
Setup e2e tests with Nightwatch? Yes
```

then `cd` in, run `yarn install` or `npm install` if you wish. Yarn will likely become the standard, so it's good to be in habit of using it, but the commands do the same thing in this case: install the modules from `package.json`. Wait a while and `npm run dev`. The application should automatically open! If not, use your browser to visit localhost:8080, where you can see the app.

#### 4.2: Project Structure and Components Setup

This section briefly explains the structure of the project and the features we will be using. Navigate to the project folder, where you see the below structure.

```
▸ build/            // output when you build the app for production                       
▸ config/           // configuration for webpack, test framework, etc   
▸ node_modules/     // packages
▸ src/              // the vue app goes here. The majority of the your time will be spent here.
▸ static/           // static assets like images.
▸ test/             // test - contains e2e and unit - more on this soon
index.html    
npm-debug.log     
package.json     
README.md                   
yarn.lock
```

Most of our time will be adding things to _src, \_which is where the Vue app lives, and \_test_, where the tests go. Don't worry about the others for now.

The webpack template comes with a ton of really nice features. The first **hot reloading**. When you make a change, webpack will automatically update the page, without the need to refresh. Assuming you still have the terminal open where you ran `npm run dev`, try opening `Hello.vue` which is inside of `src/components`. You should see three sections:

```
// Hello.vue
<template>
<!-- lots of html -->
<script>
export default {
  name: 'hello',
    data () {
     return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
}
</script>

</style scoped>
/* css */
</style>
```

This should look similar to the todo project from chapter 2 - a Vue component, all in a single `.vue` file. Try changing the `msg` variable to something different and save the file - you should see the change reflected immediately in your browser! Webpack is watching the files, and whenever you make a change, it will update the page \(or display an error for you to fix\).

Another important feature is the test framework included. There are two kinds of tests we will write: _unit_ and _end-to-end \(e2e\)._ Unit tests focus on testing individual pieces of code, and e2e tests look at the bigger picture, to see if lots of pieces of code are working together correctly.

Open another terminal and navigate to the root directory of the project and run `npm run unit`. This will run the unit tests - although we didn't write any yet, the template includes one to show us how they work. If you changed the `msg` variable earlier, your terminal will display a ton of errors after running `npm run unit`. Why? Scroll up a little and there should be something like the below output:

```
Hello.vue
    ✗ should render correct contents
    expected 'Welcome!' to equal 'Welcome to Your Vue.js App'
```

In my case, I changed `msg` to be 'Welcome!'; the test was expecting the original 'Welcome to Your Vue.js App' text. Let's fix it. Open `test/unit/specs/Hello.spec.js` . It looks like this:

```
import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
```

The import line is `expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Your Vue.js App')`. From the start:

`vm` is the Hello component, and using the `$el.querySelector` method, we find a class called hello `.hello` containing a h1 containing the textContent we expect to see. Because it was different, the test failed. Update the test, replacing `'Welcome to Your Vue.js App'` with the message you wrote earlier in `Hello.vue`. Now run the unit test suite again using `npm run unit`.

If everything when will you should see the following output:

```
Hello.vue
    ✓ should render correct contents

PhantomJS 2.1.1 (Mac OS X 0.0.0): Executed 1 of 1 SUCCESS (0.013 secs / 0.007 secs)
TOTAL: 1 SUCCESS
```

Great! Now open `src/App.vue` and remove the line `<img src="./assets/logo.png">`.We don't need that. Also remove everything inside of `<style scoped></style>`. Your `App.vue` should now look like:

```
<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
</style>
```

Time to start building. We are going to make a simple clone of Microsoft's Powerpoint application. On the left hand side of the screen, we will have a number of small, editable slides, and selecting one will show a large version of it on the right. We will write tests for each feature and piece of functionality as we go.

We will start with the left hand side bar, which will contain a number of small slides. First things first, make a component called `SlideThumbnailContainer.vue`, inside of `components`, with the following skeleton.

```
<template>
  <div class="container">
    Slides  
  </div>
</template>

<script>
export default {
  name: 'SlideThumbnailContainer'
}
</script>

<style scoped>
</style>
```

You may want to keep a copy of this template, since we will use it for every component we make.

Next, make sure everything is working by importing the component in `Hello.vue`, and registering it, and rendering it, as below:

```
<template>
  <div>
    <SlideThumbnailContainer /> // 3) render the component
  </div>
</template>

<script>
import SlideThumbnailContainer from '@/components/SlideThumbnailContainer' // 1) import the components
export default {
  name: 'hello',
  components: {
    SlideThumbnailContainer // 2) register the component
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

Note I have removed the default styling.

If you are still running `npm run dev` in a terminal window from before, the page should automatically update and display "Slides" on the screen \(or an error overlay from the linting\). Webpack hot reload is not perfect, so you might need to refresh the page. If you stopped the terminal from earlier, run `npm run dev` again.

Next, onto the thumbnails. Repeat the same procedure above: make a file called `SlideThumbnail.vue` inside `components`, put the default template in, but this time import `SlideThumbnail` inside of `SlideThumbnailContainer`, not `Hello`. And then do it again, for a component called `MainSlide`, which _will _be rendered inside of `Hello`. The current code for all the components \(total of four\), is below.

`MainSlide.vue`

```
<template>
  <div class="container">
    Main Slide
  </div>
</template>

<script>
export default {
  name: 'MainSlide'
}
</script>

<style scoped>
.container {
  border: 1px dotted pink;
  margin-left: 5px;
  flex-grow: 1;
}
</style>
```

`SlideThumbnail.vue`

```
<template>
  <div class="container">
    One slide.
  </div>
</template>

<script>
export default {
  name: 'SlideThumbnail'
}
</script>

<style scoped>
.container {
  width: auto;
  margin: 2px;
  border: 1px dotted grey;
}
</style>
```

`SlideThumbnailContainer.vue`

```
<template>
  <div class="container">
    Slides
    <SlideThumbnail />
    <SlideThumbnail />
  </div>
</template>

<script>
import SlideThumbnail from '@/components/SlideThumbnail'
export default {
  name: 'SlideThumbnailContainer',
  components: {
    SlideThumbnail
  }

}
</script>

<style scoped>
.container {
  border: 2px solid black;
  padding: 8px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 20em;
}
</style>
```

`Hello.vue`

```
<template>
  <div class="hello">
    <SlideThumbnailContainer />
    <MainSlide />
  </div>
</template>

<script>
import SlideThumbnailContainer from '@/components/SlideThumbnailContainer'
import MainSlide from '@/components/MainSlide'
export default {
  name: 'hello',
  components: {
    SlideThumbnailContainer,
    MainSlide
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.hello {
  display: flex;
  justify-content: stretch;
}
</style>
```

I added some css so the application looks decent -- css is not the focus of this book, so it is not explained. It's fairly simple css anyway, so it should be easy enough to figure out things are working.  Notice I use the same class, `container`, multiple times - because of the `scoped` tag in the `<style>` tag, the style is uniquely applied to the component it is declared in.

Your browser should now show...

\[TODO: Image\]

Not too useful. However, using a few directives, we can do a lot. But first, we need to have a brief talk about state management in Vue, and the _flux _pattern.



