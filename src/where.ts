import { N } from './n';

export class InitWhere {

  expressiontTree: N;
  pointer: N;
 
  constructor(
}

export class Where {

  expressiontTree: N;
  pointer: N;
  
  constructor(field: string){
    // create defferred root
    this.expressiontTree = new N('deferred');
    //create deferred expression for first field
    this.expressiontTree.left = new N('deferred', this.expressiontTree);
    //create first field
    this.expressiontTree.left.left = new N(field, this.expressiontTree.left);
    //set pointer to current expression
    this.pointer = this.expressiontTree.left;
    
  }

  compose(node: N){
    node.meta = 'sub-exp';
    this.pointer.left = node;
  }

  
}
