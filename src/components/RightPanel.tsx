import { DatePicker, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useState } from 'react';

const { Option } = Select;

const RightPanel = ({ handleCloseRightPanel }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  function handleSearch(value) {
    console.log(`search ${value}`);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleDateChange(date) {
    console.log(111, date);
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 absolute top-0 right-0 h-screen">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assigned" className="block text-gray-700 font-bold mb-2">
            Assigned
          </label>
          <Select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onSearch={handleSearch}
            onChange={handleChange}
            filterOption={(input, option) =>
              (option?.children as unknown as DefaultOptionType)
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="start-day" className="block text-gray-700 font-bold mb-2">
            Start day
          </label>
          <DatePicker
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end-day" className="block text-gray-700 font-bold mb-2">
            End day
          </label>
          <DatePicker
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-96"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={handleCloseRightPanel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightPanel;
