import { AIStrategy } from "./ai.strategy";
import { ConfigService } from "nestjs-config";

export class HopefulStrategy implements AIStrategy {
    private configService: ConfigService;
    private hopefulService: any;

    constructor(services) {
        this.configService = services.configService;
        this.hopefulService = services.hopefulService;
    }

    generateText(input: string): Promise<string> {
        return this.hopefulService.generateText(input);
    }

    makePostRequest(prompt: string, action: string): Promise<any> {
        return this.hopefulService.makePostRequest(prompt, action || "summarise");
    }

}