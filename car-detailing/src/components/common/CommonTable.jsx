import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const CommonTable = ({ columns, rows }) => {
    const paginationModel = { page: 0, pageSize: 5 }; //TODO: co z paginacja

    return (
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0, minWidth: 650 }}
          />
        </Paper>
      );
}

export default CommonTable;