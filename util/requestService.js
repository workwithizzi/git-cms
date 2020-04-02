import request from "./request";
import constants from "./constants";

function getLimberSettings({ auth }) {
	return request({
		url:    `/repos/${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO}/contents/${constants.GITHUB_LIMBER_SETTINGS_PATH}`,
		method: "GET",
		data: {
			auth,
		},
	});
}

function getLimberPagesSettings({ auth }) {
	return request({
		url:    `/repos/${constants.GITHUB_REPO_OWNER}/${constants.GITHUB_REPO}/contents/${constants.GITHUB_LIMBER_PAGES_SETTINGS_PATH}`,
		method: "GET",
		data: {
			auth,
		},
	});
}

const RequestService = {
	getLimberSettings,
	getLimberPagesSettings,
};

export default RequestService;
