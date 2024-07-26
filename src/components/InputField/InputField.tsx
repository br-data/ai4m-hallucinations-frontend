import React, { useState, Dispatch, SetStateAction, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
import { completionData, validateSentence } from '../../logic/apiCalls';
import { StyledInput, StyledInputWrapper, StyledSeparationLine } from './styles.InputField';
import { useAnimationControls } from 'framer-motion';
import { Sentence, InputComponentProps } from '../../types/Types';
export const InputField: React.FC<InputComponentProps> = ({
    prompt,
    setPrompt,
    sentences,
    setSentences,
    startAnimate,
    setStartAnimate
}) => {
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [chunks, setChunks] = useState<string[]>([]);
    const [currentSentence, setCurrentSentence] = useState<string>('');
    const [isVisible, setIsVisible] = useState(true);
    const [fontSize, setFontSize] = useState(32);
    const divRef = useRef<HTMLDivElement | null>(null);
    const maxHeight = 600;
    const minFontSize = 16;

    const inputFieldAnimationController = useAnimationControls();

    const inputFieldVariants = {
        initial: {
            opacity: 1,
            y: 0
        },
        flyOut: {
            y: -1000,
            opacity: 0,
            transition: {
                duration: 1,
                delay: 0.2,
                type: 'ease-out'
            }
        }
    };

    const handleAnimationComplete = () => {
        setIsVisible(false);
    };

    const startStream = async () => {
        setIsStreaming(true);
        try {
            await completionData(prompt, handleChunk);
        } catch (error) {
            console.error('Error fetching stream data in StreamingComponent', error);
        }
        setIsStreaming(false);
    };

    const handleChunk = (chunk: string) => {
        setChunks((prevChunks) => [...prevChunks, chunk]);
        setCurrentSentence((prevSentence) => {
            const newSentence = prevSentence + chunk;
            const sentenceParts = newSentence.split('.');
            const completeSentences = sentenceParts
                .slice(0, -1)
                .map((s) => s.trim())
                .filter((s) => s);
            const incompleteSentence = sentenceParts[sentenceParts.length - 1];

            if (completeSentences.length > 0) {
                const newSentences = completeSentences.map((s) => ({
                    id: crypto.randomUUID(),
                    text: s + '. ',
                    status: 'checking' as 'checking',
                    invalidInfo: ''
                }));

                setSentences((prevSentences) => {
                    const uniqueSentences = newSentences.filter(
                        (newSentence) =>
                            !prevSentences.some((existingSentence) => existingSentence.text === newSentence.text)
                    );
                    return [...prevSentences, ...uniqueSentences];
                });

                newSentences.forEach((sentence) => validateAndUpdateSentence(sentence));
            }

            return incompleteSentence;
        });
    };

    const validateAndUpdateSentence = async (sentence: Sentence) => {
        const updatedSentence = await validateSentence(sentence, prompt);
        updateSentenceStatus(updatedSentence);
    };

    const updateSentenceStatus = (updatedSentence: Sentence) => {
        setSentences((prevSentences) => prevSentences.map((s) => (s.id === updatedSentence.id ? updatedSentence : s)));
    };

    const reset = () => {
        setSentences([]);
        setCurrentSentence('');
        setChunks([]);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            reset();
            startStream();
            inputFieldAnimationController.start('flyOut');

            setTimeout(() => {
                inputFieldAnimationController.mount();
            }, 500);

            setStartAnimate(true);
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        const sanitizedText = text.replace(/\r?\n|\r/g, ''); // Entfernt alle Zeilenumbrüche
        document.execCommand('insertText', false, sanitizedText);
    };

    const adjustFontSize = () => {
        const div = divRef.current;
        if (div) {
            let currentFontSize = fontSize;
            div.style.fontSize = `${currentFontSize}px`;

            while (div.scrollHeight > maxHeight && currentFontSize > minFontSize) {
                currentFontSize -= 1;
                div.style.fontSize = `${currentFontSize}px`;
            }

            setFontSize(currentFontSize);
        }
    };

    useEffect(() => {
        adjustFontSize();
    }, [prompt]);

    useEffect(() => {
        console.log(sentences);
    }, [sentences]);

    return (
        <>
            {isVisible && (
                <StyledInputWrapper
                    variants={inputFieldVariants}
                    initial="initial"
                    animate={inputFieldAnimationController}
                    onAnimationComplete={handleAnimationComplete}
                >
                    <StyledInput
                        ref={divRef}
                        contentEditable="true"
                        fontSize={fontSize}
                        content={prompt}
                        onInput={(e: FormEvent<HTMLDivElement>) => setPrompt(e.currentTarget.textContent || '')}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onPaste={(e) => handlePaste(e)}
                        placeholder="Enter your Text here..."
                    />
                    <StyledSeparationLine/>
                </StyledInputWrapper>
            )}
        </>
    );
};
