## Volteric Cloud NodeJS Wrapper
Welcome to the home of the Volteric Cloud API NodeJS wrapper, our in-house development team maintains this for public use.

In order to get started, you need to install the `volteric-nodejs` package (`npm i volteric-nodejs`). 
To initialize a session, take a look below:

```js
const volteric_api = require('volteric-nodejs');
const volteric = new VoltericAPI("YOUR_API_ID", "YOUR_API_TOKEN");
```

Once the session has been initialized, you can use the `volteric` variable as you would with our [API](https://docs.volteric.cloud) making sure you remove the `/v1` from your request.
Feel free to reach out to us at **admin@tomas.systems** if you run into any problems.
