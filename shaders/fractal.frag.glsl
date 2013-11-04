#define MAX_ITER 100

varying vec2 windowCoord;

vec3 hsv2rgb(vec3 c)
{
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
	vec2 c = windowCoord;
	//vec2 c = vec2(0.0,1.0);
	vec2 z = vec2(0.0);
	int iterCount;

	for(int i=0; i<=MAX_ITER; i++)
	{
		z = vec2( z.x*z.x-z.y*z.y, 2.0*z.x*z.y ) + c;
		if( length(z) > 2.0){
			break;
		}
		iterCount = i;
	}

	z = vec2( z.x*z.x-z.y*z.y, 2.0*z.x*z.y ) + c;
	z = vec2( z.x*z.x-z.y*z.y, 2.0*z.x*z.y ) + c;
	iterCount += 2;
	float modulus = length(z);
	float mu = (float(iterCount) - (log2(log2(modulus))))/float(MAX_ITER);
	gl_FragColor = vec4(vec3(mu),1.0);

	/*float factor = float(iterCount)/float(MAX_ITER);
	if( factor == 1.0 ) factor = 0.0;
	gl_FragColor = mix( vec4(0.0,0.0,0.0,1.0), vec4(0.0,1.0,0.0,1.0), factor );*/
	/*float hue = fract(float(iterCount)/5.0);
	float value = floor(float(iterCount)/5.0) / (float(MAX_ITER)/5.0);
	gl_FragColor = vec4( hsv2rgb( vec3(hue,0.8,value) ), 1.0);*/

}
