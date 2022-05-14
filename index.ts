type NTypes = string | 'deferred'

class N {
  data: NTypes;
  left: N;
  right: N;
  parent: N;

  constructor(data: NTypes, parent?: N) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent? parent : null;
  }
}

const inOrder = (n: N) => {
  if(n === null) {
    return;
  }
  inOrder(n.left);

  console.log(n.data);

  inOrder(n.right)
}



let queue: Fluent[] = [];
let root: N = null;
let pointer: N = null;

class Fluent {}
class WhereJar extends Fluent {
  field = (name: string) => {
    root = new N('deferred');
    pointer = root;
    return new Where().field(name);
  };
}

class Where extends Fluent {
  field = (name: string) => {
    let exp = new N('deferred', pointer);
    pointer.left = exp;
    let field = new N(name, exp);
    exp.left = field;
    pointer = exp;
    return new Condition()
  }
}

class Condition extends Fluent {
  equals = () => {
    pointer.data = "=";
    return new Value();
  }
}

class Value extends Fluent {
  value = (value: string) => {
    let nValue = new N(value, pointer);
    pointer.right = nValue;
    return new NextExpression();
  }
}

class NextExpression extends Fluent {
  and = () => {
    let exp = pointer.parent;
    exp.data = "AND";
    let nextExp = new N('deferred', exp);
    exp.right = nextExp;
    pointer = nextExp;
    return new Where();
  }
  
  or = () => {
    let exp = pointer.parent;
    exp.data = "OR";
    let nextExp = new N('deferred', exp);
    exp.right = nextExp;
    pointer = nextExp;
    return new Where();
  }
}




new WhereJar().field("Foo").equals().value("Bar")
  .and().field("foo2").equals().value("Bar2")
  .or().field("POP").equals().value("OPP");

console.log(root);
inOrder(root);
/*
const expFoo = new N("=");
expFoo.left = new N("Foo");
expFoo.right = new N("Bar");

inOrder(expFoo)
*/
