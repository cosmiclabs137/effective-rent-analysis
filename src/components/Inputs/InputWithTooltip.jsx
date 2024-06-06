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
    disabled = false,
}) => {
    return (
        <Tooltip
            arrow
            followCursor
            title={title}
            placement={placement}
            describeChild={describeChild}
        >
            <FormControl sx={sx} fullWidth>
                <TextField
                    label={label}
                    type={type}
                    variant={variant}
                    defaultValue={value}
                    onBlur={handleChange}
                    inputProps={inputProps}
                    InputProps={adornment}
                    disabled={disabled}
                />
            </FormControl>
        </Tooltip>
    );
};

export default InputWithTooltip;
