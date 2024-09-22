import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todo9State } from "../atom"; // Import the atom
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  Box,
  Container,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null); // State to track the todo being edited
  const [todos, setTodos] = useRecoilState(todo9State); // Use the Recoil atom for state management

  const gettodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo/getall", {
        credentials: "include", // To ensure cookies are sent if needed
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json(); // Parse the JSON from the response
      setTodos(data.td); // Set todos to data.td
      console.log("Fetched todos:", data.td); // Log the fetched data
    } catch (error) {
      console.error("Error fetching todos:", error.message); // Log any errors
    }
  };

  useEffect(() => {
    gettodo();
  }, []);

  const handleAddOrUpdateTodo = async () => {
    if (!title.trim() || !description.trim()) {
      return alert("Please enter a valid title and description.");
    }

    try {
      if (editingTodoId) {
        // If editing, update the todo
        const response = await axios.put(
          `http://localhost:3000/todo/updateTodo/${editingTodoId}`,
          {
            title,
            description,
            completed,
          },
          { withCredentials: true }
        );
        const updatedTodo = response.data;
        setTodos(todos.map((todo) => (todo._id === editingTodoId ? updatedTodo : todo)));
        setEditingTodoId(null);
      } else {
        // If not editing, add a new todo
        const response = await axios.post(
          "http://localhost:3000/todo/createTodo",
          {
            title,
            description,
            completed,
          },
          { withCredentials: true }
        );
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
      }

      // Reset the form
      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch (error) {
      console.error("Error creating or updating todo:", error);
      alert("Error creating or updating todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/deletTodo/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  const handleEditTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setEditingTodoId(todo._id); // Set the ID of the todo being edited
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {editingTodoId ? "Edit Todo" : "Create a Todo"}
        </Typography>

        <TextField
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: "20px" }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Completed"
          sx={{ marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdateTodo}
          sx={{ marginBottom: "20px" }}
        >
          {editingTodoId ? "Update Todo" : "Add Todo"}
        </Button>
      </Box>

      <Typography variant="h5" component="h2" sx={{ marginTop: "40px", marginBottom: "20px" }}>
        Todos List
      </Typography>

      <Grid container spacing={3}>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <Grid item xs={12} sm={6} md={4} key={todo._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "10px" }}>
                    {todo.description}
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox checked={todo.completed} disabled />}
                    label={todo.completed ? "Completed" : "Not Completed"}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <IconButton color="primary" onClick={() => handleEditTodo(todo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteTodo(todo._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            No todos available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Todo;
