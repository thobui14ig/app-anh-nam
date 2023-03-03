import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
const { Option } = Select;

import { useChat } from '../../../../context/app.context';

export default function CreateMessageUser({ setUserId }: any) {
  const { listUsers, currentUser } = useChat();

  const renderUsers = () => {
    return (
      <>
        {listUsers &&
          Object?.keys(listUsers)?.map((key) => {
            if (currentUser._id !== key) {
              return (
                <Option key={key} value={key}>
                  {listUsers[key]}
                </Option>
              );
            }
          })}
      </>
    );
  };

  function handleChange(value: string) {
    setUserId(value);
  }

  return (
    <Select
      showSearch
      placeholder={'Add user'}
      optionFilterProp="children"
      onChange={handleChange}
      defaultValue=""
      filterOption={(input, option) =>
        (option?.children as unknown as DefaultOptionType)
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      }
    >
      {renderUsers()}
    </Select>
  );
}
