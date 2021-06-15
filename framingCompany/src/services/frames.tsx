import {responseFrameI, ShapeType} from '../../types/types';
import Hashing from '../utils/Hash';

const rootUrl = 'http://localhost:5000';
const cache: {string: responseFrameI} | any = {};

export function getImageWithFrame(
  imageBase64: string,
  type: ShapeType,
  frameNumber: number,
): Promise<responseFrameI> {
  const request = `getImageWithFrame?type=${type}&frameNumber=${frameNumber}`;

  const hashKey = Hashing(`${request}${imageBase64}`);
  if (cache[hashKey]) {
    return cache[hashKey];
  }
  const getFrameUrl = `${rootUrl}/${request}`;
  return fetch(getFrameUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base: imageBase64,
    }),
  }).then(data => {
    if (data === undefined) {
      throw new Error("No Response");
      
    }
    let res = data.json();
    cache[hashKey] = res;
    return res;
  });
}
