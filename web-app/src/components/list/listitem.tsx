import { Box, ListItem, Typography } from "@mui/material";
import { ReactNode } from "react";
import { getContrastColour } from "@/utilities/lights";
import Checkbox from '@mui/material/Checkbox';

export type ListItemProps = {
    title: string;
    colour?: string;
    description?: string;
    chips?: ReactNode;
    selected?: boolean;
    actions?: ReactNode;
    onClick?: (event:MouseEvent) => void; 
}

export function ListEntry({
        title,
        colour,
        description,
        chips,
        selected,
        actions,
        onClick,
    }: ListItemProps) {

    return (
        <ListItem sx={{ 
            borderRadius: '8px',
            backgroundColor: colour, 
            color:getContrastColour(colour),
            border: '3px solid ' + (selected ?  'black' : colour),
            userSelect:"none"
            }}>
            <Checkbox checked={selected} sx={{color: getContrastColour(colour),'&.Mui-checked': {color: getContrastColour(colour),},}}/>
            <Box sx={{ marginLeft: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {title && <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography>}
                {description && <Typography variant="h6">{description}</Typography>}
                {chips}
            </Box>
            {actions}
        </ListItem>
    )

  }


