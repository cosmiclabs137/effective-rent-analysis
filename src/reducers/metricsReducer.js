export const metricsReducer = (metrics, action) => {
    switch (action.type) {
        case "landlord": {
            return {
                tenant: [...metrics.tenant],
                landlord: [...metrics.landlord, action.metrics],
            };
        }
        case "tenant": {
            return {
                landlord: [...metrics.landlord],
                tenant: [...metrics.tenant, action.metrics],
            };
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
