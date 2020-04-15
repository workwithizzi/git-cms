import request from "./request";
import constants from "./constants";

function getLimberSettings() {
	return request({
		url:    `/repos/${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO}/contents/${constants.GITHUB_LIMBER_SETTINGS_PATH}`,
		method: "GET",
		auth: {
			username: process.env.GITHUB_PRIVATE_TOKEN,
		},
	});
}

function getLimberContentTypes(path) {
	return request({
		url:    `/repos/${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO}/contents/${path}`,
		method: "GET",
		auth: {
			username: process.env.GITHUB_PRIVATE_TOKEN,
		},
	});
}

function updateLimberArticleContent(path, body) {
	return request({
		url:    `/repos/${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO}/contents/${path}`,
		method: "PUT",
		data: {
			...body,
		},
		auth: {
			username: process.env.GITHUB_PRIVATE_TOKEN,
		},
	});
}

const RequestService = {
	getLimberSettings,
	getLimberContentTypes,
	updateLimberArticleContent,
};

export default RequestService;
