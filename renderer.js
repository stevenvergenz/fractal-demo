// global handles
var width = 1280, height = 720;

var renderer;
var scene;
var msgbox;

function init()
{
	// pull out the relevant elements
	var renderContainer = $('div#container')[0];
	msgbox = $('p#message')[0];

	// set up the renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	renderContainer.appendChild( renderer.domElement );

	// set up the scene
	scene = new THREE.Scene();

	// set up the camera
	var camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
	scene.add(camera);

	var vertShader = $.get('shaders/fractal.vert.glsl').responseText;
	var fragShader = $.get('shaders/fractal.frag.glsl').responseText;
	debugger;

	var fractalMaterial = new THREE.ShaderMaterial({
		vertexShader: vertShader,
		fragmentShader: fragShader
	});
	var plane = new THREE.Mesh( new THREE.PlaneGeometry(width,height), fractalMaterial );
	scene.add(plane);

	// announce completion
	msgbox.innerHTML = 'No errors';
	console.log('Initialized');
}

$(document).ready(init);
