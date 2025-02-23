import { writeJsonFile } from 'write-json-file';

const dummyJson = async () => {
  try {
    fetch('https://dummyjson.com/carts?limit=10&skip=20')
      .then((res) => res.json())
      .then((data) => {
        // Write the JSON data to a file
        writeJsonFile('api/config/cartdata.json', data);
      })
      .then(console.log('json file created successfully!'));
  } catch (error) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default dummyJson;
