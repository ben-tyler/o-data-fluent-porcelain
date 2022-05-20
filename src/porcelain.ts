import {N} from './n';
import {Where} from './where';

export class Porcelain {
  output: string;

  private inOrderTraverse(n: N){
    if(n === null){
      return n;
    }
    this.inOrderTraverse(n.left);
    this.output += n.data;
    this.inOrderTraverse(n.right);
  }

  provideFluentWhere(): Where {
    return new Where();
  }

  shatter(where: Where): string {
    this.inOrderTraverse(where.expressiontTree);
    return this.output;
  }
}
