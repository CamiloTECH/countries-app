# Countries App

Esta es una aplicación [Next.js](https://nextjs.org) que muestra información sobre países.

## Inicio Rápido

1. Clona el repositorio:
```bash
git clone https://github.com/CamiloTECH/countries-app.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Arquitectura y Tecnologías

### Estructura del Proyecto
```
├── app/               # Páginas y rutas de la aplicación
├── components/        # Componentes reutilizables
├── lib/               # Utilidades y configuraciones
├── models/            # Tipos e interfaces
├── services/          # Servicios y llamadas API
└── store/             # Estado global de la aplicación
```

### Tecnologías Principales

- **Next.js 14**: Framework de React con Server-Side Rendering y generación de rutas dinámicas
- **TypeScript**: Tipado estático para mejor mantenibilidad
- **Tailwind CSS**: Framework de CSS utilizable para estilos
- **Shadcn/ui**: Librería de componentes UI basada en Radix UI
- **Jotai**: Gestión de estados globales de forma atómica y eficiente
- **Lucide React**: Conjunto de iconos optimizados para React

### Características

- Arquitectura basada en componentes
- Manejo de estados globales con Jotai
- Rutas dinámicas para detalles de países
- Componentes de carga y manejo de errores
- Optimización de fuentes con next/font
- Diseño responsive con Tailwind CSS
- Interfaz de usuario moderna con Shadcn
- Sistema de iconos con Lucide React

### Rendimiento y Optimización

- Optimización automática de imágenes
- Carga progresiva de componentes
- Manejo de errores y estados de carga
- Estilos optimizados con Tailwind CSS