/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	// distDir: 'build',
	trailingSlash: false,
	// pageExtensions: ['index.jsx',"_app.jsx","index.js","/"],
	images: {
		unoptimized: true,
		},	
		async rewrites() {
			return [
       	
{
	source: "/users/create_agora_token",
	destination: "https://api.vegansmeetdaily.com/api/v1/users/create_agora_token",
},		
			];
		   },
		
		
};


module.exports = nextConfig;
