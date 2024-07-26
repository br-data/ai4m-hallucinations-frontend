import axios from "axios";

interface Sentence {
  id: string;
  text: string;
  status: 'checking' | 'valid' | 'invalid';
  invalidInfo?: string;
}

const access_token = process.env.TOKEN;
const BASE_URL = 'https://ai4m-hallucination.brdata-dev.de';
const config = {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const completionData = async (source: string, onChunk: (chunk: string) => void) => {
  try {
    const response = await fetch(
      `${BASE_URL}/completion?honest=true&raw_output=false`,
      {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ source: source, query_id: 'a994ebbb-9faa-4a9c-b74e-ec84d6632256' })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Unable to get reader from response body');
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        buffer += decoder.decode(value, { stream: true });
        let parts = buffer.split('\n');
        buffer = parts.pop() || '';
        for (let part of parts) {
          if (part) {
            const parsed = JSON.parse(part);
            if (parsed.type == 'message') {
            onChunk(parsed.content);
          }
          }
        }
      }
    }

    if (buffer) {
      const parsed = JSON.parse(buffer);
      onChunk(parsed.content);
    }

  } catch (error) {
    console.error('Error fetching stream data', error);
    throw error;
  }
};

export const validateSentence = async (sentence:Sentence, prompt:string) => {
  try {
    const checkResponse = await axios.post(`${BASE_URL}/check`, { source: prompt, sentence: sentence.text }, config);
    const { result, reason } = checkResponse.data;
    if (result) {
      return { ...sentence, status: 'valid' as 'valid' };
    } else {
      return { ...sentence, status: 'invalid' as 'invalid', invalidInfo: reason };
    }
  } catch (error) {
    console.error('Error validating sentence', error);
    throw error;
  }
};