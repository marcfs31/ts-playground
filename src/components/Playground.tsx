import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as ts from 'typescript';
import { useTheme } from '../context/ThemeContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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
  const [transpiledJs, setTranspiledJs] = useState('');
  const [output, setOutput] = useState('');
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const formatCode = () => {
    if (!editorRef.current) return;
    const model = editorRef.current.getModel();
    if (model) {
      editorRef.current.getAction('editor.action.formatDocument').run();
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
    <Container maxWidth="md">
      <br></br>
      <Typography variant="h4" gutterBottom>
        TypeScript Code Editor
      </Typography>
      <Box sx={{ my: 2 }}>
        <Editor
          height="40vh"
          defaultLanguage="typescript"
          defaultValue={code}
          onChange={handleEditorChange}
          theme={editorTheme}
          onMount={handleEditorDidMount}
        />
        <Button variant="contained" color="primary" onClick={formatCode} sx={{ m: 1 }}>
          Format Code
        </Button>
        <Button variant="contained" color="secondary" onClick={runCode} sx={{ m: 1 }}>
          Run Code
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Compiled JavaScript
      </Typography>
      <Editor
        height="40vh"
        defaultLanguage="javascript"
        value={transpiledJs}
        theme={editorTheme}
        options={{ readOnly: true }}
      />
      <Typography variant="h6" gutterBottom>
        Console Output
      </Typography>
      <Box sx={{ ...outputStyle }}>
        {output}
      </Box>
    </Container>
  );
}

export default Playground;
