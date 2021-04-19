import { Container, Typography } from "@material-ui/core";
import './App.css';
import Order from "./components/Order";

function App() {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h2" align="center">Ilvira</Typography>
      <Order />
    </Container>
  );
}

export default App;
