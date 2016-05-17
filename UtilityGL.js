/*
TODO Complete File
This file will provide useful functions which will help abstract
the process of creating WebGL graphics.
TODO Add author stuff
*/

"use strict";

/**
Initializes the canvas and WebGL contexts with the given options.
  @param canvasName | The name of the canvas HTML element.
  @param options | The options for the WebGL context.
  @param gl | The WebGL context.
*/
function init(canvasName, options) {
  var canvas = document.getElementById(canvasName);
  var gl = initWebGL(canvas, options);
  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black clear
	  gl.enable(gl.DEPTH_TEST); // Enable depth
	  gl.depthFunc(gl.LEQUAL); // Near things block out far things
  }
  resizeCanvas(gl);
  return gl;
}

/**
Attempts to grab the WebGL context from the given canvas,
using the given options if any.
  @param canvas | The canvas element.
  @param options | The options for initializing a WebGL context.
  @return gl | The WebGL context.
*/
function initWebGL(canvas, options) {
  var gl;
  // Try to grab the standard context.
  try {
	  gl = canvas.getContext("webgl", options);
  }
  catch(e) {
	  alert("Unable to initialize WebGL. Your browser may not support it.");
  }
  return gl;
}

/**
Resize the canvas according to the height/width
of its client. To fill the window is the intension.
  @param gl | The WebGL context.
*/
function resizeCanvas(gl) {
  var canvas = gl.canvas;
  var displayHeight = canvas.clientHeight;
  var displayWidth = canvas.clientWidth;

  if (displayWidth != canvas.height || displayHeight != canvas.width) {
    canvas.height = displayHeight;
    canvas.width = displayWidth;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
}


/**
Compiles the passed in shader source code, creates a program with the
compiled code and returns the program.
  @param gl | The WebGL context.
  @param vShaderSource | The vextex shader source code.
  @param fShaderSource | The fragment shader source code.
  @return program | The shader program with the compiled code.
*/
function createProgram(gl, vShaderSource, fShaderSource) {

  // Checks the compile status of the given shader.
  // Returns true on success, false otherwise.
  function checkCompile(shader, shaderType) {
  	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Failed to compile " + shaderType + "shader: " +
        gl.getShaderInfoLog(shader));
  		gl.deleteShader(shader);
  		return false;
  	}
  	return true;
  }

  // Checks if the linking of the program to the GL context succeeded.
  function checkLink(program) {
    if (!gl.getShaderParameter(program, gl.LINK_STATUS)) {
      console.log("Failed to link program: " + gl.getProgramInfoLog(shader));
  		gl.deleteProgram(program);
  		return false;
  	}
  	return true;
  }

  var vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader, vShaderSource);
  gl.compileShader(vshader);

  // Return null if shader failed to compile.
  if (!checkCompile(vshader, "VERTEX")) return null;

  var fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, fShaderSource);
  gl.compileShader(fshader);

  // Return null if shader failed to compile.
  if (!checkCompile(fshader, "FRAGMENT")) return null;

  var program = gl.createProgram();
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);

  // Make sure the link was successful.
  if (!checkLink(program)) return null;

  return program;
}

