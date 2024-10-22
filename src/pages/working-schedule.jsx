import Header from "../components/header"
import Nav from "../components/Nav/nav"
import { IoTimeOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../config/api";
const WorkingSchedule = () => {
    const item = [
        { label: 'Dashboard', icon: "src/assets/das.svg", link: "/mainpage" },
        { label: 'Appointments', icon: "src/assets/app.svg", link: "/appoiments" },
        { label: 'Patients', icon: "src/assets/pat.svg", link: "/patients" },
        { label: 'Messages', icon: "src/assets/mes.svg", link: "/messages" },
        { label: 'Report', icon: "src/assets/rep.svg", link: "/report" },
        { label: 'Working Schedule', icon: "src/assets/repb.svg", active: true, link: "/working-schedule" },
        { label: 'Settings', icon: "src/assets/set.svg", link: "/settings" },
    ]
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [schedule, setSchedule] = useState([])
    const handleFrom = (event, day) => {
        setFrom(prevState => ({...prevState, [day]: event.target.value}))
    };
    const handleTo = (event, day) => {
        setTo(prevState => ({...prevState, [day]: event.target.value}))

    };
    const handleSubmit = async () => {
        const dayChanged = []
        for (let i = 0; i < Object.keys(from).length; i++){
            dayChanged.push({
                day: Object.keys(from)[i],
                from: Object.values(from)[i]
            })
        }
        for (let i = 0; i < Object.keys(to).length; i++){
            dayChanged.push({
                day: Object.keys(to)[i],
                to: Object.values(to)[i]
            })
        }
        const response = await axiosInstance.patch('/working-schedule/2', connectDay(dayChanged))

        console.log(response)
    }

    const connectDay = (arr) => {
            const output = []
            arr.forEach(item => {

            let existingEntry = output.find(entry => entry.day === item.day);
            
            if (!existingEntry) {
                existingEntry = { day: item.day };
                output.push(existingEntry);
            }
            
            if (item.from !== undefined) {
                existingEntry.from = item.from;
            }
            if (item.to !== undefined) {
                existingEntry.to = item.to;
            }
            });
            return output
    }
    const getSchedule = useCallback(async () => {
        const response = await axiosInstance.get('/working-schedule/2')
        setSchedule(response.data)
    }, [])
    useEffect(() => {
        getSchedule()
    }, [getSchedule])
    const time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    return (
        <div className="w-screen h-screen">
            <div className='w-full h-[7.5%] flex items-center border-b border-gray-300'>
                <Header />
            </div>
            <div className='grid grid-cols-6 h-[92.5%]'>
                <div className='border-r border-gray-300 col-span-1 flex justify-center items-start'>
                    <Nav items={item} />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-[32px]">Settings</h3>
                    <div className="mt-8 flex flex-wrap w-[1200px] justify-center">
                        {schedule.map((item, index) => {
                            return (
                                    <div key={index} className="ml-4 mt-4">
                                <div className="w-[300px] border border-[#B3B3B3] rounded-md">
                                    <div className="flex justify-between p-4 border-b border-[#B3B3B3]">
                                        <div className="flex items-center">
                                            <IoTimeOutline className="mr-4"/>
                                            <span>Date and time</span>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer"/>
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 text-sm font-medium text-black">Available</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <p className="mr-8">Day</p>
                                            <div className="w-[60%] rounded-md border border-[#B3B3B3] p-3">
                                                {item.day}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between my-4">
                                            <p className="mr-8">From</p>
                                            <div className="w-[60%]">
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={from[item.day] || item.startTime}
                                                        name = {item.day}
                                                        label="From"
                                                        onChange={(e) => handleFrom(e, item.day)}
                                                        >
                                                        {time.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>) }
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="mr-8">To</p>
                                            <div className="w-[60%]">
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">To</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={to[item.day] || item.endTime}
                                                        name = {item.day}
                                                        label="To"
                                                        onChange={(e) => handleTo(e,item.day)}
                                                        >
                                                        {time.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>) }
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="w-[1200px]">
                        <button onClick={handleSubmit} className="p-4 bg-black text-white font-bold rounded-md m-4 ml-auto w-[150px] block">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WorkingSchedule