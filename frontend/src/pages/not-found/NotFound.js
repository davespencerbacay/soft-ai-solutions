import { Alert, AlertTitle } from '@mui/material'

const NotFound = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Resource not found.
        </Alert>
    )
}

export default NotFound