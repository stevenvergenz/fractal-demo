varying vec2 windowCoord;
uniform vec3 viewMat[3];

void main()
{
	vec3 temp = mat3(viewMat[0],viewMat[1],viewMat[2]) * vec3(position.xy, 1.0);
	windowCoord = temp.xy;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
