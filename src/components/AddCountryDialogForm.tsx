import {FunctionComponent, MouseEventHandler, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

type AddCountryDialogFormProps = {
    open: boolean,
    handleAddCountry: (countryName: string) => void,
    handleCloseDialog: () => void,
};

export const AddCountryDialogForm : FunctionComponent<AddCountryDialogFormProps> = ({open, handleAddCountry, handleCloseDialog}) => {
    const [inputValue, setInputValue] = useState('');
    
    const handleAddCountryButtonClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleAddCountry(inputValue);
        setInputValue('');
    };
    
    const handleCancelButtonClick : MouseEventHandler = (e) => {
        e.preventDefault();
        handleCloseDialog();
    };
    
    return (
        <div>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Add a Country</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id='name'
                        label='Country Name'
                        type='text'
                        fullWidth
                        variant='standard'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddCountryButtonClick}>Add</Button>
                    <Button onClick={handleCancelButtonClick}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};