import {N} from './n';
import {Where} from './where';

export class Predicate {

  expressiontTree: N;
  pointer: N;
  
  constructor(tree: N, pointer: N){
    this.expressiontTree = tree;
    this.pointer = pointer;
  }
  
  equals(value: string) {
    this.pointer.data = "=";
    this.pointer.right = new N(value, this.pointer);
    return new Where();
  }
}
