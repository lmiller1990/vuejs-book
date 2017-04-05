### Chapter 3: A modern workflow with webpack

#### 3.1 More modules! Yarn/NPM

So far, we have developed our applications in two files: `index.js` for all the Javascript code, mostly business logic, and `index.html`, where we build the UI. As an application grows in size and complexity,  this becomes impossible to manager. Before the days of package managers, tools like webpack and browerify, and Node.js \(don't worry if you dont know about any of those yet - you soon will\), people would just include a bunch of &lt;script&gt; tags at the top of the page.

Fortunately, there is a better way now! Introducing **Node.js**. We will not be using Node.js itself - Node itself is a client side Javascript architecture, which is not the focus of this book - however, it comes with NPM \(_node package manager\)_ which is used to retrieve, install and update modules for most Javascript based applications nowdays. After some setup, you can simply run `npm install [module]` and in your and `import [package] from 'package'` to use any of the thousands of modules available.

Next, **Yarn** - another package manager for Javascript modules, using the same registry as NPM. Yarn addresses some of the problems NPM taught us, and has some other nice features, so we will use Yarn for the rest of this book.

Before getting into too much more depth, let's see Yarn in action. Firstly, download Node.js and install it - it comes with NPM. To use Yarn, you need to use a _terminal_, also known as the _command prompt._ If you are on Windows, _Powershell_ should be preinstalled, and _terminal_ on macOS/Linux. Open your command line of choice.

#### 3.2 Installing and running commands from the command line

If you have successfully installed Node, you should be able to run the following command:

`npm --version`

and it shoud print something like `4.0.5`. If not, troubleshoot until you are able to get this to work.

Next, we will install Yarn using NPM! Installing a package manager with another package manager? Think installing Google Chrome using Internet Explorer. Run:

`npm install --g yarn`

Where -g means 'global' - so you can use Yarn from any directory on your PC. When Yarn finishes installing, we are ready to get started... after a quick crash course using the terminal. Some simple commands that will work in macOS's terminal and Windows Powershell:

* `ls`

This command will show the contents of the current directory in the terminal window.

* `cd`_ \(stands for change directory\)_

Used to change directories from within a terminal. `cd ..` will take you up one level, and `cd [folder]` will take you into the folder. Try moving around from wherever your terminal lands you by default to get used to it. If you get lost, just use `ls` to see all the files in the current directory, and `pwd` on macOS or `dir` on Windows to see the current location.

* `mkdir [directory name]` on macOS/Linux will create a new folder called \[directory name\]. Give it a try a few times
* `New-Item [directory name]` is the Windows equivalent.

* `touch [file name]`will create a new file called \[file name\] on macOS.

* `New-Item [file name]` is the Windows equivalent.

This should be enough to get started. Using `cd`, navigate to the directory you want to build the following application \(not this chapter's app, but a simple example\). On macOS, I type `cd` without any arguments to get back to my root directory. Then I type `mkdir yarn-test-app` to create new folder for my test app, and then `cd yarn-test-app` to enter the folder.

#### 3.3 Modules! Managing your first app with Yarn

Once you've gotten to the location you want to make your application, create a new directory using the relevant command, and `cd` into that directory. Then run `yarn init -y` to get started! Typing `ls` should now display the contents of the folder, which contains a single file called `package.json`. This will hold all the information needed to get our application up and running.

Next, create a file called `index.js` using the command line. On macOS, I simply type `touch index.js`. This will be the starting point for a simple test app, which will simply greet the user \(from the command line\). Let's install a package to help us do that: **greeting**. Run:

`yarn add greeting`

And you should see a bunch of words in the terminal, and a success message if everything goes well. Let's use **greeting** to say hi. Inside of `index.js`, enter the following:

```
const greeting = require('greeting')

let randomGreeting = greeting.random()
console.log(randomGreeting)
```

To use the **greeting** package, simply `require` it! To run this program, type `node index.js`. Node, the server side Javascript architecture, will run the script and output a random greeting. Trying running it again for some other greetings.

Notice `package.json` now looks like this:

```
// index.js
...
"dependencies": {
  "greeting": "^1.0.6"
}
...
```

So if someone else was to run `yarn install`, the required packages would be installed, based on the `package.json` file.







