"use client"
import React from "react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { Drawer, List, ListItem, ListItemIcon, ListItemText,ListItemButton, CssBaseline, Box, AppBar, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const navItems = [
  { name: "Home", href: "/", icon: <HomeIcon/> },
  {
    name: "Lights",
    items: [
      { name: "List", href: "/lights/list", icon: <FormatListBulletedIcon/> },
      { name: "House Map", href: "/lights/map", icon: <MapIcon/> },
    ],
  },
  { name: "Settings", href: "/settings", icon: <SettingsIcon/> },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:false
    },
  },
})

export default function Layout({ children }: PropsWithChildren) {

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Home Share Net
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer
              variant="permanent"
              sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: 240,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                {navItems.map((item) =>
                  item.items ? (
                    <React.Fragment key={item.name}>
                      <ListItem>
                        <ListItemText primary={item.name} />
                      </ListItem>
                      <List component="div" disablePadding>
                        {item.items.map((subItem) => (
                          <ListItem key={subItem.name} disablePadding>
                            <ListItemButton
                              component={Link}
                              href={subItem.href}
                            >
                              <ListItemIcon>{subItem.icon}</ListItemIcon>
                              <ListItemText primary={subItem.name} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </React.Fragment>
                  ) : (
                    <ListItem key={item.name} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={item.href}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
                </List>
              </Box>
            </Drawer>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
            >
              <Toolbar />
              {children}
            </Box>
          </Box>
        </QueryClientProvider>
      </body>
    </html>
  );
}
