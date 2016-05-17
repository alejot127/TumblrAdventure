"use strict";


if(!MIN_DELTA) {
    var MIN_DELTA = 0.000001;
}

/**
  @class 2 Dimensional Vector
  @name vec2
*/
var vec2 = {};

/**
  Create a 2D vector. If no parameters are given, then the vector elements are
  initialized to zero, otherwise at most two parameters are used as the elements.

  @return {vec2} A new 2D vector.
*/
vec2.create = function() {
  var out = new Float32Array(2);
  if (arguments.length !== 0) {
    for (var i=0; i<arguments.length; i++) {
      // break if there are more than 2 arguments.
      if (i > 1) break;
      out[i] = arguments[i];
    }
  }
  return out;
};

/**
  Create a clone of another vec2.

  @param {vec2} a: the vector to clone.
  @return {vec2} a new vec2.
*/
vec2.clone = function(a) {
  // return null if there aren't enough elements in the vector.
  if (a.length < 2) return null;

  var out = new Float32Array(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
};

/**
  Copy over the elements one vec2 to another.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the vec2 to copy.
  @return {vec2} out.
*/
vec2.copy = function(out, a) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2) return out;

  out[0] = a[0];
  out[1] = a[1];
  return out;
};

/**
  Set the components of the vec2 to the given values.

  @param {vec2} out: the vec2 to edit.
  @param {Number} x: X component.
  @param {Number} y: Y component.
  @return {vec2} out.
*/
vec2.set = function(out, x, y) {
  // return if there aren't enough components.
  if (out.length < 2) return out;

  out[0] = x;
  out[1] = y;
  return out;
};

/**
  Add two vectors.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.add = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;

  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
};

/**
  Subtract two vectors.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.subt = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;

  out[0] = b[0] - a[0];
  out[1] = b[1] - a[1];
  return out;
};
/**
  Multiply two vec2's.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.mult = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;

  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
};

/**
  Divide two vec2's.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.div = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;
  // can't divide by zero yo!
  if (b[0] === 0 || b[1] === 0) return out;

  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
  Calculate the Euclidian distance between two vec2's

  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {Number} the distance.
*/
vec2.dist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 2 &&
      b.length < 2) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1];
  return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
};

/**
  Calculate the squared Euclidian distance between two vec2's

  @param {vec2} a the first vec2.
  @param {vec2} b the second vec2.
  @returns {Number} squared distance.
*/
vec2.sqrdDist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 2 &&
      b.length < 2) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1];
  return deltaX*deltaX + deltaY*deltaY;
};

/**
  Return a vec2 with the minimum values of two vec2's

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.min = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;

  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
};

/**
  Return a vec2 with the maximum values of two vec2's

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the first vec2.
  @param {vec2} b: the second vec2.
  @return {vec2} out.
*/
vec2.max = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2 &&
      a.length < 2 &&
      b.length < 2) return out;

  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
};

/**
  Scale the elements of the given vec2 by the given factor.

  @param {vec2} out: the receiving vec2.
  @param {vec2} a: the vec2 to scale.
  @param {Number} b: the scaling factor.
  @return {vec2} out.
*/
vec2.scale = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 2) return out;

  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};

/**
  @class a 3 Dimensional vector.
  @name vec3.
*/
var vec3 = {};

/**
  Create a 3D vector. If no parameters are given, then the vector elements are
  initialized to zero, otherwise at most two parameters are used as the elements.

  @return {vec3} A new vec3.
*/
vec3.create = function() {
  var out = new Float32Array(3);
  if (arguments.length !== 0) {
    for (var i=0; i<arguments.length; i++) {
      // break if there are more than 3 arguments.
      if (i > 1) break;
      out[i] = arguments[i];
    }
  }
  return out;
};

/**
  Create a clone of another vec3.

  @param {vec3} a: the vector to clone.
  @return {vec3} a new vec3.
*/
vec3.clone = function(a) {
  // return null if there aren't enough elements in the vector.
  if (a.length < 3) return null;

  var out = new Float32Array(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
};

/**
  Copy over the elements one vec3 to another.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the vec3 to copy.
  @return {vec3} out.
*/
vec3.copy = function(out, a) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3) return out;

  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
};

/**
  Set the components of the vec3 to the given values.

  @param {vec3} out: the vec3 to edit.
  @param {Number} x: X component.
  @param {Number} y: Y component.
  @param {Number} z: Z component.
  @return {vec3} out.
*/
vec3.set = function(out, x, y, z) {
  // return if there aren't enough components.
  if (out.length < 3) return out;

  out[0] = x;
  out[1] = y;
  out[2] = y;
  return out;
};

/**
  Add two vec3's.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.add = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;

  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
};

/**
  Subtract two vec3's.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.subt = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;

  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
};

/**
  Multiply two vec3's.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.mult = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;

  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
};

/**
  Divide two vec3's.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.div = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;
  // can't divide by zero yo!
  if (b[0] === 0 || b[1] === 0 || b[2] === 0) return out;

  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
};

/**
  Calculate the Euclidian distance between two vec3's

  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {Number} the distance.
*/
vec3.dist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 3 &&
      b.length < 3) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1],
      deltaZ = b[2] - a[2];
  return Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
};

/**
  Calculate the squared Euclidian distance between two vec3's

  @param {vec3} a the first vec3.
  @param {vec3} b the second vec3.
  @returns {Number} squared distance.
*/
vec3.sqrdDist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 3 &&
      b.length < 3) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1],
      deltaZ = b[2] - a[2];
  return deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ;
};

