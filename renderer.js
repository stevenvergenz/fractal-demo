// global handles
var width = 1280, height = 720;

var renderer;
var scene;
var plane;
var camera;
var msgbox;

var center = {x:-0.5,y:0};
var zoom = 0;
var viewMat = new THREE.Matrix3();
var viewUni = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];

function init()
{
	// pull out the relevant elements
	msgbox = $('p#message')[0];

	// set up the renderer
	renderer = new THREE.WebGLRenderer({
		canvas: $('canvas#renderPlane')[0],
		clearColor: 0xffffff,
	});
	renderer.setSize(width,height);
	$('#renderPlane').mouseup(handleClick);
	$('#renderPlane').on('contextmenu', function(){return false;});

	// set up the scene
	scene = new THREE.Scene();

	// set up the camera
	camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
	camera.position.z = 5;
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
			fragmentShader: fragShader,
			uniforms: {
				'viewMat': {type: 'v3v', value: viewUni}
			}
		});
		plane = new THREE.Mesh( new THREE.PlaneGeometry(width,height), fractalMaterial );
		scene.add(plane);
		
		draw();
	}

	$.get('shaders/fractal.vert.glsl', function(data){generateFractal('vert',data);});
	$.get('shaders/fractal.frag.glsl', function(data){generateFractal('frag',data);});
}

function draw()
{
	generateLookAt();
	renderer.render(scene,camera);
}

function generateLookAt()
{
	// create view matrix
	var scaleFactor = (2.5/height)/Math.pow(2,zoom);
	viewMat = new THREE.Matrix3(scaleFactor,0,center.x,0,scaleFactor,center.y,0,0,1);
	var elems = Array.prototype.slice.call(viewMat.elements);

	// convert to vec3[3] for uniforms
	viewUni[0].set(elems[0],elems[1],elems[2]);
	viewUni[1].set(elems[3],elems[4],elems[5]);
	viewUni[2].set(elems[6],elems[7],elems[8]);
}

function handleClick(evt)
{
	if( evt.stopPropagation ) evt.stopPropagation();
	
	// map canvas coords to view space
	var clickCoord = new THREE.Vector3(evt.offsetX-width/2, -evt.offsetY+height/2, 1);
	clickCoord.applyMatrix3(viewMat);

	// focus image there
	center = {x: clickCoord.x, y: clickCoord.y};

	// handle scale
	if( evt.button == 0 ){
		zoom = zoom < 16 ? zoom+1 : 16;
	}
	else if( evt.button == 2 ){
		zoom = zoom > 0 ? zoom-1 : 0;
	}
	console.log('Centered at',center.x,center.y,': Zoom',zoom);
	draw();
}


$(document).ready(init);
