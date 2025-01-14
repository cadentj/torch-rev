import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

let enabled = true;
let activeEditor: vscode.TextEditor | undefined;
let timeout: NodeJS.Timeout | undefined;
let outputChannel: vscode.OutputChannel;

const CUDA_PATTERNS = [
    /import\s+torch/,
    /from\s+torch\s+import/,
    /\.cuda\(\)/,
    /\.to\(['"]cuda['"]\)/,
    /\.to\(device=['"]cuda['"]\)/,
    /device\s*=\s*['"]cuda['"]/,
];

function playSound(soundPath: string) {
    const command = `afplay "${soundPath}"`;
    exec(command, (error) => {
        if (error) {
            outputChannel.appendLine('Error playing sound: ' + error.message);
            vscode.window.showErrorMessage('Failed to play sound: ' + error.message);
        } else {
            outputChannel.appendLine('Sound played successfully');
        }
    });
}

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel("Torch Revving");
    outputChannel.show();
    outputChannel.appendLine('Torch Revving extension is now active!');

    activeEditor = vscode.window.activeTextEditor;

    let enableCommand = vscode.commands.registerCommand('torch-revving.enable', () => {
        enabled = true;
        outputChannel.appendLine('Sound effects enabled');
        vscode.window.showInformationMessage('PyTorch GPU sound effects enabled!');
    });

    let disableCommand = vscode.commands.registerCommand('torch-revving.disable', () => {
        enabled = false;
        outputChannel.appendLine('Sound effects disabled');
        vscode.window.showInformationMessage('PyTorch GPU sound effects disabled!');
    });

    // Register event handlers
    let changeActiveEditor = vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            outputChannel.appendLine('Editor changed, checking for CUDA patterns...');
            triggerUpdateDecorations();
        }
    });

    let changeDocument = vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            outputChannel.appendLine('Document changed, checking for CUDA patterns...');
            triggerUpdateDecorations();
        }
    });

    // Add subscriptions
    context.subscriptions.push(enableCommand);
    context.subscriptions.push(disableCommand);
    context.subscriptions.push(changeActiveEditor);
    context.subscriptions.push(changeDocument);
    context.subscriptions.push(outputChannel);

    // Initial update
    if (activeEditor) {
        outputChannel.appendLine('Initial check for CUDA patterns...');
        triggerUpdateDecorations();
    }
}

function triggerUpdateDecorations() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(updateDecorations, 500);
}

function updateDecorations() {
    if (!activeEditor || !enabled) {
        outputChannel.appendLine('Editor not active or sounds disabled');
        return;
    }

    const text = activeEditor.document.getText();
    let foundCuda = false;
    let matchedPattern = '';

    for (const pattern of CUDA_PATTERNS) {
        if (pattern.test(text)) {
            foundCuda = true;
            matchedPattern = pattern.toString();
            break;
        }
    }

    if (foundCuda) {
        outputChannel.appendLine('Found CUDA pattern: ' + matchedPattern);
        // Play the revving sound
        const soundPath = path.join(__dirname, '..', 'media', 'fart.mp3');
        outputChannel.appendLine('Attempting to play sound from: ' + soundPath);
        playSound(soundPath);
    } else {
        outputChannel.appendLine('No CUDA patterns found in current text');
    }
}

export function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
} 