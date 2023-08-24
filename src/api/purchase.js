import { PURCHASE_URL } from '../config';

export const getPurchaseData = async() => {
  try {
    const resp = await fetch(PURCHASE_URL);
    const data = await resp.json();

    return data;
  } catch(err) {
    console.error(err);
    return [];
  }
}
