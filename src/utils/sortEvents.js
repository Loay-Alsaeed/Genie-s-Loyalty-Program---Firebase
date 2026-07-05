export const sortEventsBySerial = (list) => {
    return [...list].sort((a, b) => {
        const sa = typeof a.serial === "number" ? a.serial : Number.MAX_SAFE_INTEGER;
        const sb = typeof b.serial === "number" ? b.serial : Number.MAX_SAFE_INTEGER;
        if (sa !== sb) return sa - sb;
        return (a.dateTime || "").localeCompare(b.dateTime || "");
    });
};
