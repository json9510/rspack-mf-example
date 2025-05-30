import { Entities, type Results } from "../results";
import { appUserResultSchema } from "../../ui/organism/ResultsCard/AppUser";
import { essResultSchema } from "../../ui/organism/ResultsCard/Ess";

export const ALLOWED_ENTITIES: Entities[] = [Entities.APP_USER, Entities.ESS];

export const PREV_SEARCH_KEY = "recentSearchs";

export const RESULTS_PER_ENTITY: Record<string, Results> = {
	APP_USER: appUserResultSchema,
	ESS: essResultSchema,
};
