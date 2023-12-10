const icon = 
`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<circle cx="10" cy="10" r="8" stroke="#093c59" stroke-width="3" fill="#4bbbfc" />
</svg>`;

const iconUserLocation = L.divIcon({
    html: icon,
    className: "h-20",
    iconSize: [10,10],
    iconAnchor: [11,11],
})

export default iconUserLocation