/**
Creates an uniform setter which contains a setting function for each uniform
available in the vextex/fragment shader programs.
  @param gl | The WebGL context.
  @param program | The shader program.
  @return uniformSetter | The uniform setter.
*/
function createUniformSetter(gl, program) {
  // All possible uniforms
	var uniformMethods = ["uniform1f","uniform2fv","uniform3fv","uniform4fv"];
	var miscUniforms = ["eye"];
	var miscUniformComponents = [3];
	var lightUniforms = ["lightPos","spotDirection","lightColor","Ia","spotAngle"];
	var lightUniformComponents = [4,4,3,3,1];
	var materialUniforms = ["kd","ks","ambient","emission","shininess"];
	var materialUniformComponents = [3,3,3,3,1];
	var uniformMatrices = ["modelMatrix","viewMatrix","projectionMatrix",
                        "modelViewMatrix","viewProjectionMatrix",
                        "modelViewProjectionMatrix", "mirrorMatrix",
                        "normalMatrix"]; // 4x4 matrices
	var uniformMaps = ["diffuseMap","specularMap","normalMap"];
	var mirrorUniforms = ["Vmirror", "Fmirror"];
	var mirrorUniformComponents = [1,1];

  // Check the uniform to see which method to use for it.
  function checkActiveUniforms(activeUniform, program)
  {
    var uName = activeUniform.name;
    var loc = gl.getUniformLocation(program, uName);
    var miscIdx = mirrorUniforms.indexOf(uName),
        lightIdx = lightUniforms.indexOf(uName),
        matIdx = materialUniforms.indexOf(uName),
        mirrIdx = mirrorUniforms.indexOf(uName),
        uniformMethod;
    if (miscIdx != -1 || lightIdx != -1 || matIdx != -1 || mirrIdx != -1) {
      if (miscIdx >= 0) {
        uniformMethod = uniformMethods[miscUniformComponents[miscIdx]-1];
      }
      else if (lightIdx >= 0) {
        uniformMethod = uniformMethods[lightUniformComponents[lightIdx]-1];
      }
      else if (matIdx >= 0) {
        uniformMethod = uniformMethods[materialUniformComponents[matIdx]-1];
      }
      else if (mirrIdx >= 0) {
        uniformMethod = uniformMethods[mirrorUniformComponents[mirrIdx]-1];
      }
      uniformSetter[uName] = function(v) {
        if (!v) console.log("null value");
        else gl[uniformMethod](loc,v);
      };
    }
    else if (uniformMatrices.indexOf(uName) >= 0) {
      uniformMethod = (uName=="normalMatrix") ? "uniformMatrix3fv" :
                                                "uniformMatrix4fv";
      uniformSetter[uName] = function(v) {
        if (!v) console.log("null value");
        else gl[uniformMethod](loc,false,v);
      };
    }
    else if (uniformMaps.indexOf(uName) >= 0) {
      uniformSetter[uName] = (function(unit) {
        return function(v) {
          if (!v) console.log("null value");
          else
          {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, v);
            gl.uniform1i(loc, unit);
          }
        };
      })(textureUnitNumber++);
    }
    else {
      console.log("ERROR: Uniform " + uName +
                      " is present but not supported");
    }
  }

  var uniformSetter = {};
  var textureUnitNumber;

  // Iterate through the active uniforms.
  var nUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (; nUniforms > 0; nUniforms--) {
    checkActiveUniforms(gl.getActiveUniform(program, nUniforms-1));
  }

  return uniformSetter;
}

/**
Creates an attribute setter which contains a setting function for each attribute
available in the vextex shader program.
  @param gl | The WebGL context.
  @param program | The shader program.
  @return attributeSetter | The attribute setter.
*/
function createAttribSetter(gl, program) {
  // All possible Attributes
	var attributes = ["position","normal","tangent","bitangent","texCoord"];
	var attributeComponents = [3,3,3,3,2];

  // Check the attribute to see which method to use for it.
  function checkActiveAttributes(activeAttribute) {
    var aName = activeAttribute.name;
    var loc = gl.getAttribLocation(program, aName);
    var attribIdx = attributes.indexOf(aName);
    var attribComponents;
    if (attribIdx != 1) {
      attribComponents = attributeComponents[attribIdx];
      attributeSetter[aName] = function(v) {
        if (!v) gl.disableVertexAttribArray(loc);
				else {
				  gl.enableVertexAttribArray(loc);
          gl.bindBuffer(gl.ARRAY_BUFFER, v);
					gl.vertexAttribPointer(loc, attribComponents, gl.FLOAT, false, 0, 0);
        }
      };
    }
    else {
      console.log("ERROR: Attribute " + aName +
                      " is present but not supported");
    }
  }

  var attributeSetter = {};

  // Iterate through the active attributes.
  var nAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (; nAttributes > 0; nAttributes--) {
    checkActiveAttributes(gl.getActiveAttrib(program, nAttributes-1));
  }

  return attributeSetter;
}

/**
Compiles shaders, links program, creates attribute/uniform setters.
  @param gl | The WebGL context.
  @param vShaderName | The name of the Vertex shader code HTML element.
  @param fShaderName | The name of the Fragment shader code HTML element.
  @return {program, attributeSetter, uniformSetter} | The compile program,
    the attribute/uniform setters.
*/
function setUpRenderer(gl, vShaderName, fShaderName) {
  var vShaderSource = document.getElementById(vShaderName).text;
  var fShaderSource = document.getElementsByName(fShaderName).text;
  var program = createProgram(gl, vShaderSource, fShaderSource);

  if (!program) return null;

  var uniformSetter = createUniformSetter(gl, program);
  var attributeSetter = createAttribSetter(gl, program);

  return {
    program: program,
    uniformSetter: uniformSetter,
    attributeSetter: attributeSetter
  };
}

