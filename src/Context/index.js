import React, {useState} from 'react';

const sampleAppContext = {
  event_id: null,
  _setEventId: () => {},
};

export const CTX = React.createContext(sampleAppContext);
export default function Store(props) {
  const [event_id, setEvent_id] = useState();
  const _setEventId = async id => {
    setEvent_id(id);
  };

  return (
    <CTX.Provider value={{event_id, _setEventId}}>
      {props.children}
    </CTX.Provider>
  );
}
