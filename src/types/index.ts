interface AppContextType {
    isLoading: boolean,
    list: ListItem[],
    fetchData: (pageNumber: number, recordsPerPage: number) => void
}

interface ListItem {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

type RootStackParamList = {
    Home: undefined;
    Add: undefined;
    Read: {
        id: number;
        albumId: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    };
};

export type {
    ListItem,
    AppContextType,
    RootStackParamList
}