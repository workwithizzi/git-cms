import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCog, faRandom } from "@fortawesome/free-solid-svg-icons";
import PT from "prop-types";

function Drawer({ activePath, uniqueContentTypes }) {

	function _renderLimberContentGroupItems(groups) {
		return (
			groups.map(item => {
				const icon = faRandom;
				return (
					<li className="l-drawer__item" key={item}>
						<a className={`l-drawer__btn btn--content-group ${activePath === `/groups?group=${item}` ? "isActive" : "notActive"}`} href={`/groups?group=${item}`}>
							<FontAwesomeIcon className="btn--icon content-group--icon" icon={icon} />
							<span className="btn--text content-group--text">{item}</span>
						</a>
					</li>
				);
			})
		);
	}

	return (
		<ul className="l-drawer">
			<li className="l-drawer__item">
				<a className={`l-drawer__btn btn--dashboard ${activePath === "/" ? "isActive" : "notActive"}`} href="/">
					<FontAwesomeIcon className="btn--icon dashboard--icon" icon={faTachometerAlt} />
					<span className="btn--text dashboard--text">Dashboard</span>
				</a>
			</li>
			<li className="l-drawer__item">
				<a className={`l-drawer__btn btn--settings ${activePath === "/settings" ? "isActive" : "notActive"}`} href="/settings">
					<FontAwesomeIcon className="btn--icon settings--icon" icon={faCog} />
					<span className="btn--text settings--text">Settings</span>
				</a>
			</li>
			{/* RENDER Menu Items, based on the pages in the `/limber` folder */}
			{
				_renderLimberContentGroupItems(uniqueContentTypes)
			}
		</ul>
	);
}

Drawer.propTypes = {
	activePath: PT.string.isRequired,
	uniqueContentTypes: PT.array.isRequired,
};

export default Drawer;
