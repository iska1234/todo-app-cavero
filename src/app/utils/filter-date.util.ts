export function filterTasksByCreationDate(tasks: any[], ascending: boolean = true): any[] {
  return tasks.filter(task => task.creationTime).sort((a, b) => {
    const dateA = new Date(a.creationTime).getTime();
    const dateB = new Date(b.creationTime).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function filterTasksByAsc(tasks: any[]): any[] {
  return filterTasksByCreationDate(tasks);
}

export function filterTasksByDesc(tasks: any[]): any[] {
  return filterTasksByCreationDate(tasks, false);
}
