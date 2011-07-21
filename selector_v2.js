function supportsSelector(selectorList) {

	var stylesheet = document.createElement('style'),
		 styles = "",
		 selectors = [],        
		 selectorsupport = [],
		 checksupport;
	
	function splitSelectorList(str, p1) {
		selectors.push(p1);
	}
	
	// Normalise the selector list (so the spacing of the comma separators are not an issue)
	selectorList.replace(/([^,]+\s?)/g, splitSelectorList);
	
	console.log('List of selectors: ', selectors);
	
	// Loop through selectors Array and create a String of all selectors
	for (var i = 0, len = selectors.length; i < len; i++) {
		styles += selectors[i] + ' { }';
	}
	
	// Set the content of the temp stylesheet to the new concatenated String of selectors
	stylesheet.textContent = styles;
	
	// Insert the temp stylesheet into the DOM so we can start feature testing
	stylesheet = document.body.appendChild(stylesheet);
	
	// Loop through the selectors
	for (var i = 0, len = selectors.length; i < len; i++) {
		// Access the stylesheet
		checksupport = (stylesheet.sheet.rules || stylesheet.sheet.cssRules)[i]; // sheet.rules (Microsoft), sheet.cssRules (W3C)
		
		// If the selector is supported...
		if (!!checksupport) {
			// ...store it in the Array we'll return to the user
			selectorsupport.push(checksupport.selectorText);
		}
	}
	
	// Clean-up by removing the temporary stylesheet from the DOM
	document.body.removeChild(stylesheet);
	
	// Return an Array of supported selectors
	return selectorsupport;
    
}

// It doesn't matter how the spacing of the comma separators are put in, the regular expression we use resolves any issues
console.log('Supported selectors: ', supportsSelector('border-radius, ::before,:unsupported,:first-line,:-webkit-any(h1),:-moz-any(h1),:nth-child(odd)'));