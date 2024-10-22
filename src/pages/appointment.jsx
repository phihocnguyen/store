import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../config/api";
import axios from "axios";
const Appointment = () => {
    const fileRef = useRef(null)
    const [imgs, setImgs] = useState([])
    const [schedule, setSchedule] = useState([])
    const currentDate = new Date();
    const daysInWeek = [];
    const dayOfWeek = currentDate.getDay();
    const offset = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek; 

    for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + offset + i);
        daysInWeek.push({ day: date.toLocaleDateString('vi-VN', { weekday: 'long' }), date: date });
    }
    const [active, setActive] = useState({0: format(new Date(daysInWeek[0].date), "dd/MM/yyyy")})
    const [activeTime, setActiveTime] = useState(0)
    const handleFiles = (e) => {
        setImgs([...e.target.files])
    }

    const getSchedule = useCallback(async (day) => {
        const response = await axiosInstance.get(`/working-schedule/2/${day}`)
        setSchedule(response.data)
    }, [])

    useEffect(() => {
        getSchedule('Thứ Hai')
    }, [getSchedule])  

    const handleDayClicked = (day, index) => {
        setActive({[index] : format(new Date(day.date), "dd/MM/yyyy")})
        getSchedule(day.day)        
    }
    let shifts = []
    for (let i = parseInt(schedule.startTime); i < parseInt(schedule.endTime); i++){
        shifts.push(i)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        if (!imgs.length !== 0) {
            for (const img of imgs){
                data.append('files', img)
            }
        }
        data.append('time', Object.values(activeTime)[0])
        data.append('date', Object.values(active)[0] )
        data.append('status', 'Pending')
        data.append('type', 'Online')
        data.append('note', 123)
        data.append('doctorId', 2)
        data.append('userId', 1)
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/appointment',
            data,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        console.log(response)
    }
    return (
        <div className="bg-[#F1F5F9]">
            <div className="w-[1200px] mx-auto flex">
                <div className="w-1/2">
                    <div className="bg-white rounded-md p-6 w-full">
                        <p className="text-[18px] font-bold text-customBlue">1. Ngày và giờ khám</p>
                        <div className="border border-[#B3B3B3] rounded-md mt-4 w-full">
                            <div className="flex justify-between p-2 bg-[#F2F4F7] rounded-md rounded-b-none border-b border-[#B3B3B3] py-2">
                                <p>Thứ 2</p>
                                <p>Thứ 3</p>
                                <p>Thứ 4</p>
                                <p>Thứ 5</p>
                                <p>Thứ 6</p>
                                <p>Thứ 7</p>
                            </div>
                            <div className="flex justify-between">
                                {daysInWeek.map((day, index) => {
                                    return (
                                        <div onClick={() => handleDayClicked(day, index) } key={index} className={`hover:bg-customBlue duration-150 cursor-pointer hover:text-white text-customBlue text-center p-4 ` + (Object.keys(active)[0] == index ? 'bg-customBlue text-white' : '') }>
                                            <p className="font-bold text-[18px]">{format(new Date(day.date), "dd")}</p>
                                            <p>{format(new Date(day.date), "MMM")}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            {
                                shifts.map((item ,index) => {
                                    return (
                                        <button onClick={() => setActiveTime({[index]: `${item}:00 - ${item+1}:00`})} key = {index} className={`border border-[#B3B3B3] font-bold text-[12px] p-1 rounded-md mr-2 mb-2 ` + (Object.keys(activeTime)[0] == index ? 'bg-customBlue text-white' : '')}>{item}:00 - {item+1}:00</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-md mt-6">
                        <p className="text-[18px] font-bold text-customBlue">2. Hồ sơ bệnh nhân</p>
                        <div>
                            <p className="my-4"><label htmlFor="note">Ghi chú:</label></p>

                            <textarea className="border border-[#B3B3B3] p-2 rounded-md" placeholder="Triệu chứng, thuốc đang dùng, tiền sử,..." id="note" name="note" rows="4" cols="50">
                        
                            </textarea>
                        </div>
                        <div>
                            <p className="my-4"><label htmlFor="note">Tệp tin đính kèm <span className="font-bold">[{imgs.length || 0} / 2]</span></label></p>

                            <div className="border border-dashed border-[#B3B3B3] p-2 rounded-md text-center cursor-pointer" onClick={() => fileRef.current.click()}>
                                <p><span className="text-customBlue font-bold">Chọn tập tin</span> hoặc kéo thả vào đây</p>
                                <input className="hidden" ref={fileRef} name ="file" id = "file" multiple type="file" onChange={e => handleFiles(e)}/>
                                <p className="text-[#B3B3B3]">.PNG .JPG tối đa 15mb</p>
                            </div>
                            <div className="flex mt-6">
                                {imgs.map((img, index) => {
                                    return (
                                        <div key={index} className="w-[100px] h-[100px] mr-4">
                                            <img className="w-full h-full object-cover rounded-md" src={URL.createObjectURL(img)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white border-md p-6 ml-12 h-fit ">
                    <p className="text-[18px] font-bold text-customBlue">3. Thông tin đặt khám</p>
                    <div className="py-4 mt-6 border-t border-b flex items-center">
                        <div className="w-[100px] h-[100px] rounded-full">
                            <img src="../../public/pictures_healthcare/doctor1.png"/>
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-bold">BS. CKII Nguyễn Văn A</p>
                            <p className="text-[14px]">Địa chỉ phòng mạch: 53 Phạm Hữu Chí, Phường 12, Quận 5, Hồ Chí Minh</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <p>Ngày khám:</p>
                            <p>{Object.values(active)[0]}</p>
                        </div>
                        <div className="flex justify-between my-2">
                            <p>Khung giờ:</p>
                            <p>{Object.values(activeTime)[0]}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Bệnh nhân:</p>
                            <p>Nguyễn Văn B</p>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)} className="mt-6 p-2 bg-customBlue text-center rounded-md text-white font-bold text-[18px] cursor-pointer"><button className="w-full" type="submit">Xác nhận</button></form>
                </div>
            </div>
        </div>
    )
}

export default Appointment