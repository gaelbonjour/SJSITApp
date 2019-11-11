import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Button as AntButton, DatePicker, Select } from "antd";
import { MdNoteAdd } from "react-icons/md";
import {
	Button,
	CollapseFlex,
	FilterButton,
	FlexEnd,
	FlexStart,
} from "components/Body";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const format = "MM-DD-YYYY";

const FormFilters = ({ clearFilters, queries, push, updateQuery }) => {
	const startMonth = queries.startMonth
		? moment(queries.startMonth, format)
		: null;
	const endMonth = queries.endMonth ? moment(queries.endMonth, format) : null;

	const expirationDate = queries.expirationDate
		? moment(queries.expirationDate, format)
		: null;

	return (
		<CollapseFlex>
			<FlexStart>
				<div css="margin-right: 5px;font-size: 15px; width: 65px;">
					Filter by:
				</div>
				<FilterButton
					content={
						<RangePicker
							className="filter-range-picker"
							value={[startMonth, endMonth]}
							placeholder={["Start Month", "End Month"]}
							format={format}
							onChange={value =>
								updateQuery({
									page: 1,
									startMonth: !isEmpty(value) ? value[0].format(format) : null,
									endMonth: !isEmpty(value) ? value[1].format(format) : null,
								})
							}
						/>
					}
					title="Month Dates"
					value={!!startMonth}
				/>
				<FilterButton
					content={
						<DatePicker
							allowClear
							format={format}
							className="filter-date-picker"
							value={expirationDate}
							placeholder="Select an expiration date..."
							onChange={value =>
								updateQuery({
									page: 1,
									expirationDate: value ? value.format(format) : null,
								})
							}
						/>
					}
					title="Expiration Date"
					value={expirationDate}
				/>
				<FilterButton
					content={
						<Select
							allowClear
							value={queries.sentEmails}
							placeholder="Select an email status..."
							style={{ width: 195 }}
							onChange={value => updateQuery({ page: 1, sentEmails: value })}
						>
							<Option value="sent">Sent</Option>
							<Option value="unsent">Unsent</Option>
						</Select>
					}
					title="Email Status"
					value={queries.sentEmails}
				/>
				<AntButton style={{ height: 41 }} onClick={clearFilters}>
					Clear All
				</AntButton>
			</FlexStart>
			<FlexEnd>
				<Button
					primary
					width="200px"
					marginRight="0px"
					padding="5px 10px"
					onClick={() => push("/employee/forms/create")}
				>
					<MdNoteAdd style={{ position: "relative", top: 3, fontSize: 20 }} />
					&nbsp; Create AP Form
				</Button>
			</FlexEnd>
		</CollapseFlex>
	);
};

FormFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		sentEmails: PropTypes.string,
		startMonth: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
};

export default FormFilters;