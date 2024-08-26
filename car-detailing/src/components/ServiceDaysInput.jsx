import { useEffect, useState } from "react"
import CommonSelect from "./common/CommonSelect"

const DAYS = [
    {value: 1, label: "Mon"},
    {value: 2, label: "Tue"},
    {value: 3, label: "Wed"},
    {value: 4, label: "Thu"},
    {value: 5, label: "Fri"},
    {value: 6, label: "Sat"},
    {value: 7, label: "Sun"}
]

const ServiceDaysInput = ({onChange}) => {
    const [daysList, setDaysList] = useState([])

    const onAddNewDay = () => {
        console.log(daysList)
        setDaysList([...daysList, {day: 1, time: "12:00"}])
    }

    const updateTime = (index, newTime) => {
        daysList[index].time = newTime
        setDaysList([...daysList])
    }

    const uppdateDay = (index, newDay) => {
        daysList[index].day = newDay
        setDaysList([...daysList])
    }

    const removeServiceDay = (index) => {
        setDaysList(daysList.filter((_, i) => i !== index))
    }

    useEffect(() => {
        console.log(daysList)
        onChange({target: {
            name: "service_days",
            value: daysList,
            type: "ServiceDaysInput"
        }})
    }, [daysList]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <ul key="service_days_input">
                {daysList.map((d, index) => 
                    <li key={d.day + d.time + "_" + index}>
                        <CommonSelect key={d.day + d.time+"_select" + index} name="service_day" options={DAYS} onSelect={v => uppdateDay(index, v)} selectedValue={d.day}/>
                        <input key={d.day + d.time+"_day" + index}  type="time" value={d.time} onInput={e => updateTime(index, e.target.value)}></input>
                        <button key={d.day + d.time+"_button" + index} type="button" onClick={() => removeServiceDay(index)}>Remove</button>
                    </li>
                )}
            </ul>
            <button type="button" onClick={onAddNewDay}>Add day</button>
        </div>

    )
}

export default ServiceDaysInput