"use client"
import { Box, Button, ButtonGroup, Chip, Divider, IconButton, Skeleton } from "@mui/material";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PaletteIcon from '@mui/icons-material/Palette';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getContrastColour } from "@/utilities/lights";
import { DeviceSettings } from "@/types/lights";
import { List } from "@/components/list/list";
import { ListEntry } from "@/components/list/listitem";
import { Ripple } from "@/components/Ripple";
import { ColorPicker } from "@/components/ColourPicker";

const API_IP = "http://192.168.1.140:81"

export type Light = {
  id:number,
  name:string,
  location:string,
  status:{type:number, message:string}
  colour:{
    red: 255,
    green: 158,
    blue: 216,
    rgb: string,
    hex: string,
    hsb: string
  }
}

export default function LightList() {
  const queryClient = useQueryClient();

  const getList = async () => {
      const response = await fetch(API_IP + '/api/lights/settings/devices', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = await response.json();
      return data;
  }

  const [selected, setSelected] = useState<number[]>([]);
  const [lastSelected, setLastSelected] = useState<number | null>();
  const [colour, setColour] = useState<string>("#FF9EFB");
  const { data, isLoading } = useQuery<Light[], Error>({ queryKey: ['devices'], queryFn: getList});

  if(isLoading){
      return <>Loading...</>
  }

  const ToggleSelected = (id:number, shift:boolean) => {
    const newValues = selected;
    if(selected.includes(id)){
      newValues.splice(newValues.indexOf(id), 1);
    }
    else {
      newValues.push(id);
    }


    if(lastSelected && shift){
      let selecting = 0;
      data!.forEach((x) => {
        if(!selecting && (x.id == lastSelected || x.id == id)) {
          selecting = x.id;
        }

        if(selecting && !(x.id == lastSelected || x.id == id)){
          if(!newValues.includes(x.id))
            newValues.push(x.id);
        }

        if(x.id != selecting && (x.id == lastSelected || x.id == id)){
          selecting = 0;
        }
      })
    }

    setSelected([...newValues]);
    setLastSelected(id);
  }

  const SelectAll = () => {
    const newValues:number[] = [];
    data?.forEach((x) => newValues.push(x.id))
    setSelected([...newValues])
  }

  const Refresh = () => {
    queryClient.invalidateQueries({queryKey:["devices"]})
    queryClient.invalidateQueries({queryKey:["device"]})
  }

  return (
    <Box sx={{ overflow: "auto", paddingTop:5 }}>
        <ButtonGroup>
          <Button 
            onClick={() => {TurnOn(selected, queryClient);}}
            disabled={selected.length < 2}
            startIcon={<LightModeIcon />}
          >
            On
          </Button>
          <Button 
            onClick={() => {TurnOff(selected, queryClient);}}
            disabled={selected.length < 2}
            startIcon={<DarkModeIcon />}
          >
            Off
          </Button>
          <ColorPicker defaultColor={colour} onChange={setColour} disabled={selected.length < 2}/>
          <Button 
            onClick={() => {UpdateColour(selected,colour, queryClient);}}
            disabled={selected.length < 2}
            startIcon={<PaletteIcon />}
          >
            Update colour
          </Button>
          <Button 
            onClick={() => {if(selected.length < 2) {SelectAll();} else {setSelected([]);}}}
            startIcon={selected.length < 2 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            >
            {selected.length < 2 ? "Select All" : "Deselect All"}
          </Button>
          <Button 
            onClick={() => Refresh()}
            startIcon={<RefreshIcon />}
            >
            Refresh
          </Button>
        </ButtonGroup>
        <br/><br/>
        <Divider />
        <br/>
        <List>
            {data?.map((x) =>{
                return (
                <Ripple key={x.id}>
                  <div style={{height:"100%"}} onClick={(event) => ToggleSelected(x.id, event.shiftKey)}>
                    <LightEntry id={x.id} name={x.name} location={x.location} status={x.status} colour={x.colour} selected={selected.includes(x.id)}/>
                  </div>
                </Ripple>
              )
              })}
        </List>
    </Box>
  )

}

function LightEntry({ id, status, selected, name, location }:DeviceSettings & {selected:boolean}) {
  const queryClient = useQueryClient();

  const getData = async () => {
    const response = await fetch(API_IP + '/api/lights/settings/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
  } 

  const { data, isLoading, refetch } = useQuery<DeviceSettings, Error>({ queryKey: ['device', id], queryFn: getData});

  if(isLoading){
    return <Skeleton variant="rounded" height={"95px"}></Skeleton>
  }

  if(!data){
    return <ListEntry
    title={name ?? ""}
    description={status.message}
    colour="#fff"
    disabled
    chips={
      <Chip
        icon={<LocationOnIcon/>}
        label={location}
        sx={{
          marginTop: '8px',
          width: 'fit-content',
          borderRadius: '4px',
        }}
      />    
    }
  />
  }

  return (
    <ListEntry
      title={data.name ?? ""}
      description={status.message}
      colour={data.colour?.hex}
      chips={
        <Chip
          icon={<LocationOnIcon sx={{ color: getContrastColour(data.colour?.hex) + " !important" }}/>}
          label={data.location}
          sx={{
            color:getContrastColour(data.colour?.hex),
            marginTop: '8px',
            width: 'fit-content',
            borderRadius: '4px',
          }}
        />    
      }
      actions={
        <IconButton onClick={() => {if (data.status.type == 4) {TurnOff([id], queryClient);} else {TurnOn([id], queryClient);} refetch();}}>
          {data.status.type == 4 ? 
            <LightModeIcon sx={{ color: getContrastColour(data.colour?.hex) }} /> 
            : <DarkModeIcon sx={{ color: getContrastColour(data.colour?.hex) }}/>}
        </IconButton>
      }
      selected={selected}
    />
  )
}



const TurnOn = async (ids:number[], queryClient: QueryClient,) => {
  const response = await fetch(API_IP + '/api/lights/on', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(ids)
  });
  const data = await response.json();
  InvalidateDevices(ids, queryClient);
  return data;
}

const TurnOff = async (ids:number[], queryClient: QueryClient,) => {
  const response = await fetch(API_IP + '/api/lights/off', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(ids)
  });
  const data = await response.json();
  InvalidateDevices(ids, queryClient);
  return data;
}

const UpdateColour = async (ids:number[], hex:string, queryClient: QueryClient,) => {
  const response = await fetch(API_IP + '/api/lights/setColour', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({ids: ids, hex:hex})
  });
  const data = await response.json();
  InvalidateDevices(ids, queryClient);
  return data;
}

const InvalidateDevices = async (ids:number[], queryClient: QueryClient,) => {
  ids.forEach(id => {
    queryClient.invalidateQueries({ queryKey: ['device', id] });
  });
}