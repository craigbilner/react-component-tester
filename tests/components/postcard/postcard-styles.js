export default {
  comp: {
    fontFamily: 'Brush Script MT, Helvetica, Arial',
    border: '1px solid black',
    display: 'flex',
    flexFlow: 'column',
    padding: '0.5rem',
    '@media (min-width: 800px)': {
      padding: '2rem',
      marginTop: '2.5rem'
    },
    '@media (min-width: 1200px)': {
      flexFlow: 'row'
    }
  },
  left: {
    flex: 1,
    padding: '1rem',
    position: 'relative',
    order: 2,
    '@media (min-width: 1200px)': {
      padding: '0 1rem',
      borderRight: '1px solid black',
      order: 1
    }
  },
  right: {
    flex: 1,
    padding: '0 1rem',
    display: 'flex',
    flexFlow: 'column',
    order: 1,
    '@media (min-width: 480px)': {
      flexFlow: 'row'
    },
    '@media (min-width: 1200px)': {
      flexFlow: 'column',
      order: 2
    }
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    order: 1,
    flex: 1,
    '@media (min-width: 480px)': {
      order: 2
    },
    '@media (min-width: 1200px)': {
      order: 1
    }
  },
  body: {
    order: 2,
    flex: 2,
    '@media (min-width: 480px)': {
      order: 1
    },
    '@media (min-width: 680px)': {
      flex: 4
    },
    '@media (min-width: 1200px)': {
      flex: 1,
      order: 2
    }
  },
  signatureContainer: {
    textAlign: 'right'
  }
};
