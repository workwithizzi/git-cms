/**
 * Parse Frontmatter from the `md` file to an Object
 *
 * @param {String} frontmatter
 * @returns {Object}
 */
function parseFrontmatter(frontmatter) {
	const data = frontmatter
	// remove `---` separation
		.split("---")[1]
	// delete the 1st character which is a `new line`
		.slice(1)
	// replace others `new line` characters by `,`
		.replace(/(\r\n|\n|\r)/gm, ",")
	// delete trailing comma
		.slice(0, -1)
	// delete all the `"` to avoid duplication of them when converting to the object
		.replace(/"/gm, "");

	// CONVERT `frontmatter` into `Object`
	const obj = {};
	data.split(",").forEach(property => {
		const splittedProperties = property.split(":");
		// if there's a dash symbol, replace it with underscore symbol, because, the object `key` cannot have a name like this: `key-name`
		const underscoredKey = splittedProperties[0].replace(/-/gm, "_");
		// remove the ` ` at the beginning of the string
		const unspacedValue = splittedProperties[1].slice(1);
		obj[underscoredKey] = unspacedValue;
	});
	return obj;
}

export default parseFrontmatter;
