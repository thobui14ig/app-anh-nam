import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import ApiConstant from '../api/apiConstant';
import { getToken } from '../helper';
import { handleSetSocket } from '../stores/socket';
import { RootState } from '../stores/store';

const useSocket = () => {
  const dispatch = useDispatch();
  const { socket: currentSocket } = useSelector((state: RootState) => state.socket);
  useEffect(() => {
    const token = getToken();

    const socket = io(`ws://${ApiConstant.IP}:9000`, {
      query: { token },
    }) as Socket;
    dispatch(handleSetSocket(socket));

    return () => {
      if (currentSocket) {
        currentSocket?.disconnect();
      }
    };
  }, []);
};

export default useSocket;
