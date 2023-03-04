export default interface TASK extends CREATEUPDATE {
  _id: string;
  name: string;
  createdBy: CREATEBY;
  resource_type: string;
  comments: COMMENT[];
}

export interface COMMENT extends CREATEUPDATE {
  _id: string;
  name: string;
  createdBy: CREATEBY;
}

export interface CREATEBY extends CREATEUPDATE {
  _id: string;
  email: string;
  name: string;
  role: number;
}

export interface PROJECT extends CREATEUPDATE {
  _id: string;
  name: string;
  resource_type: string;
  sections: SECTION[];
  team: string;
}

export interface SECTION extends CREATEUPDATE {
  _id: string;
  name: string;
  tasks: TASK[];
}

export interface TEAM extends CREATEUPDATE {
  _id: string;
  name: string;
  resource_type: string;
  projects: PROJECT[];
  createdBy: CREATEBY;
}

interface CREATEUPDATE {
  createdAt: string;
  updatedAt: string;
}
