# PoC quest system

## Concrete Syntax (CS) <==> Abstract Syntax Tree (AST)

Fungsi saat ini adalah mengubah CS ke AST, dan AST ke CS

Masuk ke folder `quest`

1. `parse.js` utk parsing CS ke AST
2. `generate.js` utk generate AST ke CS

### CS to AST

```sql
context
  publishers.Play3
	assets.Point
	assets.EXP

if
  course finished category thetan greater than 2
  quiz cleared category thetan type final greater than 1

then
	claim 15 assets.Point
	claim 10 assets.EXP



```

```shell
node parser.js data/cs/spec01.txt

{"version":1,"name":"data/cs/spec01.txt","content":[{"concept":"Context","values":[{"concept":"Pipeline","settings":{"name":"publishers.Play3"}},{"concept":"Pipeline","settings":{"name":"assets.Point"}},{"concept":"Pipeline","settings":{"name":"assets.EXP"}}]},{"concept":"Condition","values":[{"concept":"Rule","settings":{"name":"greater than","arguments":[{"concept":"Attribute","settings":{"name":"course finished","type":"","filters":{"category":"thetan"},"initialValue":""}},{"concept":"Number","settings":{"type":"BigInt","value":"2"}}]}},{"concept":"Rule","settings":{"name":"greater than","arguments":[{"concept":"Attribute","settings":{"name":"quiz cleared","type":"","filters":{"category":"thetan","type":"final"},"initialValue":""}},{"concept":"Number","settings":{"type":"BigInt","value":"1"}}]}}]},{"concept":"Consequence","values":[{"concept":"Command","settings":{"name":"claim","arguments":[{"concept":"Number","settings":{"type":"BigInt","value":"15"}},{"concept":"Asset","settings":{"name":"assets.Point","type":""}}]}},{"concept":"Command","settings":{"name":"claim","arguments":[{"concept":"Number","settings":{"type":"BigInt","value":"10"}},{"concept":"Asset","settings":{"name":"assets.EXP","type":""}}]}}]}]}

```

### AST to CS

```shell

node generate.js data/ast/spec01_ast.json

context
  publishers.Play3
	assets.Point
	assets.EXP

if
  course finished category thetan greater than 2
  quiz cleared category thetan type final greater than 1

then
	claim 15 assets.Point
	claim 10 assets.EXP
```

Berapa sample spesifikasi quest completion ada di folder `quest/data/cs`

## Quest Runtime

Run the mock service in mock folder first

```shell
node appPlay3.js

Example app listening on port 8002

```

Then run `runtime.js`, currently the request data is hardcoded inside file

```node
const requestData = {
  quest_id: process.argv[2],
  address: '0xBBB',
}
```

```shell

node runtime.js data/ast/spec01_ast.json

{ info: 'Pipeline publishers.Play3 is ready' }
{ info: 'Rule course finished greater than 2 is met' }
{ info: 'Rule quiz cleared greater than 1 is met' }
{ info: 'Do some task' }

```
