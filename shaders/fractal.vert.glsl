varying vec2 windowCoord;

void main()
{
	windowCoord = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
