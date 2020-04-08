export default function(o) {
    return `?${Object.keys(o).map(k => `${k}=${o[k]}`).join('&')}`;
}
