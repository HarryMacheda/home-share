import { Stack } from "@mui/material";

export type ListProps = {
    children: React.ReactNode;
    gap?: number; 
  };

export function List({ children, gap = 2 }: ListProps) {
    return (
        <Stack spacing={gap}>
            {children}
        </Stack>
    );
}