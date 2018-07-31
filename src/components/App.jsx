/* eslint-disable react/jsx-indent-props, react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import './app.css';

class App extends Component {
	state = {
		posts: [],
	}

	componentDidMount() {
		axios.get('https://www.reddit.com/r/reactjs.json')
			.then((res) => {
				/* Drill into the response to extract the titles
				   of the various posts which are found under
				   res.data.data.children, which is a list of objects
				   containing two fields: "kind" and "data". We only care
				   about the "data" because it contains an object, which
				   in turn contains the title. Thus the map operation
				   returns an list containing the all of the obj.data's.
				   These are cast by the application below to be a "post",
				   from which we obtain the id and title. */
				const posts = res.data.data.children.map(obj => obj.data);
				this.setState({ posts });
			});
	}

	render() {
		return (
			<div>
				<h1>
					/r/react.js
				</h1>
				<ul>
					{this.state.posts.map(post => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

// MediaCard.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	body: PropTypes.string.isRequired,
// 	imageUrl: PropTypes.string.isRequired,
// };

export default App;
