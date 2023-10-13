import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      {
        language: "go",
        scheme: "file",
      },
      {
        provideCompletionItems(
          document: vscode.TextDocument,
          position: vscode.Position,
          token: vscode.CancellationToken,
          context: vscode.CompletionContext
        ) {
          let line = document.lineAt(position.line);
          let dotIdx = line.text.lastIndexOf(".", position.character);
          if (dotIdx === -1) {
            return [];
          }

          let code = line.text.substring(
            line.firstNonWhitespaceCharacterIndex,
            dotIdx
          );

          // len
          let lengthSnippet = new vscode.CompletionItem("len");
          lengthSnippet.additionalTextEdits = [
          vscode.TextEdit.delete(
            new vscode.Range(
              position.translate(0, -(code.length + 1)),
              position
            )
          ),
          ];
          lengthSnippet.insertText = new vscode.SnippetString(`len(${code})`);
          lengthSnippet.documentation = 'my custom postfix completion';
          lengthSnippet.kind = vscode.CompletionItemKind.Snippet;
          lengthSnippet.sortText = "\u0000";
          lengthSnippet.preselect = true;

          return [lengthSnippet];
        },
      },
      "."
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
