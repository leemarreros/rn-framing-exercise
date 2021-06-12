const rootUrl = 'http://localhost:5000';

export function getImageWithFrame(imageBase64: string, type: string, frameNumber: number): Promise<any> {
  const getFrameUrl = `${rootUrl}/getImageWithFrame?type=${type}&frameNumber=${frameNumber}`;
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
