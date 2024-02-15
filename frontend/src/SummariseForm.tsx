import { FormEvent, useState } from "react";
import axios from "axios";

interface SummariseFormProps {
    setChoices: Function;
}

export function SummariseForm({ setChoices }: SummariseFormProps) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!text.trim()) {
            alert("Please enter some text to summarise.");
            return;
        }
        setIsLoading(true);
        setError("");

        try {
            const response = await callSummariseAPI(text);
            console.log(response);
            setChoices(response?.choices);
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching the summary.");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="mr-4 w-1/2 bg-white rounded-md border border-neutral-200 p-4" onSubmit={handleSubmit}>
            <label className="block mb-4">
                <span className="block font-medium mb-4">Text to summarise</span>
                <textarea className="border border-neutral-400 p-4 w-full rounded-md h-[360px] resize-none"
                          value={text}
                          onChange={(e) => setText(e.target.value)} />
            </label>
            <button type="submit" className="p-3 bg-neutral-800 rounded-md text-white font-medium hover:bg-neutral-900">
                Summarise
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </form>
    );
}

async function callSummariseAPI(text: string) {
    try {
        const response = await axios.post("http://localhost:3000/summarise", { input: text });
        return response.data; // Accessing the data property to get the response from the server
    } catch (error) {
        // Axios wraps the native Error object, so you can access additional info through error.response, etc.
        throw error;
    }
}