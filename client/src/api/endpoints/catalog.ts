import { axiosClient } from '../axiosClient';

export async function fetchCatalog() {
  return axiosClient.get('/catalog');
}
