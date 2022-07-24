import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import { Spinner, TableEmpty } from 'components';
import { useQuery } from 'react-query';
import { systemService } from 'services';
import { useParams } from 'react-router-dom';

const Home = () => {
  const params = useParams();

  const resultId = localStorage.getItem('result_id') ?? (params.resultId as string);
  window.history.pushState('resultId', '', `/results/${resultId}`);

  const { data, isFetching } = useQuery(
    ['systemService.fetchRecords', resultId],
    () => systemService.fetchRecords({ resultId }),
    {
      keepPreviousData: true,
    },
  );

  return (
    <>
      {JSON.stringify(data?.metadata as any)}
      <Grid container>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Spinner loading={isFetching}>
              <Table>
                <TableHead>
                  <TableRow>
                    {data?.columns.map((column) => (
                      <TableCell>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.records.map((item, index) => (
                    <TableRow key={index}>
                      {data?.columns.map((column) => (
                        <TableCell>{item[`${column}`]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableEmpty data={data?.records} />
                </TableBody>
              </Table>
            </Spinner>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
