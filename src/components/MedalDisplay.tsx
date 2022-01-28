import {FunctionComponent, MouseEventHandler} from "react";
import {Medal} from "../models/types";
import Typography from "@mui/material/Typography";
import {Button, CardActions} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type IMedalDisplayProps = {
    medalProp: Medal,
    handleAddMedal: (id: string) => void,
    handleRemoveMedal: (id: string) => void,
}

export const MedalDisplay : FunctionComponent<IMedalDisplayProps> = ({medalProp, handleAddMedal, handleRemoveMedal}) => {
    const handleAddClick: MouseEventHandler = (e) => {
        e.preventDefault();
        handleAddMedal(medalProp.id);
    }

    const handleRemoveClick: MouseEventHandler = (e) => {
        e.preventDefault();
        handleRemoveMedal(medalProp.id);
    }
    
    return (
        <>
            <Typography variant='h6'>
                {medalProp.name} medals: {medalProp.count}
            </Typography>
            <CardActions>
                <Button
                    size='small'
                    color='primary'
                    onClick={handleRemoveClick}
                    disabled={medalProp.count < 1}
                >
                    <RemoveCircleIcon />
                </Button>
                <Button
                    size='small'
                    color='primary'
                    onClick={handleAddClick}
                >
                    <AddCircleIcon />
                </Button>
            </CardActions>
        </>
    );
}