# telly

## architectural decisions

Most important features:

- Every page visits shows random results 
- Random, yes but always enough of the various types (especailly high rated ones)
- deboucing search (no unneeded calls to API)
- recursive calls to API both as a stream (high rated shows) as well as a bulk (inital fetch genres)
- caching state for speed (when going to details for example, no call to API)
- lazy loading imagery for initial speed improvements (and show low res version while loading)
- types are api pages are determined by traversing the API (sort of type generation)
- usage of method chaining, partially applied functions, Typescript: 'Indexed Access Types' recursion avoiding side effects as much as possible (or at least containing them).

A replay subject is used as the main state machine. This is the single entry point for everything series. Side effects are abstracted to their respected functions that operate very muche like selectors (in the redux pattern). Taking relevant slices of state. That means for example that the detail page first looks through this state object after reverting to a 'manul' fetch by ID (for example when a search is conducted) or when a page reload is done on a details page (see loading indicator for difference).

There is heavy usage of Observables, native to Angular and something I wanted to demonstrate in Vue: the declarative, ease and side effets free nature of the pipes. I believe that the future of UI are reactive, this could be by treating user input as streams (like I do in other example in my portfolio or in this application through search input) or on the other hand by seeing API data returns as streams, as is heavily the case with this one. 

This comes best to fruition in the fetching of the series. There are two cases studies one of recursive fetching by "replaying" a total of 5 times. These results are brought in as a single package and brought to state. In the case of high rated series there was a slightly different need. In that case the resursion happens until it finds series with a certain rating. This rucursion strategy use partialy applied functions to set initial state for that specific fetch (in the form of a random page) and fetching through until enough high rated series are found. This can be seen in de network tab.

In both cases the results are random sequences of data. So that the user will find unique data on every visit. Search is also treated as a stream and merged into the state accordingly. When you startup the application de delayed execution of data assures that startup times are quick. This is also due to lazy loading all images. More on that later.

Because higher rated series come in later. The genre lists are locked after the first batch comes in, through using the take(1) operator. This assures the reactive nature is supressed for those specfically but upheld for example for highrated which is still streaming in during page load to assure quick times, not overloading the API and giving the user already something to look at.  

Lastly on the streams. There are some delays. Some to distribute image loading for better user experience and others to assure no API call limited is reached. 

Search gets a seperate state object. Input is debounced to assure that not every keystroke makes a trip to te server. The switch strategy afterwards assures that requests ungoing are cancelled if done in quick suscession. 

Throught the whole application everything concerning imagery is lazy loaded until they come into view. While loading the higher res images the lower resolution images are taking their place. 

At mounting the application the tv shows are fetched recursively, a total of 5 times on 5 random pages. The results are stored and displayed into the dom accordingly. Results are sorted and filtered to give a good experience. 

Testing is done by virtulizing time and mocking where needed. This time aspect is done with marbles as well, which changes the execution context of observables to flat. A special mock was created that allows easy chaining to remove properties as see fit. Also this mock uses a tecnique called "Indexed Access Types", typescript knowns the shape of the object (3 layers deep) for ease bug free usage. Also there is a helper (that I kept in for demonstrating purposes) that fetches the entire amount of pages of the API and all the genres that exsist (this is then used as a type, sort of a light type generation). I put comments in the application how to use it if interested. 

Typescript is used throughout with some exceptions where it gave problems: https://github.com/ReactiveX/rxjs/issues/3150 or if very generic usage.

The rest of the application is standard compnent achitecture and routing. Similar in react, Angular orin this case Vue.  

## room for improvement

All though random starting point on each fetch. There sequences are linear from that moment forward. Improvement could be to add some non linear routes through the pages from that moment forward. 

Declaration, I made heavy used of functional reactive programming. However I skipped one step for the most part, which is to declare the pure functions in more descriptive names, e.g. 

```
map(x => x + 2)
// vs
map(plusTwo) 
```

Other aspects for consideration were: e2e testing, marble testing (specific to rxjs)global error handling, loading spinners, destinct until changed on input, global css styles, redux-like state management, more tests, unmounting images when out of view.  

## styling, UI/UX and the components

The styling is responsive by utilizing max values and media queries. There are some basic animations added for dynamics and state it past from components down and if great distances between components are to be bridged they are carried over by the various state machines.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```