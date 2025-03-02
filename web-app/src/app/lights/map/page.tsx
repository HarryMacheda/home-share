import { Box } from "@mui/material";


type Room = {
    title:string;
    x:number;
    y:number;
    width:number;
    height:number
}



export default function LightMap() { 

    const areas:Room[] = [
        {title:"Izzy's Room", x:0, y:0, width:330, height:390},
        {title:"Walk in robe",x:0, y:390, width:190, height:300},
        {title:"Ensuite",x:330, y:0, width:132, height:285},
        {title:"Bathroom",x:462, y:0, width:132, height:285},
        {title:"Toilet",x:594, y:0, width:80, height:285},
        {title:"Hallway",x:330, y:285, width:585, height:105},
        {title:"Cynan's room",x:674, y:0, width:350, height:285},
        {title:"Jerry's room",x:190, y:390, width:320, height:300},
        {title:"Harry's room",x:510, y:390, width:320, height:300},
    ]
    return (
        <Box
            padding={2}
            sx={{
                position: "relative",
                display: "inline-block",
            }}
        >
          {areas.map((area, index) => (
            <MapRoom
              key={index}
              x={area.x}
              y={area.y}
              width={area.width}
              height={area.height}
              title={area.title}           
            />
          ))}
        </Box>
    )
}


const MapRoom:React.FC<Room> = ({title, x, y, width, height}) => {


    return (
        <Box
            sx={{
                position: "absolute",
                boxSizing: "border-box",
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: "3px solid black",
                '&:hover': {
                    backgroundColor: "rgba(68, 68, 68, 0.5)",
                },
                display: "flex",
                alignItems: "center", 
                justifyContent: "center",
            }}
        >
            {title}
        </Box>
    )
}