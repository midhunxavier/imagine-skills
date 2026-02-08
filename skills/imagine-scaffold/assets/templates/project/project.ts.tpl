import type { ProjectDefinition } from '../../src/core/manifest';
import { validateProject } from '../../src/core/manifest';
import { figures } from './manifest';

const project: ProjectDefinition = {
  id: {{PROJECT_ID}},
  title: {{PROJECT_TITLE}},
{{PROJECT_DESCRIPTION_LINE}}
  figures
};

validateProject(project);

export default project;
