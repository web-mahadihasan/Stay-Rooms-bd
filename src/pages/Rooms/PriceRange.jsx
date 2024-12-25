import { useState } from "react";

const PriceRange = ({setPriceRange}) => {
    const range = [500, 1000, 1500, 2000, 3000]; 
    const sliderRange = [0, 25, 50, 75, 100]; 
    
    const [value, setValue] = useState(range[1]); 

    
    const findNearestBreakpoint = (value) => {
        return sliderRange.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
    };
    
    const handleSliderChange = (event) => {
        const newValue = Number(event.target.value);
        const nearestBreakpointIndex = findNearestBreakpoint(newValue);
        setValue(range[sliderRange.indexOf(nearestBreakpointIndex)]);
    };

    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const clickPosition = ((event.clientX - slider.left) / slider.width) * 100;
        const nearestBreakpointIndex = findNearestBreakpoint(clickPosition);
        setValue(range[sliderRange.indexOf(nearestBreakpointIndex)]);
        setPriceRange(value)
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className="relative w-full h-3 bg-gray-300 rounded-full cursor-pointer"
                onClick={handleClick}
            >
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderRange[range.indexOf(value)]}
                    onChange={handleSliderChange}
                    className="absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
                />
                <div
                    className="absolute top-0 h-3 bg-[#108476] rounded-full"
                    style={{
                        width: `${sliderRange[range.indexOf(value)]}%`,
                    }}
                />
                <div
                    className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                    style={{
                        left: `${sliderRange[range.indexOf(value)]}%`,
                    }}
                />
                {/* Breakpoint markers */}
                {sliderRange.map((point, index) => (
                    <div
                        key={index}
                        className="absolute top-[50%] w-[10px] h-[10px] transform -translate-x-1/2 translate-y-[-50%] bg-white rounded-full border border-gray-500"
                        style={{
                            left: `${point}%`,
                        }}
                    />
                ))}
            </div>

            {/* Display the custom range */}
            <div className="flex justify-between w-full mt-2">
                {range.map((point, index) => (
                    <span key={index} className="text-sm text-gray-700">{point}</span>
                ))}
            </div>
        </div>
    );
};

export default PriceRange;
