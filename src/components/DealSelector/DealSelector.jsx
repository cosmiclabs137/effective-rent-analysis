import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { DealsContext } from "../../contexts/DealsContexts";

const DealSelector = ({ dealId, handleChange }) => {
    const deals = React.useContext(DealsContext);
    return (
        <div>
            <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="deal-selector-label">Deal</InputLabel>
                <Select
                    labelId="deal-selector"
                    id="deal-selector"
                    value={dealId}
                    label="Deal"
                    onChange={handleChange}
                >
                    {deals.map((deal) => (
                        <MenuItem value={deal.id} key={deal.id}>
                            {deal.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Choose a deal</FormHelperText>
            </FormControl>
        </div>
    );
};

export default DealSelector;
