import { PROVIDERS } from "../constants/providers";
import { AIStrategy } from "../providers/strategies/ai.strategy";
import { ConfigService } from "nestjs-config";

export type AIProviderDecoratorParams = {
    supportedProviders?: PROVIDERS[];
    fallbackProvider?: PROVIDERS;
};

export type Provider = AIStrategy & { name: string };
export type ProviderServicesType = {
    configService?: ConfigService,
    hopefulService?: any,
    rapidService?: any,
};