let result = {data: 'mockDatabase64'};
export default {
  openPicker: jest.fn().mockImplementation(() => Promise.resolve(result)),
};
