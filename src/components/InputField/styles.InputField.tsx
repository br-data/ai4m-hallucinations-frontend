import styled from 'styled-components';
import { motion } from "framer-motion"

export const StyledInputWrapper = styled(motion.div)`
`;

export const StyledInput = styled.div<{ fontSize: number }>`
  width: 800px;
  background-color: transparent;
  min-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize}px;
  line-height: 1.5;
  transition: font-size 0.2s ease;
  
  &:focus {
    outline: none;
  }
`;

export const StyledSeparationLine = styled(motion.div)`
  height: 2px;
  background-color: #888888;
`;