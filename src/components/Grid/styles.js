import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 460,
    },
    columsTitle:{
        backgroundColor: '#EEE',
        fontSize: 18,
        fontWeight: "bold",
    },
    columsBody:{
        cursor: 'pointer',
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    },
    '@media only screen and (max-device-width: 800px)': {
        root: {
            width: 450,
            marginLeft: -30,
        },
        container: {
            height: 600,
        },
    }
})

