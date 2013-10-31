#define MAX_ITER 100

varying vec4 vertPos;

void main()
{
	vec2 c = vertPos.xy;
	vec2 z = vec2(0.0);
	int iterCount;

	for(int i=0; i<MAX_ITER; i++)
	{
		z = vec2( z.x*z.x-z.y*z.y, 2.0*z.x*z.y ) + c;
		if( length(z) > 2.0){
			break;
		}
		iterCount = i;
	}

	float factor = float(iterCount)/float(MAX_ITER);
	gl_FragColor = mix( vec4(0.0,0.0,0.0,1.0), vec4(0.0,1.0,0.0,1.0), factor );
	//gl_FragColor = vec4( factor * vec3(0.0,1.0,0.0), 1.0 );
}
