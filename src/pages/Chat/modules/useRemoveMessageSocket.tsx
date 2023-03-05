import React, { useEffect } from 'react';

export default function useRemoveMessageSocket({ currentSocket }: any) {
  useEffect(() => {
    if (currentSocket) {
      currentSocket?.on(
        'sendDataServerRemoveMessage',
        (data: { roomId: string; messageId: string }) => {
          const { messageId, roomId } = data;
          console.log(3333, messageId, roomId);
          const rId = localStorage.getItem('roomId');

          // if (roomIdRerturn === rId) {
          //   handleAppendMessage(senderId, content, messageId);
          // }
        },
      );
    }
  }, [currentSocket]);
}
