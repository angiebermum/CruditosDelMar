const promotions = [
  {
    id: 'viernes-sabados-parrilleros',
    titulo: 'Viernes y Sábados Parrilleros',
    disponibilidadTexto: 'Disponible viernes y sábado',
    diasDisponibles: ['Viernes', 'Sábado'],
    imagen: '',
    productos: [
      { nombre: 'Choripán', precio: 1500 },
      { nombre: 'Choritropical', precio: 2000 },
      { nombre: 'Chorigrautinado', precio: 2000 },
      { nombre: 'Choripán con papas', precio: 2600 },
    ],
    activo: true,
    orden: 1,
  },
  {
    id: 'martes-promo-burritos',
    titulo: 'Martes de Promo - Burritos',
    disponibilidadTexto: 'Disponible los martes',
    diasDisponibles: ['Martes'],
    imagen: '',
    productos: [
      {
        nombre: '2 burritos + 1 gaseosa',
        precio: 8000,
        opciones: [
          'Carne mechada',
          'Camarones empanizados',
          'Camarones al ajillo',
          'Pollo caribeño',
          'Mixto de camarón y carne mechada',
        ],
      },
    ],
    activo: true,
    orden: 2,
  },
  {
    id: 'martes-promo-caldosa',
    titulo: 'Promo de Martes - Caldosa',
    disponibilidadTexto: 'Disponible los martes',
    diasDisponibles: ['Martes'],
    imagen: '',
    productos: [
      { nombre: '1 Carnosa + 1 Chichaldosa', precio: 3000 },
    ],
    activo: true,
    orden: 3,
  },
  {
    id: 'miercoles-caldosas-pescado',
    titulo: 'Miércoles de Promo - Caldosa de Pescado',
    disponibilidadTexto: 'Disponible los miércoles',
    diasDisponibles: ['Miércoles'],
    imagen: '',
    productos: [
      { nombre: '2 caldosas de pescado', precio: 3000 },
    ],
    activo: true,
    orden: 1,
  },
  {
    id: 'jueves-promo-wraps',
    titulo: 'Jueves de Promo - Wraps',
    disponibilidadTexto: 'Disponible los jueves',
    diasDisponibles: ['Jueves'],
    imagen: '',
    productos: [
      {
        nombre: '1 Wrap de cerdo a la cochinilla + 1 Wrap de camarones en salsa BBQ + 1 Coca-Cola de 350 ml',
        precio: 8000,
      },
    ],
    activo: true,
    orden: 1,
  },
  {
    id: 'jueves-promo-papa-nacho',
    titulo: 'Jueves de Promo - Papa Nacho',
    disponibilidadTexto: 'Disponible los jueves',
    diasDisponibles: ['Jueves'],
    imagen: '',
    productos: [
      {
        nombre: 'Papa Nacho + 1 Coca-Cola de 350 ml',
        precio: 7500,
        opciones: ['Camarones empanizados', 'Carne mechada'],
      },
    ],
    activo: true,
    orden: 2,
  },
  {
    id: 'caldosas-promocion-semana',
    titulo: 'Promo de Caldosas de la Semana',
    disponibilidadTexto: 'Promoción de la semana',
    diasDisponibles: [],
    imagen: '',
    productos: [
      { nombre: 'Caldosa de pescado + Coca-Cola 250 ml', precio: 2000 },
      { nombre: 'Super caldosa de pescado', precio: 2300 },
      { nombre: 'Super caldosa de pescado + Coca-Cola 250 ml', precio: 2600 },
      { nombre: 'Caldosa Vuelve a la Vida + Coca-Cola 250 ml', precio: 3000 },
      { nombre: 'Super caldosa Vuelve a la Vida', precio: 3700 },
      { nombre: 'Super caldosa Vuelve a la Vida + Coca-Cola 250 ml', precio: 4000 },
    ],
    activo: true,
    orden: 4,
  },
]

export default promotions
