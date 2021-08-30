import styled from 'styled-components';

export const PageBackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image:  url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  filter: grayscale(60%);
  z-index: -1;
`;