/**
Initialize an array buffer with the given data.
  @param gl | The WebGL context.
  @param attribArray | The array of values to store in the buffer.
  @return buffer | The initiated buffer.
*/
function initBuffer(gl, attribArray) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribArray), gl.STATIC_DRAW);
  return buffer;
}

/**
Initialize an element array buffer with the given data.
  @param gl | The WebGL context.
  @param indexArray | The array of indicies to store in the buffer.
  @return buffer | The initiated buffer.
*/
function initElementsBuffer(gl, indexArray) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray),
    gl.STATIC_DRAW);
  return buffer;
}

/**
Initializes/creates buffers for each component of the given object.
  @param gl | the WebGL context.
  @param meshData | A collection of data arrays pertaining to different
    elements of an object (position, texture coordinates, indicies, etc.).
  @return buffers | The initiated buffers.
*/
function createBuffers(gl,meshData) {
	var buffers={};
	Object.keys(meshData).forEach(function(name) {
		if (!validData(meshData[name])){
			buffers[name] = (name == "index")?
				initElementsBuffer(gl, meshData[name]):
				initBuffer(gl, meshData[name]);
		}
		else {
      console.log("Invalid "+ name+". Ex: There may be 'NaN' in data");
    }
  });
	return buffers;
}

/**
Calls the drawElements/Array method which does the actual drawing on the canvas.
  @param gl | The WebGL context.
  @param drawMode | The draw mode to use (usually GL_TRIANGLES).
  @param aSetter | The attribute setter.
  @param numVertices | The number of verticies to draw.
  @param buffers | The buffers containing to the data to draw.
*/
function bufferDraw(gl, drawMode, aSetter, numVertices, buffers) {
  Object.keys(aSetter).forEach(function(attribName) {
		aSetter[attribName](buffers[attribName]);
  });
	if (buffers["index"]) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers["index"]);
		gl.drawElements(gl[drawMode], nVertices, gl.UNSIGNED_SHORT, 0);
	}
	else {
		gl.drawArrays(gl[drawMode], 0, nVertices);
	}
}

/**
Deletes the given buffers.
  @param gl | The WebGL context.
  @param buffers | The buffers to delete.
*/
function deleteBuffers(gl,buffers) {
	Object.keys(buffers).forEach(function(attribName) {
			gl.deleteBuffer(buffers[attribName]);
	});
}

/**
Initializes a texture with a given image.
  @param gl | The WebGL context.
  @param textureFileName | The name of the image to use for the texture.
  @return tex | The Initialized texture.
*/
function createTextureFrom2DImage(gl,textureFileName) {
  // Upon the image being retrieved, bind the image data to the texture.
	function completeTexture(imgData) {
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	function isPowerOfTwo(x) {
		return (x & (x - 1)) === 0;
	}
	function nextHighestPowerOfTwo(x) {
		--x;
		for (var i = 1; i < 32; i <<= 1) {
			x = x | x >> i;
		}
		return x + 1;
	}

	if (textureFileName) {
		var tex = gl.createTexture();
		tex.width = 0; tex.height = 0;
		var img = new Image();
		img.onload = function() {
      // WebGL doesn't support using images whos dimensions aren't powers of two.
      // Scale up the texture to the next highest power of two dimensions, if
      // necessary.
			if (!isPowerOfTwo(img.width) || !isPowerOfTwo(img.height)) {
				var canvas = document.createElement("canvas");
				canvas.width = nextHighestPowerOfTwo(img.width);
				canvas.height = nextHighestPowerOfTwo(img.height);
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				img = canvas;
			}
			completeTexture(img);
			tex.complete = true;
		};
		img.onerror = function() {
			console.log("ERROR: "+textureFileName+" does not exist or can not load.");
		};
		img.src = textureFileName;
		return tex;
	}
	else {
		console.log("ERROR: Texture File does not exist.");
		return null;
	}
}

/**
Create a simple texture using the given data.
  @param gl | The WebGL context.
  @param data | The texture data.
  @return tex | The created texture.
*/
function createTextureFromData(gl, data) {
  var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.generateMipmap(gl.TEXTURE_2D);
  tex.complete = true;
  return tex;
}

/**
Creates a generic model matrix describing a translation and a rotation.
  @param angle | The angle to rotate by.
  @param position | The translation vector.
  @param axis | The axis to apply the rotation to.
  @return mat | The matrix describing the transformation.
*/
function getGeneralRotationMatrix(angle, position, axis) {
  var mat = mat4.create();
	mat4.translate(mat,mat,vec3.negate(vec3.create(),position));
	mat4.rotate(mat,mat,angle,axis);
	mat4.translate(mat,mat,position);
	return mat;
}
