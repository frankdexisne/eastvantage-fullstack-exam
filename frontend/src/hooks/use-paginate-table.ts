import api from "../api";
import { useCallback, useEffect, useReducer } from "react";

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface State<T> {
  page: number;
  pageSize: number;
  data: T[];
  total: number;
  last_page: number;
  links: Link[];
  loading: boolean;
  error: string | null;
}

type Action<T> =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | {
      type: "SET_DATA";
      payload: { data: T[]; total: number; last_page: number; links: Link[] };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
        last_page: action.payload.last_page,
        links: action.payload.links,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const usePaginateTable = <T>(
  endpoint: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const [state, dispatch] = useReducer(reducer<T>, {
    page: page,
    pageSize: pageSize,
    data: [],
    total: 0,
    last_page: 1,
    links: [],
    loading: false,
    error: null,
  });

  const fetchingData = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    api
      .get(endpoint, {
        params: {
          page: state.page,
          pageSize: state.pageSize,
        },
      })
      .then((res) => {
        const response = res.data as {
          data: T[];
          total: number;
          last_page: number;
          links: Link[];
        };

        dispatch({
          type: "SET_DATA",
          payload: {
            data: response.data,
            total: response.total,
            last_page: response.last_page,
            links: response.links.filter(
              (_link: Link, index: number) => ![0, 5].includes(index)
            ),
          },
        });
      });
  }, [endpoint, state.page, state.pageSize]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return {
    ...state,
    setPage: (page: number) => dispatch({ type: "SET_PAGE", payload: page }),
    setPageSize: (size: number) =>
      dispatch({ type: "SET_PAGE_SIZE", payload: size }),
    refetch: fetchingData,
  };
};

export default usePaginateTable;
