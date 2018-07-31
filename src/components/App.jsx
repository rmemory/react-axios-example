/* eslint-disable react/jsx-indent-props, react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	state = {
		posts: [],
		err: false,
		errMsg: '',
	}

	async componentDidMount() {
		try {
			/* When the promise is fulfulled, state will be updated and the
			   component updated. We could use a simple

				get().then((res) => { blah blah }

				but I'll use async and await instead, which allows me to
				display a simple loading message while waiting for the data */
			const result = await axios
				.get('https://www.reddit.com/r/reactjs.json');

			if (result) {
				/* Drill into the response to extract the titles
				   of the various posts which are found under
				   res.data.data.children, which is a list of objects
				   containing two fields: "kind" and "data". We only care
				   about the "data" because it contains an object, which
				   in turn contains the title. Thus the map operation
				   returns an list containing the all of the obj.data's.
				   These are cast by the application below to be a "post",
				   from which we obtain the id and title. */

				const posts = result.data.data.children.map(obj => obj.data);
				this.setState({ posts });
			} else {
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					posts: [],
					err: true,
					errMsg: 'Invalid movie data',
				});
			}
		} catch (e) {
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				posts: [],
				err: true,
				errMsg: `Invalid movie data: ${e.name}: ${e.message}`,
			});
		}
	}

	render() {
		const { err, errMsg, posts } = this.state;
		let message;

		if (!err) {
			message = 'Loading posts ...';
		} else {
			message = errMsg;
		}

		return (
			<div>
				<h1>
					/r/react.js
				</h1>
				{
					(() => {
						if (posts.length > 0) {
							return (
								<ul>
									{this.state.posts.map(post => ( // eslint-disable-line react/destructuring-assignment
										<li key={post.id}>{post.title}</li>
									))}
								</ul>);
						}
						return <p>{message}</p>;
					})()
				}
			</div>
		);
	}
}

export default App;
