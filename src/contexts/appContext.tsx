import React, {useState, createContext, PropsWithChildren} from 'react';
import {AppContextType, ListItem} from '../types';

export const AppContext = createContext<AppContextType>({
  isLoading: false,
  list: [],
  fetchData: () => {},
});

const AppProvider = ({children}: PropsWithChildren): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<ListItem[]>([]);

  const fetchData = (
    pageNumber: number = 0,
    recordsPerPage: number = 5,
  ): void => {
    setIsLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${
        pageNumber + 1
      }&_limit=${recordsPerPage}`,
    )
      .then(response => response.json())
      .then(response => {
        setList(list.concat(response));
      });
  };

  const returnValue: AppContextType = {
    isLoading,
    list,
    fetchData,
  };

  return (
    <AppContext.Provider value={returnValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
