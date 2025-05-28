// src/utils/productos.ts
import { getCollection } from 'astro:content';

// Cantidad de productos por sección
const CANTIDAD_DESTACADOS = 5;
const CANTIDAD_NUEVOS = 5;
const CANTIDAD_ALEATORIOS = 10;

export async function obtenerProductos() {
  const productos = await getCollection('products');

  // Filtrar productos disponibles
  const disponibles = productos.filter(p => p.data.available);

  // Ordenar por fecha (nuevos primero)
  const ordenados = [...disponibles].sort((a, b) => {
    const fechaA = new Date(a.data.fecha ?? 0);
    const fechaB = new Date(b.data.fecha ?? 0);
    return fechaB.getTime() - fechaA.getTime();
  });

  // Destacados (usamos campo booleano destacado)
  const destacados = disponibles
    .filter(p => p.data.destacado === true)
    .slice(0, CANTIDAD_DESTACADOS);

  // Nuevos (los más recientes)
  const nuevos = ordenados.slice(0, CANTIDAD_NUEVOS);

  // Aleatorios sin repetir destacados ni nuevos
  const usados = new Set([...destacados.map(p => p.id), ...nuevos.map(p => p.id)]);
  const restantes = disponibles.filter(p => !usados.has(p.id));
  const aleatorios = [...restantes]
    .sort(() => Math.random() - 0.5)
    .slice(0, CANTIDAD_ALEATORIOS);

  return { destacados, nuevos, aleatorios };
}
