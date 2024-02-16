import { createParamDecorator, Injectable } from "@nestjs/common";
import { AIProviderDecoratorParams, Provider, ProviderServicesType } from "../types/provider";
import { ConfigService } from "nestjs-config";
import { PROVIDERS } from "../constants/providers";
import { GenericProvider } from "./generic.provider";
import { HopefulStrategy } from "./strategies/hopeful.strategy";
import { RapidStrategy } from "./strategies/rapid.strategy";

export const ProviderServices: ProviderServicesType = {
    configService: null,
    hopefulService: null,
    rapidService: null,
};

const providerMap = {
    [PROVIDERS.HOPEFUL]: HopefulStrategy,
    [PROVIDERS.RAPID]: RapidStrategy,
};
export const AIProvider = createParamDecorator(
    async (data: AIProviderDecoratorParams, context): Promise<Provider> => {
        const { configService, hopefulService, rapidService } = ProviderServices;

        const providerFactory = new GenericProviderFactory(
            configService, hopefulService, rapidService,
        );

        return providerFactory.getProvider(data);
    },
);


@Injectable()
export class GenericProviderFactory {
    constructor(
        private readonly configService: ConfigService,
        private readonly hopefulService: any,
        private readonly rapidService: any,
    ) {
    }

    private isHopeful = false; //or read from config service or function on settings
    private isRapid = false;

    getProviderName() {
        if (this.isHopeful) return PROVIDERS.HOPEFUL;
        if (this.isRapid) return PROVIDERS.RAPID;
    }

    // checkFallback(supportedProviders, fallbackProvider, providerName) {
    //     const providerUnsupported = supportedProviders && !supportedProviders.includes(providerName);
    //     const isProviderValid = Object.values(PROVIDERS).includes(providerName);
    //
    //     if (providerName && providerUnsupported && !fallbackProvider) {
    //         throw new Error(
    //             `Unsupported provider ${PROVIDERS[providerName]}. ` +
    //             `Supported providers: ${supportedProviders?.map(_name => PROVIDERS[_name]).join(",")}`,
    //         );
    //     }
    //
    //     // (if there's invalid provider or an unsupported provider) AND we have a fallback provider
    //     if ((!isProviderValid || providerUnsupported) && Number.isInteger(fallbackProvider) ) {
    //         return fallbackProvider;
    //     }
    // }

    async getProvider(params: AIProviderDecoratorParams): Promise<Provider> {
        try {
            const providerName = this.getProviderName() ;

            // providerName =
            //     this.checkFallback(params.supportedProviders, params.fallbackProvider, providerName) || providerName;

            const ctor = providerMap[providerName || params.fallbackProvider];

            if (!ctor) {
                throw new Error(`Unsupported provider ${PROVIDERS[providerName]}.`);
            }
            const strategy = new ctor({
                configService: this.configService,
                hopefulService: this.hopefulService,
                rapidService: this.rapidService,
            });

            return new GenericProvider(strategy, PROVIDERS[providerName || params.fallbackProvider]);
        } catch (err) {
            throw new Error(`Provider Initialisation Failed ${err.message}`);
        }
    }
}