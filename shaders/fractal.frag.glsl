#define MAX_ITER 100
#define BAIL_RAD 2.0

varying vec2 windowCoord;

void main()
{
	vec2 c = windowCoord;
	//vec2 c = vec2(0.0,1.0);
	vec2 z = vec2(0.0);
	int iterCount;

	for(int i=0; i<=MAX_ITER; i++)
	{
		z = vec2( z.x*z.x-z.y*z.y, 2.0*z.x*z.y ) + c;
		if( length(z) > BAIL_RAD ){
			break;
		}
		iterCount = i;
	}

	if( iterCount < MAX_ITER ){
		float mu = (float(iterCount) - log2(log(length(z))/log(BAIL_RAD)))/float(MAX_ITER);
		gl_FragColor = mix( vec4(0.0,0.0,0.5,1.0), vec4(1.0,1.0,0.0,1.0), mu );
	}
	else gl_FragColor = vec4(0.0,0.0,0.0,1.0);

	/*float factor = float(iterCount)/float(MAX_ITER);
	if( factor == 1.0 ) factor = 0.0;
	gl_FragColor = mix( vec4(0.0,0.0,0.0,1.0), vec4(0.0,1.0,0.0,1.0), factor );*/
}
