### Chapter 5: Simple Code Editor with Vuex 

#### 5.1: Features and Setup

The next app we will be building will be a little more ambitious, and with the help of the official state management library for Vue, _vuex_, more modular, testable, and expandable. But first: a deeper look at the _flux_ pattern alluded to in the previous chapter.

#### 5.2: Flux and vuex

#### 5.3: Scaffolding the application 

// remove all the junk from App.vue
// chrome driver!

#### 5.4: Installing vuex

After scaffolding the application, we need to install vuex. The template offers us vue-router, but not vuex - I find myself including vuex in almost everything I build, so it may pay off to make a template with vuex and reuse it. Anyway. in `/src`, create a new folder called `/store` and inside it a file called `store.js`. This will be the entry point to the store.

Inside `store.js`, enter:

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

export const mutations = {
}

export default new Vuex.Store({
  state,
  mutations
})
```

We have our store. One of the great things about vuex, and flux in general, is the ability to test them _independently_ of the application. The job of the store is to get, shape and update data - nothing to do with how the data is displayed. The `state` object is what we called `store` in the previous chapter - all the data used in the application is saved here. One of the most important rules of flux is _the state cannot be directly modified_. It has to be _mutated_ - using `mutations`. 

So, if we want to increment `count`, we need a `mutation` - a method that will do it for us. Let's write a test for that. In `/test/unit/specs` create a folder called `store`, and inside it a file called `testMutations.spec.js`. The contents will look like below:

``` js
import { mutations } from '@/store/store'

const { TEST_MUTATION } = mutations

describe('TEST_MUTATION', () => {
it('increments a count by 1', () => {
    expect(TEST_MUTATION).to.be.a('function') 
  })
})
```

Of course, running this fails. Before making it pass, notice `{ mutations }` is used to just get the mutations - since the store exports a number of things, and we only want the mutations. Next, we destructure _again_ to get the particular mutation we are interested in. Note we do _not_ import the state - as we will see, it is better to make a fake state for each test, so we can ensure it changes in the way we expect.

Ensure you have the following output - that means everything is working properly:

``` js
TEST_MUTATION
    ✗ increments a count by 1
  AssertionError: expected undefined to be a function
```

Passing this test is trivial, so let's go ahead and write the rest of it first.

``` js
import { mutations } from '@/store/store'

const { TEST_MUTATION } = mutations

describe('TEST_MUTATION', () => {
  it('increments a count by 1', () => {
    const state = {
      count: 0
    }
    expect(TEST_MUTATION).to.be.a('function')

    TEST_MUTATION(state)

    expect(state.count).to.equal(1)
  })
})
```

Notice we pass the state to the mutation. As will be shown later, calling a mutation in a Vue app with Vuex installed will automatically pass the state as the first argument - however, since we effectively just testing plain Javascript functions right now, we need to pass the state manually, to emulate what Vuex does for us. 

Running this will give us a failing test, where 0 is expected to equal 1. Let's fix that.

``` js
// store.js
export const mutations = {
   TEST_MUTATION (state) {
    state.count += 1
  }
}
```

And it's passing. Again: we are not import Vuex, or Vue, or anything right now - just plain Javascript functions and objects, which are easily testable. Remember, we don't need to test if Vue and Vuex are working properly, those libraries have their own unit tests. We want to test if _our code_ is doing what it should be, in this case, adding 1.


