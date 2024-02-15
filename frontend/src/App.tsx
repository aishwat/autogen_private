import { SummariseForm } from "./SummariseForm";
import Choices from "./Choices";
import { useState } from "react";

function App() {
    const [choices, setChoices] = useState([]);
    return (
        <div className="bg-neutral-100 min-h-screen">
            <main className="max-w-[1200px] m-auto pt-4">
                <h1 className="text-4xl font-light mb-6">AutogenAI Interview</h1>
                <div className="flex">
                    <SummariseForm setChoices={setChoices} />
                    <Choices choices={choices} />
                </div>
            </main>
        </div>
    );
}

export default App;
