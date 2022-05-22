# o-data-fluent-porcelain

use tsx index.ts to compile

use node index.js to run

![](unnecessary.gif)


this project aims to provide a composable fluent api to generate o data queries

```typescript
const whereQuery = new FluentWhere().init()
  .field("foo").equals("Bar")
  .composeWithAnd( new FluentWhere().init()
      .field("fizz").equals("buzz")
      .or()
      .field("dog").equals("bone"))
  .or()
  .field("abc").notEquals("123")
  .shatter();

whereQuery = "WHERE foo = 'bar' AND ( fizz ='buzz' OR dog = 'bone' ) OR abc <> '123'"
  ```
