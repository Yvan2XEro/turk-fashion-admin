interface Paginated<T> {
    data: T[],
    meta: {
        count: number
    }
}