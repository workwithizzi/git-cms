require("dotenv").config();

const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withCSS(
	withSass({
		// ENV variables
		env: {
			GITHUB_PRIVATE_TOKEN: process.env.GITHUB_PRIVATE_TOKEN,
		},
		webpack(config, options) {
			config.module.rules.push({
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 100000,
					},
				},
			});
			return config;
		},
	})
);
