"use strict";

/**
Tumblr credentials for this app.
*/
var OAuthKey = 'gOntw59mJPEOkfrFH5buoTfyqXEub8cskHGUoQ4nKSp35vksTo';
var blogURL = '';

/**
Entry point.
*/
function main() {

	function draw(timeStamp) {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.useProgram(renderer.program);
		museum.draw(renderer.attributeSetter, renderer.uniformSetter, camera);
		animId = requestAnimationFrame(draw);
	}

	// Initialize all the objects to draw, then draw.
	var radius = 20;
	var gl = init('theCanvas');
	var renderer = setUpRenderer(gl, 'vertexShaderCode', 'fragmentShaderCode');
	var tumblrClient = tumblr.createClient({ consumer_key: OAuthKey });
	var museum = setUpMuseum(gl, tumblrClient, radius);
	var animId = requestAnimationFrame(draw);
}

/**
Contains all of the objects to draw, as well as the lighting.
	@param gl | The WebGL context.
*/
function Museum(gl) {
	var lightPosition = vec4.create(0.0,1.0,0.0,1.0);
	var lightColor = vec4.create(1.0,1.0,1.0,1.0);
	this.posts = [];
	this.addPost = function(post) {this.posts.push(post);};
	this.addPosts = function(posts) {
		posts.forEach(function(post) {
			this.posts.push(post);
		});
	};

	// TODO add bounds in the future.
	this.bounds = null;

	this.draw = function(aSetter, uSetter, camera) {
		this.posts.forEach(function(post) {
			// Set uniforms for all posts in museum.
			if (uSetter["viewProjectionMatrix"])
				uSetter["viewProjectionMatrix"](mat4.mult(mat.create(),
																									camera.perspectiveMatrix,
																									camera.viewMatrix));
			if (uSetter["eye"]) uSetter["eye"](camera.eye);
			if (uSetter["lightPos"]) uSetter["lightPos"](lightPosition);
			if (uSetter["lightColor"]) uSetter["lightColor"](lightColor);

			post.draw(gl, aSetter, uSetter, camera);
		});
	};
}

/**
Creates a Museum using the tumblr client.
	@param gl | The WebGL context.
	@param tumblrClient | The Tumblr client which is used to retrive images from
		Tumblr.
	@param radius | The size of the museum.
	@return museum | The created museum.
*/
function setUpMuseum(gl, tumblrClient, radius) {
	var museum = new Museum(gl);
	var postID;
	tumblrClient.posts(blogURL, { type: 'photo' },
		function(err, data) {
			if (err.msg !== 'OK') console.log(err.msg);
			var totalPosts = data.posts.total_posts;
			data.posts.forEach(
				function(post) {
					var photoPost = new PhotoPost(post, postID++, totalPosts, radius);
					museum.addPost(photoPost);
				});
		});

	return museum;
}
