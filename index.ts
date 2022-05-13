class N {
  parent: N
  value: string
  left: N
  right: N
}

class ShouldSetField extends N {
  setField(field: string){
    this.left.value = field;
    return this.left as ShouldSetOperator;
  }
}

class ShouldSetOperator extends N {
  isEqualTo(){
    this.parent.value = '=';
    return this.parent.right as ShouldSetValue;
  }

}

class ShouldSetValue extends N {
  setValue(value: string) {
    this.value = value;
    return this.parent.parent as N;
  }
}

class Builder extends ShouldSetField {
  constructor(){
    super();
    this.left = new ShouldSetOperator();
    this.left.parent = this;
    this.right = new ShouldSetValue();
    this.right.parent = this;
  }
}


let root: N = new N();

const foo = new Builder()
  .setField("Foo").isEqualTo();//.setValue("Bar");

console.log(foo);

// ( R (EqualTo
//       Warehouse ASM )

