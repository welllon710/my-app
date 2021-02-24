const width = document.documentElement.clientWidth;
export default {
  widthReducer(preSate = width, action) {
    const { type, data } = action;
    switch (type) {
      case 'MOVE':
        preSate = data
        if(data <= 1200){
          preSate = 1200
          return preSate
        }else{
          return preSate
        }
      default:
      return  preSate
    }
  },
};
