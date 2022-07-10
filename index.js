import fetch from "node-fetch";

class VoltericAPI {
    sessionid;
    sessiontoken;
  
    constructor(id, token) {
        if(!(id && token)) {
            throw new Error("Missing session configuration.");
        } else {
            this.sessionid = id;
            this.sessiontoken = token;
        }
    }

    async validatesession() {
        const req = await fetch(`https://api.volteric.com/v1/authentication/session?sessionid=${this["sessionid"]}&sessiontoken=${this["sessiontoken"]}`).then(res => res.json()).catch(e => console.error(e));
      
        if (req.status !== 200) {
          throw new Error(`An error was thrown: (status code ${req.status} [${req.data}])`);
        } else {
          return {auth: `?sessionid=${this["sessionid"]}&sessiontoken=${this["sessiontoken"]}`, success: true};
        };
    }

    async get(url) {
        if(url.includes('?')) {
            throw new Error('Queries with parameters need to be sent as a POST request (.post()) using parameters.');
        } else {
            const sessionValidation = await this.validatesession();
            if(sessionValidation.success == true) {
                const req = await fetch(`https://api.volteric.com/v1${url}${sessionValidation.auth}`).then(res => res.json()).catch(e => console.error(e));
        
                if (req.status !== 200) {
                    throw new Error(`An error was thrown: (status code ${req.status} [${req.data}])`);
                } else {
                    return req.data;
                };
            }
        }
    }

    async post(url, parameters) {
        if(url.includes('?')) {
            throw new Error('Queries with parameters need to be sent as parameter option, not a query string.');
        } else {
            const sessionValidation = await this.validatesession();
            if(sessionValidation.success == true) {
                let queryParams = new URLSearchParams(parameters).toString();
                const req = await fetch(`https://api.volteric.com/v1${url}${sessionValidation.auth}&${queryParams}`, {method: "POST"}).then(res => res.json()).catch(e => console.error(e));
        
                if (req.status !== 200) {
                    throw new Error(`An error was thrown: (status code ${req.status} [${req.data}])`);
                } else {
                    return req.data;
                };
            }
        }
    }
}
