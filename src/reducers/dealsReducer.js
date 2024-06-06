import { dealFactory } from "../utils";

export const dealsReducer = (deals, action) => {
    switch (action.type) {
        case "created": {
            const id = deals.length;
            return [...deals, dealFactory(id)];
        }
        case "deleted": {
            return deals.filter((deal) => deal.id !== action.id);
        }
        case "updated": {
            return deals.map((d) =>
                d.id === action.id
                    ? { ...deals[action.id], [action.key]: action.value }
                    : d
            );
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
