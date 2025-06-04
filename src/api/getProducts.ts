import api from "./axios"

type GetProductsParams = {
    pageParam: number;
    sortOrder?: 'asc' | 'desc';
    searchTerm?: string;
}

export const getProducts = async ({ pageParam = 1, sortOrder, searchTerm }: GetProductsParams) => {
    let baseUrl = searchTerm
        ? `/api/products/search?query=${encodeURIComponent(searchTerm)}`
        : `/api/products?page=${pageParam}&limit=10`;

    // If using search, we also need pagination and optionally sorting
    if (searchTerm) {
        baseUrl += `&page=${pageParam}&limit=10`;
        if (sortOrder) {
            baseUrl += `&sortBy=price&order=${sortOrder}`;
        }
    } else {
        if (sortOrder) {
            baseUrl += `&sortBy=price&order=${sortOrder}`;
        }
    }

    const response = await api.get(baseUrl);
    return response.data;
}
