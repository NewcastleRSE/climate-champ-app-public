# Carbon calculations
1. The main module file is `carbon_algorithm.js`. The exported functions are at the end of the file.
2. The calculation data is in the files `carbon_data.json` and `civic_data.json`. The data in these files can be changed and the algorithm will work without changing the code.
3. The main algorithm functions `total_kgCO2` and `total_civic_behaviour` expect a JS object that matches the schema in `scores_schema.json`.
4. The scoring function will test the scores input against the schema. Any failures will be logged to console but exceptions are disabled presently.
5. The algorithm expects a data object `user_settings` to be set up correctly - see the top of `carbon_algorithm.js` for this object, which holds the vehicle, heating and electrical consumption information. This oculd easily be changed to reference an external object.
6. No formal test framework is used presently. A simple JS file implementing some test cases is included, which match the test cases in the definition spreadsheet (this is WIP). Failure modes (e.g. badly-formed schema) are not tested.
7. Changing the test schema will involve changing the data-to-function map in the `scoring_map` object. The new scoring functions would also need to be added to the calculation. This isn't expected to be necessary.
8. The node module [avj](https://ajv.js.org/) is needed for schema validation. Install using `npm install avj` or similar for whatever package manager is being used.