/**
  Return a vec3 with the minimum values of two vec3's

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.min = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;

  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
};

/**
  Return a vec3 with the maximum values of two vec3's

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the first vec3.
  @param {vec3} b: the second vec3.
  @return {vec3} out.
*/
vec3.max = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3 &&
      a.length < 3 &&
      b.length < 3) return out;

  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
};

/**
  Scale the elements of the given vec3 by the given factor.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the vec3 to scale.
  @param {Number} b: the scaling factor.
  @return {vec3} out.
*/
vec3.scale = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 3) return out;

  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
};

/**
  Negate the components of a vec3.

  @param {vec3} out: the receiving vec3.
  @param {vec3} a: the vec3 to negate.
  @return {vec3} out.
*/
vec3.negate = function(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];

  return out;
};

/**
  @class A 4 Dimensional vector.
  @name vec4
*/
var vec4 = {};

/**
  Create a 4D vector. If no parameters are given, then the vector elements are
  initialized to zero, otherwise at most four parameters are used as the elements.

  @return {vec4} A new vec4.
*/
vec4.create = function() {
  var out = new Float32Array(4);
  if (arguments.length !== 0) {
    for (var i=0; i<arguments.length; i++) {
      // break if there are more than 3 arguments.
      if (i > 1) break;
      out[i] = arguments[i];
    }
  }
  return out;
};

 /**
  Create a clone of another vec4.

  @param {vec4} a: the vector to clone.
  @return {vec4} a new vec4.
*/
vec4.clone = function(a) {
  // return null if there aren't enough elements in the vector.
  if (a.length < 4) return null;

  var out = new Float32Array(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
};

/**
  Copy over the elements one vec4 to another.

  @param {vec4} out: the receiving vec4
  @param {vec4} a: the vec3 to copy.
  @return {vec4} out.
*/
vec4.copy = function(out, a) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4) return out;

  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
};

/**
  Set the components of the vec4 to the given values.

  @param {vec4} out: the vec4 to edit.
  @param {Number} x: X component.
  @param {Number} y: Y component.
  @param {Number} z: Z component.
  @param {Number} w: W component.
  @return {vec4} out.
*/
vec4.set = function(out, x, y, z, w) {
  // return if there aren't enough components.
  if (out.length < 4) return out;

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
};

/**
  Add two vec4's.

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.add = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;

  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
};

/**
  Subtract two vec4's.

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.subt = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;

  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
};

/**
  Multiply two vec4's.

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.mult = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;

  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
};

/**
  Divide two vec4's.

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.div = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;
  // can't divide by zero yo!
  if (b[0] === 0 || b[1] === 0 ||
    b[2] === 0 || b[3] === 0) return out;

  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
};

/**
  Calculate the Euclidian distance between two vec4's

  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {Number} the distance.
*/
vec4.dist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 4 &&
      b.length < 4) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1],
      deltaZ = b[2] - a[2],
      deltaW = b[3] - a[3];
  return Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ)+ deltaW*deltaW;
};

/**
  Calculate the squared Euclidian distance between two vec4's

  @param {vec4} a the first vec4.
  @param {vec4} b the second vec4.
  @returns {Number} squared distance.
*/
vec4.sqrdDist = function(a, b) {
  // return 0 if there aren't enough components.
  if (a.length < 4 &&
      b.length < 4) return 0;

  var deltaX = b[0] - a[0],
      deltaY = b[1] - a[1],
      deltaZ = b[2] - a[2],
      deltaW = b[3] - a[3];
  return deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ + deltaW*deltaW;
};

/**
  Return a vec4 with the minimum values of two vec4's

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.min = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;

  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
};

/**
  Return a vec4 with the maximum values of two vec4's

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the first vec4.
  @param {vec4} b: the second vec4.
  @return {vec4} out.
*/
vec4.max = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4 &&
      a.length < 4 &&
      b.length < 4) return out;

  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
};

/**
  Scale the elements of the given vec4 by the given factor.

  @param {vec4} out: the receiving vec4.
  @param {vec4} a: the vec4 to scale.
  @param {Number} b: the scaling factor.
  @return {vec4} out.
*/
vec4.scale = function(out, a, b) {
  // return if there aren't enough components.
  if (out.length < 4) return out;

  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
};

vec4.toStr = function(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
  Creates a 3x3 identity matrix.

  @return {mat3} a new mat3.
*/
mat3.create = function() {
  var out = new Float32Array(9);

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;

  return out;
};

/**
  Calculate a normal matrix from a given mat4.

  @param {mat3} out: the receiving mat3.
  @param {mat4} a: the mat4 to calculate the normal from.
  @return {mat3} out.
*/
mat3.normalFromMat4 = function(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
      a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
      a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
      a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      // Calculate the determinant
      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
      return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
};

/**
  @class a 4x4 Matrix
  @name mat4
*/
var mat4 = {};

/**
  Create a new 4x4 identity matrix.
*/
mat4.create = function() {
  var out = new Float32Array(16);

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
};

// TODO comment.
mat4.translate = function(out, a, v) {
  var x = v[0], y = v[1], z = v[2],
      a00, a01, a02, a03,
      a10, a11, a12, a13,
      a20, a21, a22, a23;

  if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  }
  else {
      a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
      a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
      a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

      out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
      out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
      out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
};

// TODO comment.
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < MIN_DELTA) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

// TODO Quaternions: For later releases
var quat = {};
