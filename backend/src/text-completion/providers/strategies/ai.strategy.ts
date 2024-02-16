import CompletionRequest from "../../dto/completion-request.dto";
import CompletionResponse from "../../dto/completion-response.dto";

interface AIResponse {
    text?: string;
    answer?: string;
}

export interface AIStrategy {
    summarise?(request: CompletionRequest): Promise<CompletionResponse>;

    makePostRequest(prompt: string, action?: string): Promise<AIResponse>;

    generateText(input: string): Promise<string>;
}