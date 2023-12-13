import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';

function App() {

  const [weight, setWeight] = useState<any>();
  const [height, setHeight] = useState<any>();
  const [age, setAge] = useState<any>();
  const [imt, setImt] = useState<any>();

  const getIMT = async () => {
    const response = await fetch('http://localhost:8000/GetIMT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ weight: weight, height: height })
    });
    const data = await response.json();
    setImt(data.imt)
  }

  return (
    <div className="App">
      <h1 className='header'>Расчитать свой индекс массы тела:</h1>
      <TextField id="outlined-basic"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setHeight(event.target.value);
        }}
        className='inputField'
        label="Рост (см)"
        variant="outlined" />
      <TextField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setWeight(event.target.value);
        }}
        id="outlined-basic"
        className='inputField'
        label="Вес (кг)"
        variant="outlined" />
      <TextField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAge(event.target.value);
        }}
        id="outlined-basic"
        className='inputField'
        label="Возраст"
        variant="outlined" />
      <Button onClick={() => getIMT()} variant="contained" color="success">
        Рассчитать
      </Button>
      {imt && 
      <>
        <div className='imt-show-div'>
          <span>{imt}</span>
        </div>
          {imt <= 16 &&
          <Alert severity="error">Выраженный дефицит массы тела</Alert>
          }
          {(imt > 16 && imt <=18.5) &&
          <Alert severity="warning">Недостаточная (дефицит) масса тела</Alert>
          }
          {(imt > 18.5 && imt <=25) &&
         <Alert severity="success">	Норма</Alert>
          }
          {(imt > 25 && imt <=30) &&
          <Alert severity="warning">Избыточная масса тела (предожирение)</Alert>
          }
          {(imt > 30 && imt <=35) &&
          <Alert severity="warning">Ожирение первой степени</Alert>
          }
          {(imt > 35 && imt <=40) &&
          <Alert severity="error">Ожирение второй степени</Alert>
          }
          {(imt > 40) &&
          <Alert severity="error">Ожирение третьей степени (морбидное)</Alert>
          }         
      </>
      }
     
    </div>
  );
}

export default App;
