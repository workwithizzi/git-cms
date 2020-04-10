import jsyaml from "js-yaml";

/**
 * Helper to parse Yaml on the browser-side, because `window` is accessible only on browser.
 *
 * @param {base64String} content
 * @returns {Object}
 */
function parseYamlOnClient(content) {
	if (!content) {
		console.warn("The content wasn't provided.");
		return {};
	}
	const fromBase64ToString = window.atob(content);
	return jsyaml.load(fromBase64ToString);
}

/**
 * Helper to parse Yaml on the server-side
 *
 * @param {base64String} content
 * @returns {Object}
 */
function parseYamlOnServer(content) {
	if (!content) {
		console.warn("The content wasn't provided.");
		return {};
	}
	const buff = Buffer.from(content, "base64");
	const fromBase64ToString = buff.toString("ascii");
	return jsyaml.load(fromBase64ToString);
}

/**
 * Helper to parse Yaml on the server-side when there's a response on the axios request
 *
 * @param {[Object, Array]} data - Response of the Axios request with base64
 * @returns {[Object, Array]}
 */
function parseYamlOnRequest(data) {
	if (!data) {
		console.warn("The data wasn't provided.");
		return {};
	}

	if (data.name) {
		if (data.name.split(".")[1] === "md") {
			return data;
		} else {
			// if the data is not an array - we will have a content on it
			if (!Array.isArray(data)) {
			// check if we have a "content" property on the data object
				if (Object.prototype.hasOwnProperty.call(data, "content")) {
				// get the "content" in base64
					const base64Content = data.content;
					// decode base64 to a readable String
					const stringToYamlObject = parseYamlOnServer(base64Content);
					// prepare new object to return
					let result = new Object();
					// duplicate the "data" object to ovoid the mutation of it
					result = Object.assign(result, data);
					// assign decoded "content" and corresponding "encoding" properties
					result.content = stringToYamlObject;
					result.encoding = "ascii";
					return result.content;
				}
				// if there's no "content" property
				return data;
			}
		}
	}

	
	return data;
}

export {
	parseYamlOnClient,
	parseYamlOnServer,
	parseYamlOnRequest,
};
