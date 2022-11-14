import mixpanel from "mixpanel-browser";

mixpanel.init("b5a88a0d511b323af6329774797fbb99", {debug: true});

const actions = {
  identify: (id :any) => {
    mixpanel.identify(id);
  },
  alias: (id :any ) => {
     mixpanel.alias(id);
  },
  track: (name :any, props : any) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props : any) => {
      mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
