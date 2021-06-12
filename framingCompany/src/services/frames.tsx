const getFrameUrl = 'http://localhost:5000/getSquareframes';

export function getImageWithFrame(imageBase64: string): Promise<any> {
  return fetch(getFrameUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base: imageBase64
    }),
  })
    .then(data => data.json())
    .catch(error => console.log('error service', error));
}
