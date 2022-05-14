var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var N = /** @class */ (function () {
    function N(data, parent) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = parent ? parent : null;
    }
    return N;
}());
var inOrder = function (n) {
    if (n === null) {
        return;
    }
    inOrder(n.left);
    console.log(n.data);
    inOrder(n.right);
};
var queue = [];
var root = null;
var pointer = null;
var Fluent = /** @class */ (function () {
    function Fluent() {
    }
    return Fluent;
}());
var WhereJar = /** @class */ (function (_super) {
    __extends(WhereJar, _super);
    function WhereJar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.field = function (name) {
            root = new N('deferred');
            pointer = root;
            return new Where().field(name);
        };
        return _this;
    }
    return WhereJar;
}(Fluent));
var Where = /** @class */ (function (_super) {
    __extends(Where, _super);
    function Where() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.field = function (name) {
            var exp = new N('deferred', pointer);
            pointer.left = exp;
            var field = new N(name, exp);
            exp.left = field;
            pointer = exp;
            return new Condition();
        };
        return _this;
    }
    return Where;
}(Fluent));
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.equals = function () {
            pointer.data = "=";
            return new Value();
        };
        return _this;
    }
    return Condition;
}(Fluent));
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = function (value) {
            var nValue = new N(value, pointer);
            pointer.right = nValue;
            return new NextExpression();
        };
        return _this;
    }
    return Value;
}(Fluent));
var NextExpression = /** @class */ (function (_super) {
    __extends(NextExpression, _super);
    function NextExpression() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.and = function () {
            var exp = pointer.parent;
            exp.data = "AND";
            var nextExp = new N('deferred', exp);
            exp.right = nextExp;
            pointer = nextExp;
            return new Where();
        };
        _this.or = function () {
            var exp = pointer.parent;
            exp.data = "OR";
            var nextExp = new N('deferred', exp);
            exp.right = nextExp;
            pointer = nextExp;
            return new Where();
        };
        return _this;
    }
    return NextExpression;
}(Fluent));
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
