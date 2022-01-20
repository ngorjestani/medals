import {FormEvent, FunctionComponent, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

type ICountryCardProps = {
}

export const CountryCard : FunctionComponent<ICountryCardProps> = () => {
    const [name, setName] = useState('USA');
    const [gold, setGold] = useState(0);

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant='h5'>
                    {name}
                </Typography>
                <Typography variant='h6'>
                    Gold medals: {gold}
                </Typography>
                <CardActions>
                    <Button
                        size='small'
                        color='primary'
                        onClick={(e) => {
                            e.preventDefault();
                            setGold(prevState => prevState + 1);
                        }}
                    >
                        Add Medal
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}