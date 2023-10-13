# postfix-maker

This VSCode extension makes your original *postfix-snippets* available.

## Features

Just by adding files (and activate them), you can create your own postfix.

The syntax is the same as the snippets for [prefix](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

## Usage

### 1. Add files

- File path: a `*-postfix-maker.json`
- File format: JSON

examples

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

### 2. Activate postfix

1. Open the command palette
2. Search for "Activate postfix-maker" and execute it

## Known Issues

## Release Notes

## License

This repository is under [MIT License](https://github.com/kokoichi206-sandbox/postfix-maker/blob/main/LICENSE).
