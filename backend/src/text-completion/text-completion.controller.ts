import { Body, Controller, Post } from "@nestjs/common";
// import { TextCompletionService } from "./text-completion.service";
import CompletionRequest from "./dto/completion-request.dto";
import CompletionResponse from "./dto/completion-response.dto";
import { AIProvider, ProviderServices } from "./providers/generic.provider.factory";
import { PROVIDERS } from "./constants/providers";
import { Provider } from "./types/provider";
import { HopefulAiService } from "./hopeful-ai.service";
import { RapidAiService } from "./rapid-ai.service";

@Controller()
export class TextCompletionController {
    constructor(private hopefulAiService: HopefulAiService, private rapidAiService: RapidAiService) {
    }

    onModuleInit() {
        // ProviderServices.configService = this.configService;
        ProviderServices.hopefulService = this.hopefulAiService;
        ProviderServices.rapidService = this.rapidAiService;
    }


    @Post("summarise")
    public async summarise(@Body() completionRequest: CompletionRequest,
                           @AIProvider({
                               supportedProviders: [PROVIDERS.HOPEFUL, PROVIDERS.RAPID],
                               fallbackProvider: PROVIDERS.RAPID,
                           })
                               provider: Provider,
    ): Promise<CompletionResponse> {
        // return this.textCompletionService.summarise(completionRequest);
        return provider.summarise(completionRequest);
    }
}
