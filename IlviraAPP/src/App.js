import { Container, Typography,Paper,makeStyles } from "@material-ui/core";
import './App.css';
import Order from "./components/Order";
import ilviraImage from './images/ilvira.png';

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    padding: "8px 68px",
    display: "flex",
    alignItems: "center",
    justifyContent:"center"
  },
  ilviraImage:{
    borderRadius:"5px",
    width:"90px",
    height:"90px",
    marginRight:"2em"
  },
  ilviraText:{
    color:"#D4389A",
    fontStyle:"italic",
    textDecorationLine: 'underline'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div className={classes.rootPaper}>
      <img className={classes.ilviraImage} src={ilviraImage}/> 
      <Typography className={classes.ilviraText} gutterBottom variant="h2">Ilvira</Typography>
      </div>
      <Order />
    </Container>
  );
}

export default App;
