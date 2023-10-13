import * as vscode from 'vscode';
import { readFile } from 'fs';

type Snippet = {
  scope: string;
  prefix: string;
  body: string[];
  description: string;
};

type Snippets = {
  [key: string]: Snippet;
};

export async function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('postfix-maker.activate', async () => {
    // first, dispose of any existing snippets.
    context.subscriptions.forEach(sub => sub.dispose());

    let snippets: Snippets | null = null;
    const files = await vscode.workspace.findFiles(
      `.vscode/*-postfix-maker.json`,
      "**/node_modules/**"
    );
    files.forEach((file) => {
      readFile(file.path, (err, data) => {
        const parsedObject = JSON.parse(data.toString());

        snippets = parsedObject as Snippets;

        const groupedByScope: { [scope: string]: Snippet[] } = {};

        for (const key in snippets) {
          const snippet = snippets[key];
          if (!groupedByScope[snippet.scope]) {
            groupedByScope[snippet.scope] = [];
          }
          groupedByScope[snippet.scope].push(snippet);
        }

        for (const scope in groupedByScope) {
          const snippets = groupedByScope[scope];
          context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(
              {
                language: scope,
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

                  const result: vscode.CompletionItem[] = [];
                  for (let i = 0; i < snippets.length; i++) {
                    const snippet = snippets[i];
                    let item = new vscode.CompletionItem(snippet.prefix);
                    item.additionalTextEdits = [
                      vscode.TextEdit.delete(
                        new vscode.Range(
                          position.translate(0, -(code.length + 1)),
                          position
                        )
                      ),
                    ];
                    item.insertText = new vscode.SnippetString(snippet.body.join("").replace("$1", code));
                    item.documentation = snippet.description;
                    item.kind = vscode.CompletionItemKind.Snippet;
                    item.sortText = "\u0000";
                    item.preselect = true;
                    result.push(item);
                  }

                  return result;
                },
              },
              "."
            )
          );
        }
      });
      vscode.window.showInformationMessage('postfix-maker activated: ' + file.path);
      }
    );
	});

  // context.subscriptions.push(disposable);
}

export function deactivate() {}
