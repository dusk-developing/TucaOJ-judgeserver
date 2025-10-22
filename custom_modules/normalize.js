function normalize(content) {
    if (typeof content !== "string") return content;
    return content.replace(/\r\n/g, "\n").replace(/\r/g, "");
}

export default { normalize };