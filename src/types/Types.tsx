export interface Sentence {
    id: string;
    text: string;
    status: 'checking' | 'valid' | 'invalid';
    invalidInfo?: string;
}

export interface InputComponentProps {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    sentences: Sentence[];
    setSentences: React.Dispatch<React.SetStateAction<Sentence[]>>;
    startAnimate: Boolean;
    setStartAnimate: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface OutputComponentProps {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    sentences: Sentence[];
    setSentences: React.Dispatch<React.SetStateAction<Sentence[]>>;
    startAnimate: Boolean;
    setStartAnimate?: React.Dispatch<React.SetStateAction<Boolean>>;
}