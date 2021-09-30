import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { Dispatch } from "redux";
import { dajPortfel, dajListeObiektowPortfela, dajListeElementowPortfela, wczytajPortfel, wczytajListeObiektowPortfela, wczytajListeElementowPortfela, bladPortfel } from './actions';
import Portfel from '../models/Portfel';
import axios, { AxiosError } from 'axios';
import ObiektPortfela from '../models/ObiektPortfela';
import ElementPortfela from '../models/ElementPortfela';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://localhost:44353/api';

//const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: string;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${API_ROOT}${url}`, body)
};

export const PortfelApi = {
  dajPortfel: (id: Number) => async (dispatch: Dispatch) => {
    dispatch(wczytajPortfel());
    await axios.get(`${API_ROOT}${'/Portfel'}`, { params: { id } })
      .then((response: any):void => { 
        dispatch(dajPortfel(response.data.data as Portfel)) 
      })
      .catch((err: AxiosError):void => {
        dispatch(bladPortfel(err.message));
      });
  },

  dajListeObiektowPortfela: (id: Number) =>  async (dispatch: Dispatch) => {
    dispatch(wczytajListeObiektowPortfela());
    await axios.get(`${API_ROOT}${'/Portfel/DajObiektyPortfela'}`, { params: { id } })
      .then((response: any):void => { 
        dispatch(dajListeObiektowPortfela(response.data.data as ObiektPortfela[])) 
      })
      .catch((err: AxiosError):void => {
        dispatch(bladPortfel(err.message));
      });
  },

  dajListeElementowPortfela: (index: number, portfelId: number, obiektPortfelaId: number, dataOd: Date, dataDo: Date) => async (dispatch: Dispatch) => {
    dispatch(wczytajListeElementowPortfela(index));
    await axios.get(`${API_ROOT}${'/Portfel/DajListeElementowPortfela'}`, { params: { portfelId: portfelId, obiektPortfelaId: obiektPortfelaId , dataOd: dataOd, dataDo: dataDo } })
      .then((response: any):void => { 
        dispatch(dajListeElementowPortfela(index, response.data.data as ElementPortfela[])); 
      })
      .catch((err: AxiosError):void => {
        dispatch(bladPortfel(err.message));
      });
  }};

export const Main = {
  dajMenu: () => requests.get('/Menu')
};

export const Token = { setToken: (_token: string) => { token = _token; } };

