# GIIS city-tour frontend
GIIS, Group 3, Universität Münster, Winter-term 2023-2024
Okemwa, Rump, Niebl

related: [backend](https://github.com/niebl/giis_citytour_backend)

## Description
This is the frontend of an application intended for GPS-guided city tours on a mobile device. It was developed as coursework for the 'Geoinformation in Society'-course at the University Münster in the winter term of 2023.

This application requires a working [backend](https://github.com/niebl/giis_citytour_backend) to run.

## Installation
clone the repository
```bash
git clone https://github.com/niebl/giis_citytour_frontend.git
```
copy the `.env_example` file into `./src` and rename it to `.env`. rename the `VITE_BACKEND_URL` variable to the location of the backend of your choice.

to run in development mode:
```bash
npm install
npm run dev
```

to build and run:
```bash
npm install
npm run build
npm run preview
```

## License
This software is released under the MIT-license
[license details](license.txt)