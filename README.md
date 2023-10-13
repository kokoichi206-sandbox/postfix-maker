# postfix-maker

This VSCode extension makes your original *postfix-snippets* available.

## Features

Just by adding a `postfix.code-snippets` file, you can create your own postfix.

The syntax is the same as the snippets for [prefix](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

``` json
{
  "Length": {
    "scope": "go",
    "prefix": "len",
    "body": ["len($1)"],
    "description": "length"
  },
  "Print": {
    "scope": "go",
    "prefix": "print",
    "body": ["print($1)"],
    "description": "print"
  }
}
```

## Known Issues

- Only supports the JSON structure 

## Release Notes

## License

This repository is under [MIT License](./LICENSE).
