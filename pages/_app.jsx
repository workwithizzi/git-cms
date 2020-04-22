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

import React, { Fragment } from "react";
import App from "next/app";
import Head from "next/head";

import RequestService from "../util/requestService";
import { toUpperCaseFirstChar } from "../util/strings";

import Layout from "../components/Layout";
import Drawer from "../components/Drawer";

class GitCMS extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		// GET `limber.yml` file
		const limberSettings = await RequestService
			.getLimberSettings();

		// GET `limber/` files
		const contentTypes = await RequestService
			.getLimberContentTypes(limberSettings.config_path);

		// GET content of each file in the `limber/` repository
		const contentTypesData = await Promise.all(
			contentTypes.map(async file =>
				await RequestService.getLimberContentTypes(file.path)
			)
		);

		const getGrops = contentTypesData.map(item => item.group);

		const uniqueContentTypes = getGrops.filter((item, pos, self) => {
			return self.indexOf(item) == pos;
		});

		return {
			pageProps,
			path: ctx.asPath,
			limberSettings,
			contentTypesData,
			uniqueContentTypes,
		};
	}

	render() {
		const {
			Component,
			pageProps,
			path,
			limberSettings,
			contentTypesData,
			uniqueContentTypes,
		} = this.props;

		// DETECT current page name
		let currentPage = "";
		let pageName = "";
		if(path.includes("=")) {
			pageName = path.split("=")[1];
			currentPage = toUpperCaseFirstChar(pageName);
		} else {
			pageName = path.split("/")[1];
			if (pageName === "") {
				currentPage = "Admin";
			} else {
				currentPage = toUpperCaseFirstChar(pageName);
			}
		}

		return (
			<Fragment>
				<Head>
					<title>{`Git CMS | ${currentPage}`}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Layout>
					<Drawer
						activePath={path}
						uniqueContentTypes={uniqueContentTypes}
					/>
					<Component
						path={path}
						limberSettings={limberSettings}
						contentTypesData={contentTypesData}
						{...pageProps}
					/>
				</Layout>
			</Fragment>
		);
	}
}

export default GitCMS;
