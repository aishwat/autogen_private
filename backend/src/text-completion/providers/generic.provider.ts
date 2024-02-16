import { AIStrategy } from "./strategies/ai.strategy";
import CompletionRequest from "../dto/completion-request.dto";
import CompletionResponse from "../dto/completion-response.dto";
import { PROVIDERS } from "../constants/providers";

const promptTemplates = [
    (input: string) => `${input}\n\n Summarise the above text.`,
    (input: string) => `${input}\n\n TL;DR:`,
    (input: string) => `${input}\n\n Rewrite the above in a few short sentences.`,
];

export class GenericProvider implements AIStrategy {
    private readonly strategy: AIStrategy;
    public name: string;

    constructor(strategy: AIStrategy, name: string) {
        // super();
        this.strategy = strategy;
        this.name = name;
    }

    // not used for this provider
    makePostRequest(prompt: string, action: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    // not used for this provider
    generateText(input: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    getStrategy() {
        return this.strategy;
    }


    public async summarise(request: CompletionRequest): Promise<CompletionResponse> {
        const choicesResp = await Promise.all(promptTemplates?.map((template) => {
            return this.strategy.makePostRequest(template(request?.input));
        }));

        if (this.name == PROVIDERS[PROVIDERS.HOPEFUL].toString()) {
            return { choices: choicesResp.map(choices => choices?.text) };
        }
        if (this.name == PROVIDERS[PROVIDERS.RAPID].toString()) {
            return { choices: choicesResp.map(choices => choices?.answer) };
        }

    }
}