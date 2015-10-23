export default {
  comp: {
    display: 'flex',
    flexFlow: 'row'
  },
  gutter: {
    flex: 0,
    '@media (min-width: 400px)': {
      flex: 1
    }
  },
  body: {
    flex: 3,
    position: 'relative'
  },
  cardContainer: {
    position: 'absolute',
    width: '100%'
  }
};
