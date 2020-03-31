import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function Drawer() {
	return (
		<div className="l-drawer">
			<button className="l-drawer__btn">
				<FontAwesomeIcon className="o-drawer__btn--icon" icon={faCog} size="2x" />
				<span className="o-drawer__btn--text">Settings</span>
			</button>
		</div>
	);
}

export default Drawer;
