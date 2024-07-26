![logo](src/assets/secondopinion.gif)

# Second Opinion Frontend

Frontend repository for the AI4media hackathon called Second Opinion. We shorten and summarize text content and detect hallucinations in generated text answers.

⚠️ This is only a Proof of Concept and not ready for production use.

## To start the application

1. make sure you have created an `.env` file with a bearer token for the backend.
2. then install all required dependencies with

```bash
yarn
```

and start the local development server with

```bash
yarn start
```

## API-Calls

1. The first API call sends the input from the input field to the API endpoint for completion. The response from the API is a stream output in form of small chunks. After all chunks from one sentence are arrived they get merged into a sentence.
2. After a sentence is complete, it is sent to the validation API endpoint. Upon receipt of the response from the validation endpoint, each sentence receives a status. If the status is valid, the highlighting of the sentence is removed. However, if the status is invalid, it receives an additional reason why the record is invalid and the highlight turns red and is clickable. 
3. For a new review, click on the second opinion logo and you will return to the home screen.

