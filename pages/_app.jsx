/**
 * _app.jsx
 *
 * The Custom App component to initialize pages.
 * We are overwriting it to controll the page initialization.
 *
 * What we will do here:
 * 1. Easy state management when navigating pages. We will use 1 instance of the globally used one.
 * 2. Persisting layout between page changes. E.g., most likely we will define a Layout with a Header and Menu Items (Drawer) here.
 * 3. Inject additional data to the pages. For example, pass additional props to the <Component />
 * 4. We can define the Global CSS styles and those styles will be applied to all pages and components within the App.
 *
 */

import App from "next/app";
import Head from "next/head";
import React from "react";

import RequestService from "../util/requestService";

class GitCMS extends App {
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

export default GitCMS;
