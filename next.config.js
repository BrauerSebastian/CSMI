/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {},
};

module.exports = {
  // Otras configuraciones...
  // ...

  // Configuración del manejo del favicon
  async headers() {
    return [
      {
        // Especifica el favicon
        source: '/favicon.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon', // Tipo de contenido para un archivo favicon.ico
          },
        ],
      },
    ];
  },
};
