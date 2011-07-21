function supportsSelector(selector) {

	// Create a temporary element
	var el = document.createElement('div');
	
	// Add content to the temp element (so it can have styles applied)
	// The &shy; HTML entity is displayed as a soft hyphen.
	// Then add in a <style> with a single CSS rule
	el.innerHTML = ['&shy;', '<style>', selector, '{}', '</style>'].join('');
	
	// Insert the the temporary element (and the stylesheet within it) into the <body>
	el = document.body.appendChild(el);
	
	// Grab reference to the newly added stylesheet
	var style = el.getElementsByTagName('style')[0],
		 // Convert stylesheet into Boolean value
		 ret = !! (style.sheet.rules || style.sheet.cssRules)[0]; // sheet.rules (Microsoft), sheet.cssRules (W3C)
	
	// Now we have the results of the feature test we remove the temporary element
	document.body.removeChild(el);
	
	// And return the value
	return ret;

}

console.log('border-radius', supportsSelector('border-radius'));
console.log('border-radius', supportsSelector(':-moz-any(h1)'));
console.log(':nth-child', supportsSelector(':nth-child(odd)'));
console.log(':unsupported', supportsSelector(':unsupported'));
console.log('::before', supportsSelector('::before'));