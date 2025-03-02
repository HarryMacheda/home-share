import React, { useState } from "react";
import { Popover, Box, TextField, Slider } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { desaturateHex, getContrastColour } from "@/utilities/lights";

export function ColorPicker({ defaultColor = "#6200ea", onChange, disabled }: { 
  defaultColor?: string;
  onChange?: (color: string) => void;
  disabled?: boolean
}) {
  const [colour, setColour] = useState(defaultColor);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (newColour: string) => {
    setColour(newColour);
    if (onChange) onChange(newColour);
  };


  return (
    <Box display="flex" alignItems="center" gap={1} >
      <TextField
        disabled={disabled}
        value={colour}
        onChange={(e) => handleColorChange(e.target.value)}
        sx={{ width: 120, backgroundColor: (disabled ? desaturateHex(colour, 0.8) : colour), input:{color: getContrastColour(colour)} }}
        onClick={handleClick}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{vertical: 'top',horizontal: 'center',}}
      >
        <Box p={2}>
          <HexColorPicker color={colour} onChange={handleColorChange} />
          <Slider/>
        </Box>
      </Popover>
    </Box>
  );
}