const app = require("../server");
const supertest = require("supertest");
const profilePic = require("../utils/ImagePlaceholder")
const hash = require("../../../framingCompany/src/utils/Hash");

test("GET /getImageWithFrame", async () => {
  const data = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base: profilePic.default.profilePic64,
    }),
  }
  const type = 'Round'
  const frameNumber = 1
  const request = `/getImageWithFrame?type=${type}&frameNumber=${frameNumber}`;
  await supertest(app)
    .post(request)
    .send({...data})
    .expect(200)
    .then((response) => {
      const hashResult = hash.default(response.body.response.replace('data:image/png;base64',''))
      expect(hashResult).toBe(String(-1203912086))
    });
});
