import { getToken } from './tokenService';

const BASE_URL = 'https://react-app-mastermind.herokuapp.com/api/scores';


export function fetchScoreData() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    }
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

export function addScoreData(score) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      body: JSON.stringify(score)
    };
    return fetch(BASE_URL, options).then(res => res.json());
}