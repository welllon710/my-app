const width = document.documentElement.clientWidth;
export default {
  widthReducer(preSate = width, action) {
    const { type, data } = action;
    switch (type) {
      case "MOVE":
        preSate = data;
        if (data <= 1200) {
          preSate = 1200;
          return preSate;
        } else {
          return preSate;
        }
      default:
        return preSate;
    }
  },
  openReducer(preStae = false, action) {
    const { type, data } = action;
    switch (type) {
      case "OPEN":
        preStae = data;
        return preStae;
      case "CLOSE":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
  isDetails(preStae = true, action) {
    const { type, data } = action;
    switch (type) {
      case "GO":
        preStae = data;
        return preStae;
      case "LEAVE":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
  userInfo(preStae = {}, action) {
    const { type, data } = action;
    switch (type) {
      case "SAVE":
        preStae = data;
        return preStae;
      case "DEL":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
};
