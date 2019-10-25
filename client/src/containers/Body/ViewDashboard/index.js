import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row } from "antd";
import Events from "./Events";
import Forms from "./Forms";
import Availability from "./Availability";
import EventCountSpread from "./EventCountSpread";

const ViewDashboard = () => (
	<Fragment>
		<Helmet title="Dashboard" />
		<Row gutter={[16, 16]}>
			<Events />
			<Forms />
			<Availability />
			<EventCountSpread />
		</Row>
	</Fragment>
);

export default ViewDashboard;