import {FunctionComponent, MouseEventHandler} from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    fab: {
        margin: 0,
        top: 'auto',
        left: 'auto',
        bottom: 20,
        right: 20,
        position: 'fixed',
    }
});

type AddCountryButtonProps = {
    handleClick: () => void;
}

export const AddCountryButton : FunctionComponent<AddCountryButtonProps> = ({handleClick}) => {
    const classes = useStyles();
    
    const handleButtonClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleClick();
    };
    
    return (
        <Fab 
            color='primary' 
            className={classes.fab}
            onClick={handleButtonClick}
        >
            <AddIcon />
        </Fab>
    );
};