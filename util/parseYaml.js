import jsyaml from "js-yaml";

function parseYaml(file) {
	const fileContent = file.content;
	const fromBase64ToString = window.atob(fileContent);
	return jsyaml.load(fromBase64ToString);
}

export default parseYaml;
