import React, { useEffect, useState } from 'react';
import { SentenceItem, StyledOutput, StyledOutputWrapper, StyledModalContent } from './styles.OutputField';
import { useAnimationControls } from 'framer-motion';
import { Modal } from 'antd';
import { Sentence, OutputComponentProps } from '../../types/Types';

export const OutputField: React.FC<OutputComponentProps> = ({
    sentences,
    startAnimate
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleClick = (sentence: Sentence) => {
        if (sentence.status === 'invalid') {
            setModalContent(sentence.invalidInfo ?? 'No information available.');
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const outputFieldAnimationController = useAnimationControls();

    const outputFieldVariants = {
        initial: {
            opacity: 1,
            y: 2000
        },
        flyOut: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.2,
                type: 'ease-out'
            }
        }
    };

    useEffect(() => {
        if (startAnimate) {
            outputFieldAnimationController.start('flyOut');
        }
    }, [startAnimate]);

    return (
        <>
            <StyledOutputWrapper
                variants={outputFieldVariants}
                initial="initial"
                animate={outputFieldAnimationController}
            >
                <StyledOutput>
                    {sentences &&
                        sentences.map((sentence) => (
                            <SentenceItem key={sentence.id} status={sentence.status} onClick={() => handleClick(sentence)}>
                                {sentence.text}                     
                                
                            </SentenceItem>
                        ))}
                </StyledOutput>
            </StyledOutputWrapper>
            <div></div>
            <Modal 
                open={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
                centered
                style={{backgroundColor: 'white'}}
            >
                <StyledModalContent>
                    <p>{modalContent}</p>
                </StyledModalContent>
            </Modal>
        </>
    );
};
