import Editor from '@monaco-editor/react';
import prettier from 'prettier';
import React, { useState } from 'react';
import * as ts from 'typescript';
import { useTheme } from '../context/ThemeContext';

const initialCode = `const b = 'b';
const a = 'a';
console.log(b);
console.log(a);
console.log(Number(b)*2);
console.log(a);
console.log(\`\${b}\${a}\${Number(b)}\${a}\`);`;

const Playground: React.FC = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [formattedCode, setFormattedCode] = useState(code);
  const [transpiledJs, setTranspiledJs] = useState('');
  const [output, setOutput] = useState('');

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const formatCode = async () => {
    try {
      const formatted = await prettier.format(code, {
        parser: "typescript",  // Uses the built-in TypeScript parser
        semi: true,            // Use semicolons at the ends of statements
        singleQuote: true      // Use single quotes instead of double
      });
      setFormattedCode(formatted);
    } catch (error) {
      console.error("Error formatting code:", error);
    }
  };
  

  const runCode = () => {
    try {
      const js = ts.transpileModule(code, {
        compilerOptions: { module: ts.ModuleKind.None }
      }).outputText;
      setTranspiledJs(js);

      // Temporarily capture console output
      const oldConsoleLog = console.log;
      let consoleOutput = '';
      console.log = (message: any) => {
        consoleOutput += message + '\n';
        oldConsoleLog(message);
      };

      // Evaluate the JavaScript code
      eval(js);
      console.log = oldConsoleLog; // Restore original console.log
      setOutput(consoleOutput);
    } catch (e: any) {
      setOutput('Error: ' + e.message);
    }
  };

  // Editor and output box themes
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light';
  const outputStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f3f3f3',
    color: theme === 'dark' ? '#dcdcdc' : '#1e1e1e',
    padding: '10px',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    minHeight: '50px'
  };

  return (
    <div>
      <h2>TypeScript Code Editor</h2>
      <Editor
        height="40vh"
        defaultLanguage="typescript"
        defaultValue={code}
        onChange={handleEditorChange}
        theme={editorTheme}
      />
      <button onClick={formatCode}>Format Code</button>
      <button onClick={runCode}>Run Code</button>
      <h3>Formatted TypeScript</h3>
      <Editor
        height="40vh"
        value={formattedCode}
        theme={editorTheme}
        options={{ readOnly: true }}
      />
      <h3>Compiled JavaScript</h3>
      <Editor
        height="40vh"
        value={transpiledJs}
        theme={editorTheme}
        options={{ readOnly: true }}
      />
      <h3>Console Output</h3>
      <div style={outputStyle}>{output}</div>
    </div>
  );
}

export default Playground;
