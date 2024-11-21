import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useApiClient } from '../../api/ApiClientContext';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dateToIsoString, getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from '../../utils/TimeUtils';
import dayjs from 'dayjs';


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];


const DetailerAnalytics = () => {
    const [analytics, setAnalytics] = useState(null)
    const [dateFrom, setDateFrom] = useState(dayjs().startOf('month'))
    const [dateTo, setDateTo] = useState(dayjs().endOf('month'))

    const api = useApiClient()

    const getAnalytics = async (e) => {
        e.preventDefault()

        const data = await api.getDetailerAnalytics(dateToIsoString(dateFrom), dateToIsoString(dateTo))
        setAnalytics(data)
    }

    return (
        <div>
            <form onSubmit={getAnalytics}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date from" value={dateFrom} onChange={e => setDateFrom(e)} />
                <DatePicker label="DateTo" value={dateTo} onChange={e => setDateTo(e)} />
                </LocalizationProvider>
                <button type="submit">Filter</button>
            </form>

            {analytics != null &&    
            <div> 
                    <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analytics.orders} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                    <Pie
                        data={analytics.employees}
                        dataKey="count"
                        nameKey="employee"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ employee, count }) => `${employee}: ${count}`}
                    >
                        {analytics.employees.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name, entry) => [`${value}`, `${entry.payload.employee}`]} />
                    </PieChart>
                </ResponsiveContainer>     

                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                    <Pie
                        data={analytics.clients}
                        dataKey="count"
                        nameKey="client"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ client, count }) => `${client}: ${count}`} 
                    >
                        {analytics.clients.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name, entry) => [`${value}`, `${entry.payload.client}`]} />
                    </PieChart>
                </ResponsiveContainer>  

                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                    <Pie
                        data={analytics.services}
                        dataKey="view_count"
                        nameKey="service"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ service, view_count }) => `${service}: ${view_count}`} 
                    >
                        {analytics.services.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name, entry) => [`${value}`, `${entry.payload.service}`]} />
                    </PieChart>
                </ResponsiveContainer>  
            </div> }
        </div>
    )
}

export default DetailerAnalytics