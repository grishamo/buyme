import moment from 'moment';

const API_KEY  = "1dc5b0510d60c39a6f790dc46182f083";
const BASE_URL = "http://data.fixer.io/api/";
const REQUEST_URL = BASE_URL + "?access_key=" +  API_KEY;

const DEFAULT_OPTIONS = {
    base: "EUR",
    symbols: "ILS, USD, GBP"
};

// TODO: Cache rates to reduce Api requests (cost saving)
// TODO: Validate options parameter
function GetWeeklyRates(options) {
    return new Promise((resolve, reject) => {
        const allUrls = [];
        const urlParams = `?access_key=${API_KEY}&base=${options.base}&symbols=${options.symbols}`;

        // Build urls of past 7 days
        for (let i = 6; i >= 0; i--) {

            let dateString = moment().subtract(i, 'days').format("YYYY-MM-DD");
            let dateFormat = dateString.replace('/', '-');
            let url = BASE_URL + dateFormat + urlParams;

            allUrls.push(url);
        }


        Promise.all(allUrls.map(url =>
            fetch(url).then(resp => resp.json())
        ))
            .then(data => {
                return resolve(data);
            })
            .catch((err) => {
                return reject(err);
            });

    });
}


export default { GetWeeklyRates };


