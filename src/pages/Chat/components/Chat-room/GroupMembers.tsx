import { Avatar } from 'antd';

import { randomColor } from '../../../../helper';

const GroupMembers = ({ users }: { roomId: string; users: any }) => {
  return (
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
    >
      {users.length > 0 &&
        users.map((item: any) => {
          const color = randomColor();
          return (
            <Avatar key={item._id} style={{ backgroundColor: color }}>
              {item.name.charAt(0)}
            </Avatar>
          );
        })}
    </Avatar.Group>
  );
};

export default GroupMembers;
