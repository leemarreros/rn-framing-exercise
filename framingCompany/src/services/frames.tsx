import {responseFrameI, ShapeType} from '../../types/types';

const rootUrl = 'http://localhost:5000';

export function getImageWithFrame(
  imageBase64: string,
  type: ShapeType,
  frameNumber: number,
): Promise<responseFrameI> {
  const request = `getImageWithFrame?type=${type}&frameNumber=${frameNumber}`;

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
    return data.json();
  });
}
