import React, { useState } from 'react';
import { InputField } from './components/InputField/InputField';
import { OutputField } from './components/OutputField/OutputField';
import { Wrapper } from './styles.Content';

interface Sentence {
    id: string;
    text: string;
    status: 'checking' | 'valid' | 'invalid';
    invalidInfo?: string;
  }

export const Content: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [startAnimate, setStartAnimate] = useState<Boolean>(false);

    return (
        <Wrapper>
            <InputField
                prompt={prompt}
                setPrompt={setPrompt}
				sentences={sentences}
                setSentences={setSentences}
                startAnimate={startAnimate}
                setStartAnimate={setStartAnimate}
            />
            <OutputField
                prompt={prompt}
                setPrompt={setPrompt}
				sentences={sentences}
                startAnimate={startAnimate}
                setSentences={setSentences}
            />
        </Wrapper>
    );
};
