import { Injectable } from "@nestjs/common";
import { HopefulAiService } from "./hopeful-ai.service";
import CompletionResponse from "./dto/completion-response.dto";
import CompletionRequest from "./dto/completion-request.dto";
import { RapidAiService } from "./rapid-ai.service";

const promptTemplates = [
    (input: string) => `${input}\n\n Summarise the above text.`,
    (input: string) => `${input}\n\n TL;DR:`,
    (input: string) => `${input}\n\n Rewrite the above in a few short sentences.`,
];

@Injectable()
export class TextCompletionService {
    constructor(private readonly hopefulAiService: HopefulAiService,
                private readonly rapidApiService: RapidAiService) {
    }

    public async summarise(request: CompletionRequest): Promise<CompletionResponse> {
        // const choices: string[] = [];

        // for (const template of promptTemplates) {
        //     const prompt = template(request.input);
        //     const response = await this.hopefulAiService.makePostRequest(prompt, "summarise");
        //     choices.push(response.text);
        // }
        const choicesResp = await Promise.all(promptTemplates?.map((template) => {
            return this.hopefulAiService.makePostRequest(template(request?.input), "summarise");
        }));

        return { choices: choicesResp.map(choices => choices?.text) };
    }
}
