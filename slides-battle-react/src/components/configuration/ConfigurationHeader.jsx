import styled from "styled-components";

export const ConfigurationHeader = styled.div`
  display: flex;
  flex: 1;
  padding-left: 15px;
  min-height: 48px;
  align-items: center;
  ${({ backgroundColor = "white" }) => `background-color: ${backgroundColor}`}
`;
