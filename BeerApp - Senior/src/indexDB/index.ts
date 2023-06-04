import { get, set } from 'idb-keyval';
import { Beer } from '../types';





const getBeerFromIdb = (setBeerList: (beerList: Beer[]) => void) => get('savedBeers').then((savedBeers: [Beer]) => {
    if (savedBeers && savedBeers.length > 0) {
        setBeerList(savedBeers);
    }
});

const setBeerToIdb = (beerList: Beer[]) => {
    set('savedBeers', beerList);
}

const addBeerToSavedList = (singleBeer: Beer, beerList: Beer[], setBeerList: (beerList: Beer[]) => void) => {
    setBeerList([singleBeer, ...beerList]);
}

const removeBeerFromSavedList = (beerId: string, beerList: Beer[], setBeerList: (beerList: Beer[]) => void) => {
    const beerIndex = beerList.findIndex(beer => beer.id === beerId);
    if (beerIndex !== -1) {
        const temp = [...beerList];
        temp.splice(beerIndex, 1);
        setBeerList(temp);
    }
}

const toogleBeerInSavedList = (beer: Beer, beerList: Beer[], setBeerList: (beerList: Beer[]) => void) => {
    if (!beerList.some(item => item.id === beer.id)) {
        addBeerToSavedList(beer, beerList, setBeerList);
    } else {
        removeBeerFromSavedList(beer.id, beerList, setBeerList);
    }
}

const setCurrentBeerName = (name: string) => {
    set('beerName', name);
}

const getCurrentBeerName = (setName: (name: string) => void) => {
    get('beerName').then((beerName => setName(beerName)));
}

export { getBeerFromIdb, removeBeerFromSavedList, toogleBeerInSavedList, setBeerToIdb, setCurrentBeerName, getCurrentBeerName }