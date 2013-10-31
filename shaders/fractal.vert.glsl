varying vec4 vertPos;

void main()
{
	vertPos = modelViewMatrix * vec4(position,1.0);
	gl_Position = modelViewMatrix * vec4(position,1.0);
}
