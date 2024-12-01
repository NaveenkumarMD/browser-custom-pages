const IPCConstants = Object.freeze({
  musicPlayer: {
    play: {
      action: "play",
      control: "controlMusic",
    },
    prev: {
      action: "prev",
      control: "controlMusic",
    },
    next: {
      action: "next",
      control: "controlMusic",
    },
    queryCurrentMusic: {
      action: "queryCurrentMusic",
      control: "controlMusic",
    },
  },
});

export { IPCConstants };
