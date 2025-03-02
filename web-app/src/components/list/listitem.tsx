import { Box, ListItem, Typography } from "@mui/material";
import { ReactNode } from "react";
import { desaturateHex, getContrastColour } from "@/utilities/lights";
import Checkbox from '@mui/material/Checkbox';

export type ListItemProps = {
    title: string;
    colour?: string;
    description?: string;
    chips?: ReactNode;
    selected?: boolean;
    actions?: ReactNode;
    disabled?:boolean
    onClick?: (event:MouseEvent) => void; 
}

export function ListEntry({
        title,
        colour,
        description,
        chips,
        selected,
        actions,
        disabled
    }: ListItemProps) {

    return (
        <ListItem sx={{ 
            borderRadius: '8px',
            backgroundColor: colour, 
            color: disabled ? "rgba(0, 0, 0, 0.26)": getContrastColour(colour),
            border: '3px solid ' + (selected ?  'black' : colour),
            userSelect:"none"
            }}>
            <Checkbox disabled={disabled} checked={selected} sx={{color: disabled ? "rgba(0, 0, 0, 0.26)": getContrastColour(colour),'&.Mui-checked': {color: getContrastColour(colour),},}}/>
            <Box sx={{ marginLeft: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {title && <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography>}
                {description && <Typography variant="h6">{description}</Typography>}
                {chips}
            </Box>
            {actions}
        </ListItem>
    )

  }


