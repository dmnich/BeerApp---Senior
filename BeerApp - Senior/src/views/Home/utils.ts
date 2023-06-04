import { getBeerList, getBeerMetaData, getRandomBeerList } from '../../api';
import { ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetaData = (setItemsCount: (itemsCount: number) => void, params?: ApiParams) => {
  (async () => {
    try {
      const { data } = await getBeerMetaData(params);
      setItemsCount(data.total);
    } catch (error) {
      handle(error);
    }
  })();
}

const fetchBeerList = (setData: (data: Array<Beer>) => void, params?: ApiParams) => {
  (async () => {
    try {
      const { data } = await getBeerList(params);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchBeerList, fetchMetaData };
