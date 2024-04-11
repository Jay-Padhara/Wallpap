import {Axios} from 'axios';

export const ImageApi = createAsyncThunk('ImageApi', async () => {
  const result = await Axios.get();
});
