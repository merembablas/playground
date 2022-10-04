## PoC concrete syntax (CS) to abstract syntax tree (AST)

Fungsi saat ini adalah mengubah CS ke AST, dan AST ke CS

### CS to AST

```sql
context
  games.Thetan
  Message

if
  Thetan.players contains of Message.address
  Thetan.ranking > 11
then
  claim 10 assets.Point
  claim 15 assets.EXP


```

```shell
node parser.js data/cs/spec03.txt

{"version":1,"name":"data/cs/spec03.txt","content":[{"concept":"Context","values":[{"concept":"Pipeline","settings":{"name":"games.Thetan"}},{"concept":"Pipeline","settings":{"name":"Message"}}]},{"concept":"Condition","values":[{"concept":"Rule","settings":{"name":"contains of","arguments":[{"concept":"Attribute","settings":{"name":"Thetan.players","type":"User[]","initialValue":[]}},{"concept":"Attribute","settings":{"name":"Message.address","type":"address","initialValue":""}}]}},{"concept":"Rule","settings":{"name":">","arguments":[{"concept":"Attribute","settings":{"name":"Thetan.ranking","type":"Number"}},{"concept":"Number","settings":{"type":"BigInt","value":"11"}}]}}]},{"concept":"Consequence","values":[{"concept":"Command","settings":{"name":"claim","arguments":[{"concept":"Number","settings":{"type":"BigInt","value":"10"}},{"concept":"Asset","settings":{"name":"assets.Point"}}]}},{"concept":"Command","settings":{"name":"claim","arguments":[{"concept":"Number","settings":{"type":"BigInt","value":"15"}},{"concept":"Asset","settings":{"name":"assets.EXP"}}]}}]}]}

```

### AST to CS

```shell

node generate.js data/ast/spec01_ast.json

context
  games.Thetan
  Message

if
  Thetan.players contains of Message.address

then
  claim 15 assets.Point
  claim 15 assets.EXP
```
