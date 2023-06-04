import { getBeer } from '../../api';
import { setCurrentBeerName } from '../../indexDB';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
      setCurrentBeerName(response.data.name);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
