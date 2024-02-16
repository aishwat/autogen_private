import { AIStrategy } from "./ai.strategy";
import { ConfigService } from "nestjs-config";

export class RapidStrategy implements AIStrategy {
    private configService: ConfigService;
    private rapidService: any;

    constructor(services) {
        this.configService = services.configService;
        this.rapidService = services.rapidService;
    }

    generateText(input: string): Promise<string> {
        return this.rapidService.generateText(input);
    }

    makePostRequest(prompt: string, action: string): Promise<any> {
        return this.rapidService.makePostRequest(prompt, action || "summarise");
    }

}