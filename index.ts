type NTypes = string | 'deferred'

class N {
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


class FluentJar {
  root: N = null;
  pointer: N = null;
  output = "";

  shatter(){
    this.inOrder(this.root);
    return this.output;
  }
  
  private inOrder(n: N){
    if (n === null) {
      return;
    }
    if(n.meta === 'sub-exp') this.output += "(";
    this.inOrder(n.left);
    if(n.data !== 'deferred') this.output += " " + n.data + " ";
    this.inOrder(n.right);
    if(n.meta === 'sub-exp') this.output += ")";
  }

  init(): Where {
    this.root = new N('deferred');
    this.pointer = this.root;
    return new Where(this);
  }
}


class Where{
  jar: FluentJar;

  constructor(jar: FluentJar){
    this.jar = jar;
  }

  field(name: string){
    let exp = new N('deferred',this.jar.pointer);
    this.jar.pointer.left = exp;
    let field = new N(name, exp);
    exp.left = field;
    this.jar.pointer = exp;
    return new PredicateExpression(this.jar)
  }
}

class PredicateExpression {
  jar: FluentJar;

  constructor(jar: FluentJar) {
    this.jar = jar;
  }

  private setValue(value: string)
  {
    let nValue = new N(value, this.jar.pointer);
    this.jar.pointer.right = nValue;
    return new Expression(this.jar);
  }

  equals(value : string){
    this.jar.pointer.data = "=";
    return this.setValue(value);
  }

  isNotEqualTo(value: string){
    this.jar.pointer.data = "<>";
    return this.setValue(value);
  }
    
}

class Expression {
  jar: FluentJar;

  constructor(jar: FluentJar) {
    this.jar = jar;
  }
  
  private createDeferredExpression(value: string){
    let exp = this.jar.pointer.parent;
    exp.data = value;
    let nextExp = new N('deferred', exp);
    exp.right = nextExp;
    this.jar.pointer = nextExp;
    return new Where(this.jar);

  }

  and(){
    return this.createDeferredExpression("AND");
  }
  
  or(){
    return this.createDeferredExpression("OR");
  }

  andSubExpression(){
    this.and();
    let subExp = new N('deferred', this.jar.pointer);
    subExp.meta = 'sub-exp';
    this.jar.pointer.left = subExp;
    this.jar.pointer = subExp;
    return new Where(this.jar);
  }
}



const foo = new FluentJar().init()
  .field("foo").equals("Bar")
  .andSubExpression()
     .field("one").equals("two")
     .or().field("fdsa").equals("fice");

console.log(foo.jar.root);
console.log(foo.jar.shatter());

/*
const expFoo = new N("=");
expFoo.left = new N("Foo");
expFoo.right = new N("Bar");

inOrder(expFoo)
*/
