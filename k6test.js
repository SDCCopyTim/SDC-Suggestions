import http from 'k6/http'
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 100},
    { duration: '30s', target: 200},
    { duration: '1m', target: 300},
    { duration: '2m', target: 400},
    { duration: '3m', target: 500},
    { duration: '4m', target: 600},
    { duration: '5m', target: 700},
    { duration: '6m', target: 800},
    { duration: '5m', target: 700},
    { duration: '4m', target: 600},
    { duration: '3m', target: 500},
    { duration: '2m', target: 400},
    { duration: '1m', target: 300},
    { duration: '30s', target: 200},
    { duration: '15s', target: 100},
  ],
};

const randomNumber = () => Math.floor(Math.random() * 10000000) + 1;

export default function () {
  http.get(`http://localhost:3005/api/camp/${randomNumber()}`);
  sleep(1);
}
