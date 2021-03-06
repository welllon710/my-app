import moment from "moment";
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
  savePlayList(preStae = {}, action) {
    const { type, data } = action;
    switch (type) {
      case "SAVEPT":
        preStae = data;
        return preStae;
      case "DELPT":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
  currentMusic(preStae = {}, action) {
    const { type, data } = action;
    switch (type) {
      case "SAVECT":
        preStae = {
          ...preStae,
          id: data.id,
          name: data.name,
          auth: data.ar[0].name,
          picUrl: data.al.picUrl,
          time: moment(data.dt).format("mm:ss"),
          timestamp: data.dt / 1000,
          isPlay: true,
        };
        return preStae;
      default:
        return preStae;
    }
  },
  currentStatus(preStae = "start", action) {
    const { type, data } = action;
    switch (type) {
      case "START":
        preStae = data;
        return preStae;
      case "END":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
  currentTime(preStae = "", action) {
    const { type, data } = action;
    switch (type) {
      case "CUTME":
        preStae = data;
        return preStae;
      default:
        return preStae;
    }
  },
};
