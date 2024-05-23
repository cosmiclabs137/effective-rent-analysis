import React from "react";
import { useForm } from "react-hook-form";

const FORM_FIELDS = new Set([
    "id",
    "name",
    "sqtf",
    "term",
    "baseRent",
    "annualEscalations",
    "opExPerMonth",
    "opExGrowthRate",
    "otherNonRecurringCost",
    "otherNonRecurringCostTotal",
    "otherRecurringCost",
    "otherRecurringCostTotal",
    "contributionGrowthRate",
    "monthsFreeRent",
    "commissionFirst",
    "commissionSecond",
    "tenantDiscountRate",
    "tenantImprovementCost",
    "tenantImprovementAllowance",
    "landlordDiscountRate",
]);

const DealsContext = React.createContext(null);
const DealsDispatchContext = React.createContext(null);

const dealsReducer = (deals, action) => {
    switch (action.type) {
        case "created": {
            const id = deals.length;
            const newDeal = {
                id: id,
                name: `Deal ${id + 1}`,
                sqtf: 0,
                term: 12,
                baseRent: 0,
                annualEscalations: 0,
                opExPerMonth: 0,
                opExGrowthRate: 0,
                otherNonRecurringCost: 0,
                otherNonRecurringCostTotal: 0,
                otherRecurringCost: 0,
                otherRecurringCostTotal: 0,
                contributionGrowthRate: 0,
                monthsFreeRent: 0,
                commissionFirst: 0,
                commissionSecond: 0,
                tenantDiscountRate: 0,
                tenantImprovementCost: 0,
                tenantImprovementAllowance: 0,
                landlordDiscountRate: 0,
            };
            console.log(newDeal);
            return [...deals, newDeal];
        }
        case "deleted": {
            return deals.filter((deal) => deal.id !== action.id);
        }
        case "updated": {
            return deals.map((deal) =>
                deal.id === action.deal.id ? action.deal : deal
            );
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};

const DealContainer = () => {
    const [deals, dispatch] = React.useReducer(dealsReducer, []);

    const handleAddDeal = () => {
        console.log("added deal");
        dispatch({
            type: "created",
        });
    };

    const handleDeleteDeal = (id) => {
        console.log(`deleted deal ID: ${id}`);
        dispatch({
            type: "deleted",
            id: id,
        });
    };

    const handleUpdateDeal = (event) => {
        console.log(event);
        const deal = {};
        const formData = new FormData(event.currentTarget);
        for (const [key, value] of formData.entries()) {
            if (FORM_FIELDS.has(key)) {
                deal[key] = value;
            }
        }
        dispatch({
            type: "updated",
            deal: deal,
        });
    };

    return (
        <div>
            {deals.length > 0 ? (
                <DealForm
                    onSubmit={handleUpdateDeal}
                    handleDeleteDeal={handleDeleteDeal}
                    deal={deals[0]}
                />
            ) : (
                <React.Fragment>
                    <button type="submit" onClick={handleAddDeal}>
                        Add deal
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

const DealForm = ({ onSubmit, handleDeleteDeal, deal }) => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();
    const handleErrors = (errors) => console.error(errors);

    return (
        <React.Fragment>
            <h2>Deal From</h2>
            <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                <input
                    type="hidden"
                    value={deal.id}
                    name="id"
                    {...register("id")}
                />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Name of Deal"
                    name="name"
                    {...register("name")}
                />
                <br />
                <label htmlFor="sqft">Sqft</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="sqft"
                    {...register("sqft")}
                />
                <br />
                <label htmlFor="term">Term</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="term"
                    {...register("term")}
                />
                <br />
                <label htmlFor="baseRent">Base Rent</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="baseRent"
                    {...register("baseRent")}
                />
                <br />
                <label htmlFor="annualEscalations">Annual Escalations</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="annualEscalations"
                    {...register("annualEscalations")}
                />
                <br />
                <label htmlFor="opExPerMonth">OpEx per Month</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="opExPerMonth"
                    {...register("opExPerMonth")}
                />
                <br />
                <label htmlFor="opExGrowthRate">OpEx Growth Rate</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="opExGrowthRate"
                    {...register("opExGrowthRate")}
                />
                <br />
                <label htmlFor="otherNonRecurringCost">
                    Other Non-Recurring Cost
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="otherNonRecurringCost"
                    {...register("otherNonRecurringCost")}
                />
                <br />
                <label htmlFor="otherNonRecurringCostTotal">
                    Other Non-Recurring Cost (Total)
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="otherNonRecurringCostTotal"
                    {...register("otherNonRecurringCostTotal")}
                />
                <br />
                <label htmlFor="otherRecurringCost">Other Recurring Cost</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="otherRecurringCost"
                    {...register("otherRecurringCost")}
                />
                <br />
                <label htmlFor="otherRecurringCostTotal">
                    Other Recurring Cost (Total)
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="otherRecurringCostTotal"
                    {...register("otherRecurringCostTotal")}
                />
                <br />
                <label htmlFor="contributionGrowthRate">
                    Contribution Growth Rate
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="contributionGrowthRate"
                    {...register("contributionGrowthRate")}
                />
                <br />
                <label htmlFor="monthsFreeRent">Months Free Rent</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="monthsFreeRent"
                    {...register("monthsFreeRent")}
                />
                <br />

                <label htmlFor="commissionFirst">commission (Yrs 1 to 5)</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="commissionFirst"
                    {...register("commissionFirst")}
                />
                <br />
                <label htmlFor="commissionSecond">
                    Commission (Yrs 6 to 10)
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="commissionSecond"
                    {...register("commissionSecond")}
                />
                <br />
                <label htmlFor="tenantDiscountRate">Tenant Discount Rate</label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="tenantDiscountRate"
                    {...register("tenantDiscountRate")}
                />
                <br />
                <label htmlFor="tenantImprovementCost">
                    Tenant Improvement Cost
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="tenantImprovementCost"
                    {...register("tenantImprovementCost")}
                />
                <br />
                <label htmlFor="tenantImprovementAllowance">
                    Tenant Improvement Allowance
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="tenantImprovementAllowance"
                    {...register("tenantImprovementAllowance")}
                />
                <br />
                <label htmlFor="landlordDiscountRate">
                    Landlord Discount Rate
                </label>
                <input
                    type="number"
                    min={0}
                    placeholder={0}
                    name="landlordDiscountRate"
                    {...register("landlordDiscountRate")}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onSubmit={() => handleDeleteDeal(deal.id)}>Delete?</button>
        </React.Fragment>
    );
};

export default DealContainer;
