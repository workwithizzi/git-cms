import React from "react";
import "../styles/admin.scss";

import Drawer from "../components/drawer";

function AdminPage() {
	return (
		<>
			<h1 className="o-title">Welcome to the Admin page of the Git CMS</h1>

			<Drawer />
		</>
	);
}

export default AdminPage;
