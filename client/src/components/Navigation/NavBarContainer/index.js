import styled from "styled-components";

const NavBarContainer = styled.header`
	width: 100%;
	background-color: #025f6d;
	-webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	-moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	z-index: 1000;

	&::after {
		display: block;
		clear: both;
		content: "";
	}
`;

export default NavBarContainer;