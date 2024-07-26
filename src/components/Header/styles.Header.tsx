import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 80px;
  margin: 60px 0px 0px 0px; 
  justify-content: space-between;
  z-index: 1000;
`;

export const HeaderLogo = styled.div`
    height: 80px;
    width: 80px;
`;

export const HeaderSettingsIcon = styled.div`
    height: 30px;
    width: 30px;
    margin-top: 30px;
`;