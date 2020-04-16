/**
 * Separate frontmatter from the `md` file and format it accordingly.
 *
 * @param {String} string - The whole `md` file.
 * @returns {String}
 */
function formatFrontmatter(string) {
	// GET frontmatter from the whole `md` content
	let frontmatter = string.split("---")[1].slice(1);
	// FORMAT frontmatter with `---`
	const _frontmatter = `---`;
	frontmatter = `${_frontmatter}\n${frontmatter}${_frontmatter}`;
	return frontmatter;
}

export default formatFrontmatter;
