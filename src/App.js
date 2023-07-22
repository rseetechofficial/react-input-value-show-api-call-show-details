import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { isEmpty } from "lodash";

import * as React from "react";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [apiData, setAPIData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const apiurl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(apiurl).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const handleClickOpen = (userid) => {
    axios.get(`${apiurl}?id=${userid}`).then((response) => {
      setUserDetails(response.data);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (identity) => {
    if(identity === "sum"){
      const sum = parseInt(first) + parseInt(second);
      alert("Sum of number : " + sum);
    } else if(identity === "sub"){
      const sub = parseInt(first) - parseInt(second);
      alert("Sub of number : " + sub);
    } else if(identity === "mul"){
      const mul = parseInt(first) * parseInt(second);
      alert("Mul of number : " + mul); 
    } else {
      const div = parseInt(first) / parseInt(second);
      alert("Div of number : " + div); 
    } 
    
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <div style={{ display: "grid", justifyContent: "center", margin: 20 }}>
          <input
            style={{ marginBottom: 20 }}
            onChange={(e) => {
              setFirst(e.target.value);
            }}
            type="number"
            name="first"
          />
          <input
            style={{ marginBottom: 20 }}
            onChange={(e) => {
              setSecond(e.target.value);
            }}
            type="number"
            name="second"
          />
          <button type="button" onClick={() => { submit("sum") }}>
            Sum
          </button>
          <button type="button" onClick={() => { submit("sub") }}>
            Sub
          </button>
          <button type="button" onClick={() => { submit("mul") }}>
            Mul
          </button>
          <button type="button" onClick={() => { submit("div") }}>
            Div
          </button>
        </div>
        <div>
          {!isEmpty(apiData) &&
            apiData.map((user, index) => (
              <button
                key={index}
                style={{ display: "grid" }}
                onClick={() => { handleClickOpen(user.id) }}
              >
                <li style={{ marginBottom: 10 }}>{user.name}</li>
              </button>
            ))}
        </div>

        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              
              
              <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
                User Details
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
                </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary={userDetails[0]?.name} secondary={userDetails[0]?.username} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={userDetails[0]?.email}
                secondary={userDetails[0]?.website}
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    </>
  );
}

export default App;
