import axios from "axios";
import { fetchMoviePayload } from "../types";

const BASE_URL = `https://api.themoviedb.org/3`;

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchMovieFromApi = async ({ url, params }: fetchMoviePayload) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
