export default async () => {
    const res = await fetch("/products.json");
    if (!res.ok) {
        throw new Error(res.status === 404 ? "Products not found!" : `${res.status} (${res.statusText})`);
    }

    try {
        return await res.json();
    } catch (e) {
        throw new Error("Invalid data format!")
    }
};
