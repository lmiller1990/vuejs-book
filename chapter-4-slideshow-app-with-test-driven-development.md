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

Next, onto the thumbnails. Repeat the same procedure above: make a file called `SlideThumbnail.vue` inside `components`, put the default template in, but this time import `SlideThumbnail` inside of `SlideThumbnailContainer`, not `Hello`. And then do it again, for a component called `MainSlide`, which \_will \_be rendered inside of `Hello`. The current code for all the components \(total of four\), is below.

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
  width: 30em;
  height: 20em;
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
  border: 1px dotted grey;
  height: 10em;
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
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 15em;
  height: auto;
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

Not too useful. However, using a few directives, we can do a lot. But first, we need to have a brief talk about state management in Vue, and the \_flux \_pattern that was born to handle complex user interfaces in single page applications.

### 4.3: Unidirectional flow, and the single source of truth

Managing data for a complex single page application can get very difficult, very fast. The solution eventually arrived on to handle this is the _flux \_pattern, popularized by Facebook. In flux, your application has a \_store_ - literally, a huge Javascript object that stores all the data your application needs. All the components go to the store for data, so the store is known as the "single source of truth" - the only place data is stored. There is a little more to flux that will be introduced later using Vue's very own _vuex_ module, a flux implementation with deep integration with Vue, but for now the important thing to know is we should store all the data in a single location, and pass bits and pieces to components. Since Vue is reactive, whenever something changes in the store \(in the pointpoint app, an object contained in a top level `data` function\) the changes will be automatically reflected in all the other components.

### 4.4: Creating the Store

We will create our store object in `Hello`, since it is the top level component in our application. Update `Hello.vue` as shown below:

Hello.vue

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
      msg: 'Welcome to Your Vue.js App',
      store: {
        slides: [
          { id: 0, title: 'Demo', content: 'This is a demo slide' },
          { id: 1, title: 'Vue', content: 'Flux is a great way to manage your app' }
        ]
      }
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

Looks good. Now, let's pass the slides to the `SlideThumbnailContainer` to display - but before doing so, let's write our first real test, to ensure the behaviour is as expected.

### 4.5: Test! SlideThumbnailContainer.spec.js

Inside test/unit/specs/, create a new file called `SlideThumbnailContainer.spec.js`. Next, add the following test skeleton. Again, it might be a good idea to keep a copy of this - all tests start out using the same template.

SlideThumbnailContainer.spec.js

```
import Vue from 'vue'
import SlideThumbnailContainer from '@/components/SlideThumbnailContainer'

describe('SlideThumbnailContainer.vue', () => {
  it('should receieve an array of slides as a prop', () => {

  })
})
```

First we import Vue, and the components, and whatever else we need to test. In this case, we will be mounting the component, and using some of the Vue internal apis, so we need both Vue and the component. If we were just testing a method that does not need Vue itself, we would simple import the method, and nothing else.

The `describe` block explains what the subject of this spec file is, and the `it` block \(which we can have any amount of\) explains what each individual test is doing.

First things first - we should declare and extend a Vue instance with our component, SlideThumbnailContainer. This way, the component will get all the Vue lifecycle and api methods, such as `created`, `data`, `props`, etc, as it does in the real application, where we import the component and attach it in the `components: { }` section of `Hello.vue`.

`const Component = Vue.extend(SlideThumbnailContainer)`

Next, we instantiate an instance of the component. At this point, we can pass props using the `propsData` option. You can read more about this api option here: https://vuejs.org/v2/api/\#propsData

```
const vm = new Component({
  propsData: {
    slides: [
      { id: 0, content: 'Test' }
    ]
  }
})
```

We want to test that a `slides` prop is passed. Lastly, we mount the component using the lifecycle hook `$mount`. This is called automatically in the main application, when Vue detects custom component markup, such as `<SlideThumbnailContainer />`, however in a unit test, we need to do it manually. 

`vm.$mount()`

Now, time to make some assertions about what we want the component to look like after it has been mounted. We expect it to have a `slides` prop, which has one item in it, with `content` equal to `'Test'`.

```
expect(vm.slides.length).to.equal(1)
expect(vm.slides[0].content).to.equal('Test')
```

The full listing looks like:

SlideThumbnailContainer.spec.js

```
import Vue from 'vue'
import SlideThumbnailContainer from '@/components/SlideThumbnailContainer'

describe('SlideThumbnailContainer.vue', () => {
  it('should receieve an array of slides', () => {
    const Component = Vue.extend(SlideThumbnailContainer)
    const vm = new Component({
      propsData: {
        slides: [
          { id: 0, content: 'Test' }
        ]
      }
    })
    vm.$mount()

    expect(vm.slides.length).to.equal(1)
    expect(vm.slides[0].content).to.equal('Test')
  })
})
```



