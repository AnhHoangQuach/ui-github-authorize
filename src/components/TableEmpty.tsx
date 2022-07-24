import { TableCell, TableRow } from '@mui/material';

type TableEmptyType = {
  data?: any[];
};

const TableEmpty = ({ data }: TableEmptyType) => {
  return data?.length ? (
    <></>
  ) : (
    <TableRow>
      <TableCell colSpan={100} className='text-center py-3'>
        No Data
      </TableCell>
    </TableRow>
  );
};

export default TableEmpty;
