import { NTypes } from './types';

export class N {
  data: NTypes;
  left: N;
  right: N;
  parent: N;
  meta: string | null;

  constructor(data: NTypes, parent?: N) {
    this.meta = null;
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent? parent : null;
  }
}
