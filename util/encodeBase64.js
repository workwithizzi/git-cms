/**
 * Encode base64 to ASCII String
 * @param {base64} decodedString
 * @returns {String}
 */
function encodeBase64(decodedString) {
	if (process.browser && typeof window !== "undefined") {
		return window.atob(decodedString);
	} else {
		const buff = Buffer.from(decodedString, "base64");
		return buff.toString("ascii");
	}
}

export default encodeBase64;
