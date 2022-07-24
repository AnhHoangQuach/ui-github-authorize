import { client } from './axios';
import { SystemRecordType } from 'types/System';

const fetchRecords = ({ resultId }: { resultId: string }): Promise<SystemRecordType> =>
  client.get(`/api/v1/results/${resultId}`);

export default {
  fetchRecords,
};
