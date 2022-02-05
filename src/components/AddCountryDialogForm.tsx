import {FunctionComponent} from "react";
import {Dialog, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

type AddCountryDialogFormProps = {
    open: boolean,
    handleAddCountry: (countryName: string) => void,
    handleCloseDialog: () => void,
};

export const AddCountryDialogForm : FunctionComponent<AddCountryDialogFormProps> = ({open, handleAddCountry, handleCloseDialog}) => {
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
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};