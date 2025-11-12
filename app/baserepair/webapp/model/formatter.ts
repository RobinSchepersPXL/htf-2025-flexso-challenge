import { state } from "../types/generalTypes";

export default {
  stateFormatter: (object: state[]) => {
    if (object === null) {
      return;
    }

    const temp = object.map((o: state) => ({ value: o.value, state: o.state }));

    return temp;
  },
};
