var N = /** @class */ (function () {
    function N(data, parent) {
        this.meta = null;
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = parent ? parent : null;
    }
    return N;
}());
var FluentJar = /** @class */ (function () {
    function FluentJar() {
        this.root = null;
        this.pointer = null;
        this.output = "";
    }
    FluentJar.prototype.shatter = function () {
        this.inOrder(this.root);
        return this.output;
    };
    FluentJar.prototype.inOrder = function (n) {
        if (n === null) {
            return;
        }
        if (n.meta === 'sub-exp')
            this.output += "(";
        this.inOrder(n.left);
        if (n.data !== 'deferred')
            this.output += " " + n.data + " ";
        this.inOrder(n.right);
        if (n.meta === 'sub-exp')
            this.output += ")";
    };
    FluentJar.prototype.init = function () {
        this.root = new N('deferred');
        this.pointer = this.root;
        return new Where(this);
    };
    return FluentJar;
}());
var Where = /** @class */ (function () {
    function Where(jar) {
        this.jar = jar;
    }
    Where.prototype.field = function (name) {
        var exp = new N('deferred', this.jar.pointer);
        this.jar.pointer.left = exp;
        var field = new N(name, exp);
        exp.left = field;
        this.jar.pointer = exp;
        return new PredicateExpression(this.jar);
    };
    return Where;
}());
var PredicateExpression = /** @class */ (function () {
    function PredicateExpression(jar) {
        this.jar = jar;
    }
    PredicateExpression.prototype.setValue = function (value) {
        var nValue = new N(value, this.jar.pointer);
        this.jar.pointer.right = nValue;
        return new Expression(this.jar);
    };
    PredicateExpression.prototype.equals = function (value) {
        this.jar.pointer.data = "=";
        return this.setValue(value);
    };
    PredicateExpression.prototype.isNotEqualTo = function (value) {
        this.jar.pointer.data = "<>";
        return this.setValue(value);
    };
    return PredicateExpression;
}());
var Expression = /** @class */ (function () {
    function Expression(jar) {
        this.jar = jar;
    }
    Expression.prototype.createDeferredExpression = function (value) {
        var exp = this.jar.pointer.parent;
        exp.data = value;
        var nextExp = new N('deferred', exp);
        exp.right = nextExp;
        this.jar.pointer = nextExp;
        return new Where(this.jar);
    };
    Expression.prototype.and = function () {
        return this.createDeferredExpression("AND");
    };
    Expression.prototype.or = function () {
        return this.createDeferredExpression("OR");
    };
    Expression.prototype.andSubExpression = function () {
        this.and();
        var subExp = new N('deferred', this.jar.pointer);
        subExp.meta = 'sub-exp';
        this.jar.pointer.left = subExp;
        this.jar.pointer = subExp;
        return new Where(this.jar);
    };
    return Expression;
}());
var foo = new FluentJar().init()
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
