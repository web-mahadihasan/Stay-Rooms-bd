import React, { useState } from 'react';
import { Map, Marker } from "pigeon-maps"
import { FaLocationDot } from 'react-icons/fa6';


const LeafletMaps = () => {
    const [hue, setHue] = useState(0)
    const color = `hsl(218deg 94% 61%)`
    // 25.749402250789693, 89.26108640089947
    return (
       <div className='h-full w-full rounded-md'>
            <Map defaultCenter={[25.749402250789693, 89.26108640089947]} defaultZoom={11}>
            <Marker 
                width={50}
                anchor={[25.749402250789693, 89.26108640089947]} 
                color={color} 
                onClick={() => setHue(hue + 20)} 
            />
            <Marker 
                width={50}
                anchor={[25.749402250789693, 89.26108640089947]} 
                color={color} 
                onClick={() => setHue(hue + 20)} 
            >
                {/* <FaLocationDot className='text-red-500'/> */}
            </Marker>
        </Map>
       </div>
    );
};

export default LeafletMaps;
