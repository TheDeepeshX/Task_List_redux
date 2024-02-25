import * as React from "react";
import Swal from 'sweetalert2'
import { useSelector,useDispatch } from "react-redux"
import MaterialTable from "@material-table/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  Alert,
} from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllTask() {
  var dispatch=useDispatch()

    var data=useSelector((state)=>state.data)
    var list=Object.values(data)
    const [refresh,setRefresh]=useState(false)
    const [taskid, settaskid] = useState("");
    const [taskname, setTaskName] = useState("");
    const [AssignDate, setAssigneDate] = useState("");
    const [finishDate, setfinishDate] = useState("");
    const [Assignto, setAssigneto] = useState("");
    const [status, setstatus] = useState("not complated");
    const [Picture,setPicture]=useState('')
    const [open,setopen]=useState(false)

    const handleEditTask=(data)=>{
    settaskid(data.taskid)
    setTaskName(data.taskname)
    setAssigneDate(data.AssignDate)
    setfinishDate(data.finishDate)
    setAssigneto(data.Assignto)
    setstatus(data.status)
    setPicture(data.Picture)
    setopen(true)
    }

    const handleUpdate=()=>{
      var body={
        taskid,
        taskname,
        AssignDate,
        finishDate,
        Assignto,
        status,
        Picture,
      }
      dispatch({ type: "EDIT-TASK", payload: [taskid, body] });
    }
    const handleDelete=(data)=>{
    var id=data.taskid
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({type:"DELETE-TASK",payload:[id]})
        Swal.fire("Deleted!", "Task", "success");
        setRefresh(true)
      } else if (result.isDenied) {
        Swal.fire("Cancle Delete", "", "info");
      }
    });
   }

const handleClose = () => {
  setopen(false);
};

    //dioloag 
  const showDiloagProduct = () => {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Product Edit Dialog"}
          </DialogTitle>
          <DialogContent>
          <Grid container spacing={2} style={{marginTop:5}}>
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
          <Grid item xs={12}>
            <FormGroup onChange={(e) => setstatus(e.target.value)}>
              <FormControlLabel
                control={<Checkbox />}
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
          <Grid item xs={6}>
            <Button variant="contained" fullWidth
            onClick={handleUpdate}
             >
            Update Task
            </Button>
          </Grid>
          <Grid item xs={6}>
          <Button variant="contained" fullWidth 
          onClick={()=>handleClose()}>
              Close
            </Button>
          </Grid>
        </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
  // end diolg
 var navigate=useNavigate()
  const Display = () => {
    return (
      <MaterialTable
        title="Task Details"
        columns={[
          { title: "Task ID", field: "taskid" },
          { title: "Task Name", field: "taskname" },
          { title: "Assigne Date", field: "AssignDate" },
          { title: "Finish Date", field: "finishDate" },
          { title: "Assigne To", field: "Assignto" },
          { title: "Status", field: "status" },
          { title: "image", render:(rowData)=><img src={`${rowData.Picture}`} style={{width:50,height:'auto',background:'white',borderRadius:10}} /> },
          
        ]}
        data={list}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Task",
            onClick: (event,rowData) => handleEditTask(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Task",
            onClick: (event, rowData) =>handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Task",
            isFreeAction: true,
            onClick: (event, rowData) =>navigate('/addtask'),
          }
        ]}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b2bec3",
        height:'100vh'
      }}
    >
      {Display()}
    {showDiloagProduct()}
    </div>
  );
}
