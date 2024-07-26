interface Project {
  id: number;
  name: string;
}

const getProjectIdByName = (
  project: Project,
  projectName: string
): number | null => {
  if (project.name === projectName) {
    return project.id;
  } else {
    return null;
  }
};
export { getProjectIdByName };
