interface IStorage {
    key: string;
    type: string;
}
const useStorage = ({
    key,
    type,
}: IStorage): [string, (value: string) => void] => {
    const storage = type === "session" ? sessionStorage : localStorage;

    return [
        JSON.parse(storage.getItem(key) || "{}"),
        (value) => storage.setItem(key, JSON.stringify(value)),
    ];
};

export default useStorage;
