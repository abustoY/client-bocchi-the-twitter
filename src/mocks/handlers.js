import { http, HttpResponse } from 'msw'

const apiHostUrl = process.env.VUE_APP_API_HOST_URL;

export const handlers = [
    http.get(`${apiHostUrl}/api/tweets`, () => {
        const tweets = [];

        const baseName = 'mock';
        const baseText = 'Tweet';
        const baseDate = '2024-06-01';

        for (let i = 1; i <= 15; i++) {
            tweets.push({
                id: i,
                name: `${baseName}${i}`,
                text: `${baseText} ${i}`,
                created: baseDate
            });
        }

        return HttpResponse.json(
            tweets
        );
    }),
    http.get(`${apiHostUrl}/api/tweets/user`, () => {
        const tweets = [];

        const name = 'mock1'
        const baseText = 'Tweet';
        const baseDate = '2024-06-01';

        for (let i = 1; i <= 15; i++) {
            tweets.push({
                id: i,
                name: name,
                text: `${baseText} ${i}`,
                created: baseDate
            });
        }



        return HttpResponse.json(
            tweets
        );
    }),
    http.get(`${apiHostUrl}/api/authentication/status`, () => {
        return HttpResponse.text("true");
    }),
    
];
