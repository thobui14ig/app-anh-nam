import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Label } from 'devextreme-react/bar-gauge';
import React, { useState } from 'react';

import { useChat } from '../../../../context/app.context';
const { Option } = Select;
export default function CreateMessageRoom() {
  const { listUsers, currentUser, listUsersGroup, setListUserGroup } = useChat();

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
    setListUserGroup((prev: any) => {
      const check = prev.find((item: any) => item === value);
      if (!check) {
        return [...prev, value];
      }
      return [...prev];
    });
  }

  const handleRemoveUserGroup = (id: string) => {
    setListUserGroup((prev: any) => {
      const newList = prev.filter((item: any) => item !== id);
      return [...newList];
    });
  };

  return (
    <>
      <Label>Chọn thành viên:</Label>
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
      <p>Danh sách thành viên:</p>
      <div className="flex flex-wrap">
        {listUsersGroup.map((item: string) => {
          return (
            <div
              key={item}
              className="bg-gray-200 w-32 h-8 px-1 py-1 mx-2 my-2 relative rounded-sm "
            >
              {listUsers[item]}
              <button
                onClick={() => handleRemoveUserGroup(item)}
                className="w-9 absolute top-0 h-8 right-0 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:bg-red-600 text-xs"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
