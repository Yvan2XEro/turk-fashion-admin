const initialState = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
};


type DataTableState = typeof initialState

const PAGE_CHANGED = 'PAGE_CHANGED'
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED'
const PAGE_SORT_CHANGED = 'PAGE_SORT_CHANGED'
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED'
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED'

type DataTableAction = {
    type: 'PAGE_CHANGED' | 'PAGE_SIZE_CHANGED' | 'PAGE_SORT_CHANGED' | 'PAGE_FILTER_CHANGED' | 'TOTAL_COUNT_CHANGED'
    payload: number
}

const dataTableReducer = (state: DataTableState, { type, payload }: DataTableAction): DataTableState => {
    switch (type) {
        case PAGE_CHANGED:
            return {
                ...state,
                pageIndex: payload,
            };
        case PAGE_SIZE_CHANGED:
            return {
                ...state,
                pageSize: payload,
            };
        case TOTAL_COUNT_CHANGED:
            return {
                ...state,
                totalCount: payload,
            };
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
};

export { dataTableReducer, initialState, PAGE_CHANGED, PAGE_SIZE_CHANGED, PAGE_SORT_CHANGED, PAGE_FILTER_CHANGED, TOTAL_COUNT_CHANGED }