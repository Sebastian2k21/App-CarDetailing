import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const DetailerAnalytics = () => {
    return (
        <div>
            <form>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date from" />
                <DatePicker label="DateTo" />
                </LocalizationProvider>
                <button>Filter</button>
            </form>
        </div>
    )
}

export default DetailerAnalytics