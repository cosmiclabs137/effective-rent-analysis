import { FormControl, TextField, Tooltip } from "@mui/material";

const InputWithTooltip = ({
    value,
    handleChange,
    label,
    title,
    adornment,
    type = "number",
    variant = "standard",
    inputProps = { min: 0, step: 0.01 },
    placement = "top",
    sx = { paddingTop: 2 },
    describeChild = true,
}) => {
    return (
        <Tooltip
            title={title}
            placement={placement}
            describeChild={describeChild}
        >
            <FormControl sx={sx} fullWidth>
                <TextField
                    label={label}
                    type={type}
                    variant={variant}
                    value={value}
                    onChange={handleChange}
                    inputProps={inputProps}
                    InputProps={adornment}
                />
            </FormControl>
        </Tooltip>
    );
};

export default InputWithTooltip;
