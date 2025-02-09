const keys = async () => {
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
	// we are in production - return the prod set of keys
	return import ('./prod.js');
} else {
	// we are in development - return the dev keys!!!
	return import ('./dev.js');
}
}

export default await keys();
