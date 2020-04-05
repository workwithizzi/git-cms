import App from "next/app";
import Head from "next/head";
import React from "react";

import RequestService from "../util/requestService";

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		const limberSettings = await RequestService
			.getLimberSettings();

		return {
			pageProps,
			path: ctx.asPath,
			limberSettings,
		};
	}

	render() {
		const {
			Component,
			pageProps,
			path,
			limberSettings,
		} = this.props;

		let currentPage = "";
		if (path === "/admin") {
			currentPage = "Admin";
		} else if (path === "/") {
			currentPage = "Home";
		} else if (path === "/get-contents") {
			currentPage = "Contents";
		} else {
			const unSlashedPath = path.split("=")[1];
			currentPage = unSlashedPath.charAt(0).toUpperCase() + unSlashedPath.slice(1);
		}

		return (
			<>
				<Head>
					<title>{`Git CMS | ${currentPage}`}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component
					path={path}
					limberSettings={limberSettings}
					{...pageProps}
				/>
			</>
		);
	}
}

export default MyApp;
