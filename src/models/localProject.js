class LocalProject {
  constructor(
    project_name,
    project_description,
    project_language,
    project_file,
    project_keywords,
    project_contributors,
  ) {
    this.project_name = project_name;
    this.project_description = project_description;
    this.project_language = project_language;
    this.project_file = project_file;
    this.project_keywords = project_keywords;
    this.project_contributors = project_contributors;
  }
}

export default LocalProject;
