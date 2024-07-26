import styled, { keyframes, css } from 'styled-components';
import { motion } from "framer-motion"

interface SentenceItemProps extends React.HTMLAttributes<HTMLSpanElement> {
    status: 'checking' | 'valid' | 'invalid';
  }

export const StyledOutputWrapper = styled(motion.div)`
transform-origin: center;
`;

export const StyledOutput = styled.div`
  width: 800px;
  min-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 24px;
`;

const boxShadowAnimation = keyframes`
  0% {
    box-shadow: inset 0 -12px 0 #CCCCCC;
  }
  100% {
    box-shadow: inset 0 -12px 0 #FFFFFF;
  }
`;

const checkingAnimation = css`
  animation: ${boxShadowAnimation} 0.5s infinite alternate;
`;

export const SentenceItem = styled.span<SentenceItemProps>`
  box-shadow: ${({ status }) =>
    status === 'checking'
      ? 'inset 0 -12px 0 #CCCCCC'  // Startfarbe für Animation
      : status === 'valid'
      ? 'transparent'
      : status === 'invalid'
      ? 'inset 0 -12px 0 #FCD8D8'
      : 'white'};
  color: ${({ status }) => (status === 'invalid' ? '#7E1515' : 'black')};
  cursor: ${({ status }) => (status === 'invalid' ? 'pointer' : 'default')};

  ${({ status }) => status === 'checking' && checkingAnimation}
`;

export const StyledModalContent = styled.div`
    background: '#F1ECE8';
    backdrop-filter: blur(10px);
    font-family: 'Helvetica neue';
   // padding: 20px;
    border-radius: 8px;
   // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    text-align: left;
`;

//Schrift verändern, Hintergrundfarbe ändern + Blaue Linie weg