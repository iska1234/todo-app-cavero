/**
 * Filtra y ordena las tareas por fecha de creación.
 * @param tasks Lista de tareas a filtrar y ordenar.
 * @param ascending Indica si las tareas deben ordenarse de forma ascendente (true) o descendente (false).
 * @returns La lista de tareas filtrada y ordenada por fecha de creación.
 */

export function filterTasksByCreationDate(tasks: any[], ascending: boolean = true): any[] {
  return tasks.filter(task => task.creationTime).sort((a, b) => {
    const dateA = new Date(a.creationTime).getTime();
    const dateB = new Date(b.creationTime).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Filtra y ordena las tareas por fecha de creación de forma ascendente.
 * @param tasks Lista de tareas a filtrar y ordenar.
 * @returns La lista de tareas filtrada y ordenada por fecha de creación de forma ascendente.
 */
export function filterTasksByAsc(tasks: any[]): any[] {
  return filterTasksByCreationDate(tasks);
}

/**
 * Filtra y ordena las tareas por fecha de creación de forma descendente.
 * @param tasks Lista de tareas a filtrar y ordenar.
 * @returns La lista de tareas filtrada y ordenada por fecha de creación de forma descendente.
 */
export function filterTasksByDesc(tasks: any[]): any[] {
  return filterTasksByCreationDate(tasks, false);
}
