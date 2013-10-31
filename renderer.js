// global handles
var width = 1280, height = 720;

var renderer;
var scene;
var msgbox;

function init()
{
	// pull out the relevant elements
	msgbox = $('p#message')[0];

	// set up the renderer
	renderer = new THREE.WebGLRenderer({
		canvas: $('canvas#renderPlane')[0],
	});
	renderer.setSize(width,height);

	// set up the scene
	scene = new THREE.Scene();

	// set up the camera
	var camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
	scene.add(camera);
	
	var vertShader, fragShader;
	function generateFractal(type, data)
	{
		// wait until both are loaded to continue
		if( type === 'vert' && !vertShader )
			vertShader = data;
		if( type === 'frag' && !fragShader )
			fragShader = data;
		if( !vertShader || !fragShader ) return;

		// create the fractal plane and add to scene
		var fractalMaterial = new THREE.ShaderMaterial({
			vertexShader: vertShader,
			fragmentShader: fragShader
		});
		var plane = new THREE.Mesh( new THREE.PlaneGeometry(width,height), fractalMaterial );
		scene.add(plane);

		// start the render
		renderer.render(scene,camera);
	}

	$.get('shaders/fractal.vert.glsl', function(data){generateFractal('vert',data);});
	$.get('shaders/fractal.frag.glsl', function(data){generateFractal('frag',data);});
		
	// announce completion
	msgbox.innerHTML = 'No errors';
	console.log('Initialized');
}


$(document).ready(init);
