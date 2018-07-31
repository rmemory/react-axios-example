To fetch data from the server, you will need an HTTP library. Unlike other frameworks, React doesn't have an opinion on it. 

In any case, there are many of them out there. Fetch, Axios, and Superagent are probably the 3 most popular -- and Fetch is actually part of the JS standard library now. My own favorite is Axios because of how simple it is.

This project is a basic React based project, demonstrating simple use of axios, while using Webpack. 

It just grabs the data from a reddit api, and displays the title strings it finds. Pretty basic stuff.

To use it, first add the module to the project:

```
$ npm install --save axios
```

Then import it into whichever Components will use it (in this case, I just use a single component):

```
import axios from 'axios';
```

To access an API, here is an example in the componentDidMount lifecycle method which waits for the promise to be resolved (aka, not async)

```
componentDidMount() {
  axios.get(`https://www.reddit.com/r/reactjs.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
}
```

The code uses aync/await instead.