import App from "next/app";
import Head from "next/head";
import React from "react";

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps, path: ctx.pathname };
	}

	render() {
		const { Component, pageProps, path } = this.props;

		const unSlashedPath = path.split("/")[1];
		const currentPage = unSlashedPath.charAt(0).toUpperCase() + unSlashedPath.slice(1);

		return (
			<>
				<Head>
					<title>{`Git CMS | ${currentPage}`}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default MyApp;
