/* eslint-disable react/jsx-boolean-value */
import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";

const MemberEventCountChart = ({ members }) => (
	<div css="height: 650px;width: 100%;padding-left: 18px;padding-right: 35px;">
		<div css="height: 100%;width: 100%;background-color: #ebecf0;border-radius: 3px;">
			<ResponsiveBar
				data={members}
				margin={{ top: 60, right: 40, bottom: 200, left: 80 }}
				indexBy="name"
				keys={["Event Count"]}
				axisLeft={{
					legend: "Event Count",
					legendPosition: "middle",
					legendOffset: -50,
					tickValues: 2,
				}}
				axisBottom={{
					tickRotation: -90,
					legend: "Employee",
					legendPosition: "middle",
					legendOffset: 170,
				}}
				labelTextColor="#fefefe"
				colors={["#025f6d"]}
				colorBy="index"
				theme={{
					axis: {
						legend: {
							text: {
								fill: "#bbb",
								fontSize: 16,
							},
						},
						ticks: {
							text: {
								fill: "#888",
								fontSize: 16,
							},
						},
					},
					grid: {
						line: {
							stroke: "#d1d1d1",
							strokeWidth: 2,
							strokeDasharray: "4 4",
						},
					},
				}}
			/>
		</div>
	</div>
);

MemberEventCountChart.propTypes = {
	members: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			"Event Count": PropTypes.number,
		}),
	),
};

export default MemberEventCountChart;

/*
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

renderCustomXAxis = ({ x, y, payload }) => {
		const { members } = this.props;
		return (
			<g transform={`translate(${x},${y})`}>
				<text
					x={0}
					y={0}
					dx={120}
					dy={members[payload.index].value > 0 ? -17 : 5}
					textAnchor="middle"
					fill="#bbb"
					transform="rotate(-90)"
				>
					{payload.value}
				</text>
			</g>
		);
	};

	<ResponsiveContainer width="100%" height={400}>
				<BarChart
					dataKey="value"
					nameKey="name"
					data={this.props.members}
					maxBarSize={15}
					margin={{ top: 5, right: 40, left: -15, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="5 5" fill="#ebecf0" />
					<XAxis dataKey="name" tick={this.renderCustomXAxis} />
					<YAxis allowDecimals={false} />
					<Tooltip
						cursor={{
							stroke: "red",
							strokeWidth: 1,
							fill: "none",
						}}
					/>
					<Bar dataKey="value" fill="#025f6d" unit=" event(s)" />
				</BarChart>
			</ResponsiveContainer>
*/
/* eslint-enable react/jsx-boolean-value */
