import { useState } from "react";
import {  LiaSortNumericDownSolid, LiaSortNumericUpAltSolid } from "react-icons/lia";
import { useLocation } from "react-router";
import Select from 'react-select'

const RoomAsideTool = () => {
    const [searchText, setSearchText] = useState("")
    const {pathname} = useLocation()
    const [selectedValue, setSelectedValue] = useState(null);

    const options = [
        { value: "asc", label: "Sort by Price Ascending" },
        { value: "dsc", label: "Sort by price Descending" },
      ];
      const optionOnChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
      };
    return (
        <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${pathname ===  "/all-visa" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-16" : "xl:my-0 xl:grid-cols-1"}`}>
            <div className="p-6 rounded w-full bg-base-100">
                <h3 className="text-lg font-medium  text-secondary-black">Search by Title</h3>
                <div className="divider my-3"></div>
                <div className="relative my-2">
                    <input onChange={(e) =>  setSearchText(e.target.value)}
                    id="search" type="search" name="search" placeholder="Search here" aria-label="Search content"
                    className="peer relative h-12 w-full rounded border border-slate-200 px-4 pr-12 text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary/50 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" aria-label="Search icon"
                    role="graphics-symbol">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <button className="px-5 mt-4 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wide">Search </button>
            </div>
            <div className="p-6 lg:my-0 lg:flex-1 bg-base-100">
                <h3 className="text-lg font-medium  text-secondary-black">Filter by Room Availablity</h3>
                <div className="divider my-3"></div>
                <div>
                <div className={` text-lg ${pathname ===  "/all-visa"? "flex flex-wrap": "flex gap-1 flex-wrap xl:flex-col xl:flex-nowrap"}`}>
                    <div className="cursor-pointer my-4 space-y-4">
                        <label className="flex gap-2 items-center">
                            <input type="checkbox" className="checkbox checkbox-info" />
                            <span className="label-text">Available Room</span>
                        </label>
                        <label className="flex gap-2 items-center">
                            <input type="checkbox" className="checkbox checkbox-info" />
                            <span className="label-text">Unavailable Room</span>
                        </label>
                    </div>
                </div>
                </div>
            </div>
            <div className="p-6 my-4 lg:my-0 lg:flex-1 bg-base-100">
                <div>
                <label className="block text-lg font-medium  text-secondary-black my-2">
                  Sort By Price/Rating
                </label>
                <div className="divider my-3"></div>
                <Select
                  options={options}
                  name="visaType"
                  onChange={optionOnChange}
                  placeholder="Select a Sort Type"
                />
              </div>
            </div>
        </div>
    );
};

export default RoomAsideTool;