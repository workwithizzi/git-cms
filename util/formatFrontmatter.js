/**
 * Separate frontmatter from the `md` file and format it accordingly.
 *
 * @param {String} string - The whole `md` file.
 * @returns {String}
 */

const _FRONTMATTER = `---`;

function separateFrontmatter(string) {
	// GET frontmatter from the whole `md` content
	let frontmatter = string.split("---")[1].slice(1);
	// FORMAT frontmatter with `---`
	frontmatter = `${_FRONTMATTER}\n${frontmatter}${_FRONTMATTER}`;
	return frontmatter;
}

/**
 * Convert Object to a frontmatter String.
 *
 * @param {Object} obj
 * @returns {String}
 */
function convertFrontmatter(obj) {
// convert frontmatter object into String with the new date
	let frontmatter = "";
	const objToStr = JSON.stringify(obj).slice(1, -1);
	objToStr.split(",").forEach(property => {
		const row = `${property.split(":")[0].replace(/['"]+/g, "")}: ${property.split(":")[1]}\n`;
		frontmatter += row;
	});
	return `${_FRONTMATTER}\n${frontmatter}${_FRONTMATTER}`;
}

export {
	separateFrontmatter,
	convertFrontmatter,
};
