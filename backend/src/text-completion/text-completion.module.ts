import { Module } from "@nestjs/common";
import { ActivityModule } from "src/activity/activity.module";
import { TextCompletionController } from "./text-completion.controller";
import { TextCompletionService } from "./text-completion.service";
import { RapidAiService } from "./rapid-ai.service";
import { HopefulAiService } from "./hopeful-ai.service";

@Module({
    controllers: [TextCompletionController],
    providers: [TextCompletionService, HopefulAiService, RapidAiService],
    imports: [ActivityModule],
    exports: [],
})
export class TextCompletionModule {
}
