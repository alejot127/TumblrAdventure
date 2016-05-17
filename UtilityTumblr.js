"use strict";

/**
A PhotoPost which contains a single image.
  @param post | The post object.
  @param postID| The post ID.
  @param totalPosts | The total number of posts to display.
  @param radius | The radius of the Museum.
*/
function PhotoPost(post, postID, totalPosts, radius) {
  // the photo object for this post
  var photo = post.photos[0].alt_sizes[1];

  // create the texture from the photo, create a placeholder
  // while the image is downloaded.
  var texture = createTextureFrom2DImage(gl, photo.url);
  var tempTex = createTextureFromData(gl, new Uint8Array([255, 255, 255, 255]));

  // TODO incorporate captions to posts
  //this.caption = post.caption;

  // where the post will be placed with respect to the center
  var location = vec3.create(0, radius*Math.sin((Math.PI/totalPosts)*postID),
                    radius*Math.cos((Math.PI/totalPosts)*postID));
  // how the post will be oriented.
  var orientaion = (Math.PI/totalPosts)*postID - (Math.PI/2);

  // the dimensions of the post's canvas
  var postCanvas = new PostCanvas();
  var modelMatrix = getGeneralRotationMatrix(orientaion, location,
                      vec3.create(0, 1, 0));

  var normalMatrix = mat3.normalFromMat4(mat3.create(),modelMatrix);

  // create buffers from the post's canvas.
  var buffers = createBuffers(gl, postCanvas);

  // draw the post
  this.draw = function(gl, aSetter, uSetter, camera) {
    // Set up uniforms unique to this post.
    uSetter["modelMatrix"](modelMatrix);
    uSetter["normalMatrix"](normalMatrix);

    if (!texture.complete) {
      uSetter["diffuseMap"](tempTex);
    }
    else uSetter["diffuseMap"](texture);

    bufferDraw(gl, "TRIANGLES", aSetter, 4, buffers);
  };
}

/**
Contains the actual post image to display. Really just a square.
*/
function PostCanvas() {
  this.positions = new Float32Array([
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ]);

  this.texture = new Float32Array([
    1.0, 1.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 0.0
  ]);

  // TODO Add Normals when wanting to incorporate lighting.
  //this.normal = new Float32Array([]);

  this.index = new Uint8Array([
    0, 1, 2,
    0, 2, 3
  ]);
}
