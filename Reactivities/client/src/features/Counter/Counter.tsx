import { Typography, Button, ButtonGroup, Box, List, ListItemText, Paper } from "@mui/material"
import { useStore } from "../../lib/hooks/useStore"
import { observer } from 'mobx-react-lite'

const Counter = observer(function Counter() {
    const {counterStore} = useStore()
  return (
    <Box display='flex' justifyContent='space-between'>            
    <Box sx={{width: '60%'}}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6" gutterBottom>The count is: {counterStore.count}</Typography>
        
        <ButtonGroup sx={{mt: 3, gap: 3}}>
            <Button variant="contained" color="error" onClick={() => counterStore.increment()}>Increment</Button>
            <Button variant="contained" color="success" onClick={() => counterStore.decrement()}>Decrement</Button>
            <Button variant="contained" color="primary" onClick={() => counterStore.increment(5)}>Increment by 5</Button>
        </ButtonGroup>
    </Box>
    <Paper sx={{width: '40%', p: 4}} elevation={8}>
        <Typography variant="h5">Counter Events ({counterStore.eventCount})</Typography>
        <List>
            {counterStore.events.map((event, index) => (
                <ListItemText key={index}>{event}</ListItemText>
            ))}
        </List>
    </Paper>
    </Box>
  )
})

export default Counter

