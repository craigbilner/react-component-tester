export default {
  comp: {
    fontFamily: 'Brush Script MT, Helvetica, Arial',
    height: '25rem',
    border: '1px solid black',
    marginTop: '2.5rem',
    padding: '2rem',
    display: 'flex',
    flexFlow: 'row'
  },
  left: {
    flex: 1,
    borderRight: '1px solid black',
    padding: '0 1rem',
    position: 'relative'
  },
  right: {
    flex: 1,
    padding: '0 1rem'
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  signatureContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
};
