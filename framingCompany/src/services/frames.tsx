import { responseFrameI } from '../../types/types';
import Hashing from '../utils/Hash';

const rootUrl = 'http://192.168.100.2:5000';
const cache: {string: responseFrameI} | any = {};

export function getImageWithFrame(imageBase64: string, type: string, frameNumber: number): Promise<responseFrameI> {
  const request = `getImageWithFrame?type=${type}&frameNumber=${frameNumber}`;

  const hashKey = Hashing(`${request}${imageBase64}`);
  if (cache[hashKey]) {
    return cache[hashKey]
  }
  
  const getFrameUrl = `${rootUrl}/${request}`;
  return fetch(getFrameUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base: imageBase64
    }),
  })
    .then(data => {
      let res = data.json()
      cache[hashKey] = res;
      return res;
    })
    .catch((error: Error) => console.log('error service', error));
}
