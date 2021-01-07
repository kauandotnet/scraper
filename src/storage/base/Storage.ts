import Resource, { IStaticResource } from './Resource';
import Project, { IStaticProject } from './Project';

export default abstract class Storage {
  config;
  isConnected:boolean;

  Project: IStaticProject & typeof Project;
  Resource: IStaticResource & typeof Resource;

  constructor(config) {
    this.config = config;
    this.isConnected = false;
  }

  abstract connect():Promise<{
    Project: IStaticProject & typeof Project,
    Resource: IStaticResource & typeof Resource
  }>;

  abstract close():Promise<void>;
}
