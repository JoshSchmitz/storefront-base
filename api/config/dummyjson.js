import { writeJsonFile } from 'write-json-file';

const dummyJson = async () => {
  try {
    await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Write the JSON data to a file
        writeJsonFile('api/config/productdata.json', data);
      })
      .then(console.log('json file created successfully!'));
  } catch (error) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default dummyJson;
