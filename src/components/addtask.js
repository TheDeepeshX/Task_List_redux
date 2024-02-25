import uuid4 from "uuid4";
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch} from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { FormatAlignLeftSharp } from "@mui/icons-material";
export default function AddTask() {
  var dispatch = useDispatch();
  var navigate=useNavigate();
  const [taskname, setTaskName] = useState("");
  const [AssignDate, setAssigneDate] = useState("");
  const [finishDate, setfinishDate] = useState("");
  const [Assignto, setAssigneto] = useState("");
  const [status, setstatus] = useState("not complated");
  const [Picture,setPicture]=useState('logo192.png')

  const handlePicture=(event)=>{
    setPicture(URL.createObjectURL(event.target.files[0]))
  }
  const handleadd = () => {
    var unique_id = uuid4();
    var taskid = unique_id.slice(0, 5);
    var body = {
      taskid,
      taskname,
      AssignDate,
      finishDate,
      Assignto,
      status,
      Picture
    };
    console.log("data to dispatch >>", body);
    dispatch({ type: "ADD-TASK", payload: [taskid, body] });
    setTaskName("");
    setAssigneDate("");
    setfinishDate("");
    setAssigneto("");
    setPicture('logo192.png')
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "auto",
        backgroundColor: "#b2bec3",
        display: "flex",
        justifyContent:'center',
        alignItems:'center'
      }}>  
      <div style={{ width: 500, height: "auto", padding: 10, margin: 10 }}>
         <p style={{fontSize:20,fontWeight:500,color:'#000',justifyContent:'center'}}>Add Task</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Assigne Date"
              onChange={(e) => setAssigneDate(e.target.value)}
              value={AssignDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Finish Date"
              onChange={(e) => setfinishDate(e.target.value)}
              value={finishDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Assigne To"
              onChange={(e) => setAssigneto(e.target.value)}
              value={Assignto}
            />
          </Grid>
          <Grid item xs={6}>
            <Button component="label" >
              <input onChange={handlePicture} multiple  type="file" hidden accept="image/*"  />
             Upload Picture
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img src={`${Picture}`} style={{width:100,height:'auto',background:'white',borderRadius:10}} />
          </Grid>
          <Grid item xs={12}>
            <FormGroup onChange={(e) => setstatus(e.target.value)}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                required
                label="Not Complated"
                value={"Not_Complated"}
              />
              <FormControlLabel
                control={<Checkbox />}
                value={"pending"}
                label="pending"
              />
              <FormControlLabel
                value={"Complated"}
                control={<Checkbox />}
                label="Complated"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleadd}>
              Add Task
            </Button>
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={()=>navigate('/displayalltask')}>
              Display All Task
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
